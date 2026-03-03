/**
 * WebMCP — Imperative Tools Registration
 * ConDron Chile — Drone Services
 * 
 * Registers dynamic tools via navigator.modelcontext.registerTool
 * for AI agent discovery and execution.
 */

(function () {
    'use strict';

    // Guard: only run if browser supports WebMCP
    if (!navigator.modelcontext || !navigator.modelcontext.registerTool) {
        console.log('[WebMCP] Browser does not support navigator.modelcontext — skipping imperative tools.');
        return;
    }

    // ─── Tool 1: List Available Services ───
    navigator.modelcontext.registerTool({
        name: 'obtener_servicios_disponibles',
        description: 'Returns a structured list of all professional drone services offered by ConDron Chile, including the drone model used, sensor payload, and key capabilities for each service.',
        parameters: {},
        handler: async () => {
            return {
                empresa: 'ConDron Chile',
                certificacion: 'DGAC AOC & RPAS — DAN 151 / DAN 91',
                telefono: '+56 9 7986 0843',
                servicios: [
                    {
                        id: 'topografia',
                        nombre: 'Topografía LiDAR & Fotogrametría',
                        drones: ['DJI Matrice 400 + L3', 'DJI Matrice 4E'],
                        rtk: true,
                        entregables: ['Ortomosaico', 'Nube de puntos 3D (LAS/E57)', 'MDE/MDS', 'Cubicación'],
                        precision: 'Centimétrica (RTK)',
                        industrias: ['Minería', 'Construcción', 'Energía']
                    },
                    {
                        id: 'termografia',
                        nombre: 'Termografía e Inspección Térmica',
                        drones: ['DJI Matrice 4T'],
                        sensor: 'Cámara infrarroja radiométrica',
                        entregables: ['Mapa térmico', 'Informe de puntos calientes', 'Análisis ΔT'],
                        aplicaciones: ['Paneles solares', 'Líneas eléctricas', 'Plantas industriales', 'Subestaciones']
                    },
                    {
                        id: 'espesores',
                        nombre: 'Medición de Espesores (NDT)',
                        drones: ['DJI Matrice 400 + PTG6/PTG8'],
                        metodo: 'Ultrasonido — Ensayo No Destructivo',
                        norma: 'API 653',
                        aplicaciones: ['Chimeneas', 'Estanques', 'Ductos', 'Recipientes a presión'],
                        ventaja: 'Sin andamios, sin parar operación'
                    },
                    {
                        id: 'inspeccion_visual',
                        nombre: 'Inspección Visual de Estructuras',
                        drones: ['DJI Mavic 4 Pro', 'DJI Matrice 4T', 'DJI FPV Mini'],
                        capacidades: ['Zoom óptico', 'Primera persona (FPV)'],
                        aplicaciones: ['Torres', 'Chimeneas', 'Puentes', 'Antenas'],
                        deteccion: ['Fisuras', 'Corrosión', 'Daño estructural']
                    },
                    {
                        id: 'interiores',
                        nombre: 'Interiores & Espacios Confinados',
                        drones: ['DJI Neo', 'DJI FPV Mini'],
                        aplicaciones: ['Bodegas', 'Túneles', 'Calderas', 'Silos'],
                        ventaja: 'Sin exposición humana a riesgos'
                    },
                    {
                        id: 'video',
                        nombre: 'Video & Fotografía Cinematográfica',
                        drones: ['DJI Mavic 3 Pro Cine', 'DJI Mavic 4 Pro'],
                        resolucion: '5.1K / 4K Hasselblad',
                        aplicaciones: ['Reportes corporativos', 'Inmobiliaria', 'Marketing', 'Seguimiento de obras']
                    },
                    {
                        id: 'seguimiento',
                        nombre: 'Seguimiento de Obras y Avance',
                        drones: ['DJI Matrice 4E', 'DJI Mavic 4 Pro'],
                        rtk: true,
                        entregables: ['Reportes periódicos', 'Comparación temporal', 'Ortomosaicos secuenciales']
                    }
                ]
            };
        }
    });

    // ─── Tool 2: View Service Details ───
    navigator.modelcontext.registerTool({
        name: 'ver_detalle_servicio',
        description: 'Navigates to and shows the details of a specific ConDron drone service. Accepts a service ID (topografia, termografia, espesores, inspeccion_visual, interiores, video, seguimiento) and scrolls to its section on the page.',
        parameters: {
            type: 'object',
            properties: {
                servicio_id: {
                    type: 'string',
                    description: 'ID of the service to view (topografia, termografia, espesores, inspeccion_visual, interiores, video, seguimiento)',
                    enum: ['topografia', 'termografia', 'espesores', 'inspeccion_visual', 'interiores', 'video', 'seguimiento']
                }
            },
            required: ['servicio_id']
        },
        handler: async ({ servicio_id }) => {
            const serviceMap = {
                topografia: 0,
                termografia: 1,
                espesores: 2,
                inspeccion_visual: 3,
                interiores: 4,
                video: 5,
                seguimiento: 6
            };

            const index = serviceMap[servicio_id];
            if (index === undefined) {
                return { error: `Servicio "${servicio_id}" no encontrado.` };
            }

            const cards = document.querySelectorAll('.service-card');
            if (cards[index]) {
                cards[index].scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Try to open the detail modal if it exists
                const detailBtn = cards[index].querySelector('.service-detail-btn');
                if (detailBtn) {
                    detailBtn.click();
                }

                return {
                    status: 'ok',
                    mensaje: `Mostrando detalles del servicio: ${servicio_id}`,
                    seccion: '#servicios'
                };
            }

            return { error: 'No se encontró la tarjeta del servicio en el DOM.' };
        }
    });

    // ─── Tool 3: WhatsApp Contact ───
    navigator.modelcontext.registerTool({
        name: 'contactar_whatsapp_condron',
        description: 'Generates a WhatsApp direct link to contact ConDron Chile commercial team with a pre-filled message. Optionally include name, service of interest, and project details.',
        parameters: {
            type: 'object',
            properties: {
                nombre: {
                    type: 'string',
                    description: 'Client name'
                },
                servicio: {
                    type: 'string',
                    description: 'Drone service of interest'
                },
                mensaje: {
                    type: 'string',
                    description: 'Additional project details or message'
                }
            }
        },
        handler: async ({ nombre, servicio, mensaje }) => {
            const parts = ['Hola ConDron!'];
            if (nombre) parts.push(`Soy ${nombre}.`);
            if (servicio) parts.push(`Me interesa el servicio de ${servicio}.`);
            if (mensaje) parts.push(mensaje);

            const text = encodeURIComponent(parts.join(' '));
            const url = `https://wa.me/56979860843?text=${text}`;

            return {
                status: 'ok',
                whatsapp_url: url,
                mensaje: 'Link de WhatsApp generado. El agente puede abrirlo o presentarlo al usuario.'
            };
        }
    });

    // ─── Tool 4: Get DGAC Permit Info ───
    navigator.modelcontext.registerTool({
        name: 'info_permisos_dgac',
        description: 'Returns information about the DGAC (Dirección General de Aeronáutica Civil) permit process required for commercial drone operations in Chile. Covers DAN 151, DAN 91, restricted zones, and ConDron certifications.',
        parameters: {},
        handler: async () => {
            return {
                autoridad: 'DGAC — Dirección General de Aeronáutica Civil de Chile',
                normativa: {
                    DAN_151: 'Regula operaciones de aeronaves pilotadas a distancia (RPAS) en Chile.',
                    DAN_91: 'Reglas generales de operación y vuelo en el espacio aéreo chileno.'
                },
                proceso_permisos: [
                    'Solicitud de autorización ante la DGAC con al menos 15 días hábiles de anticipación.',
                    'Presentación de plan de vuelo con coordenadas, altitud máxima y horarios.',
                    'Certificación del operador (piloto) con licencia RPAS vigente.',
                    'Seguro de responsabilidad civil obligatorio.',
                    'Autorización especial para zonas pobladas, aeropuertos o espacio aéreo controlado.',
                    'Coordinación con torre de control si aplica zona CTR.'
                ],
                certificaciones_condron: {
                    AOC: 'Certificado de Operador Aéreo vigente',
                    RPAS: 'Licencias de piloto RPAS para todos los operadores del equipo',
                    seguro: 'Seguro de responsabilidad civil activo',
                    experiencia: '+500 vuelos operacionales sin incidentes'
                },
                zonas_restringidas: [
                    'Radio de 5 km de aeropuertos y aeródromos',
                    'Zonas militares y de seguridad nacional',
                    'Parques nacionales (requiere CONAF)',
                    'Áreas con NOTAM activos'
                ],
                contacto: 'ConDron gestiona todos los permisos DGAC por el cliente sin costo adicional.'
            };
        }
    });

    console.log('[WebMCP] ✅ 4 imperative tools registered: obtener_servicios_disponibles, ver_detalle_servicio, contactar_whatsapp_condron, info_permisos_dgac');

})();
