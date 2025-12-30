import React, { useState } from 'react';
import { Factory, Zap, Wheat, Building2, Trees, Phone, Fish, Umbrella, Plane, ArrowRight, CheckCircle2, X, Camera, Cpu, Radio, Thermometer, Wind, Mountain, Droplets, Target, Shield, Search, Sun, Sprout, TrendingUp } from 'lucide-react';

const industries = [
  {
    id: 'mineria',
    name: 'Minería',
    icon: <Factory className="w-6 h-6" />,
    tagline: 'Inspección sin detener operaciones',
    savings: 'Hasta 85% ahorro',
    image: 'https://images.unsplash.com/photo-1578496479763-c21c718af028?w=800&q=80',
    services: [
      { 
        name: 'Inspección Ultrasónica (UT)', 
        desc: 'Medición de espesores en tanques, silos y chimeneas', 
        saving: '85% vs andamios',
        icon: <Radio className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600&q=80',
        sensor: 'Sensor UT de contacto + Dron DJI M300',
        cases: ['Tanques de ácido en plantas SX-EW', 'Chimeneas de fundición', 'Silos de concentrado', 'Ductos de ventilación'],
        benefits: ['Elimina trabajo en altura', 'Sin detención de planta', 'Datos en tiempo real', 'Informe certificado'],
        savingsDetail: 'Andamio tradicional: $15-25M CLP + 2 semanas. Con dron: $3-5M CLP + 2 días.'
      },
      { 
        name: 'Termografía IR', 
        desc: 'Detección de puntos calientes en rodillos y equipos', 
        saving: '70% mantención',
        icon: <Thermometer className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
        sensor: 'Cámara FLIR XT2 640 + Dron DJI M300',
        cases: ['Rodillos de correas transportadoras', 'Tableros eléctricos MT/BT', 'Motores y reductores', 'Líneas de proceso'],
        benefits: ['Detecta fallas antes del colapso', 'Planifica mantención', 'Evita paradas no programadas', 'Registro térmico histórico'],
        savingsDetail: 'Falla de rodillo: $50-200M CLP en pérdidas. Detección temprana: $2M CLP.'
      },
      { 
        name: 'Magnetometría Aérea', 
        desc: 'Detección de inchancables en pilas de acopio', 
        saving: 'Evita daños',
        icon: <Mountain className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
        sensor: 'Magnetómetro MagArrow + Dron ala fija',
        cases: ['Detección de dientes de pala', 'Piezas metálicas perdidas', 'Exploración de anomalías', 'Mapeo geológico'],
        benefits: ['Evita daño a chancadores', 'Cobertura de grandes áreas', 'Detección bajo superficie', 'Mapeo automático'],
        savingsDetail: 'Daño por inchancable: $500M-2.000M CLP. Detección aérea: $5-10M CLP.'
      },
      { 
        name: 'Detección de Gases', 
        desc: 'Monitoreo SO₂, CO, NOx sin exposición humana', 
        saving: '100% seguro',
        icon: <Wind className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&q=80',
        sensor: 'Sensor multigas Sniffer4D + Dron DJI M300',
        cases: ['Chimeneas de fundición', 'Zonas de tronadura', 'Plantas de ácido', 'Monitoreo ambiental'],
        benefits: ['Cero exposición humana', 'Medición en tiempo real', 'Cumplimiento normativo', 'Mapeo 3D de concentraciones'],
        savingsDetail: 'Multas ambientales: $100-500M CLP. Monitoreo preventivo: $3-8M CLP.'
      },
      { 
        name: 'Volumetría 3D', 
        desc: 'Cálculo preciso de stockpiles', 
        saving: '75% más rápido',
        icon: <Target className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1570275239925-4af0aa93a758?w=600&q=80',
        sensor: 'Fotogrametría RGB + LiDAR L1 DJI',
        cases: ['Pilas de mineral ROM', 'Stockpiles de concentrado', 'Acopios de estéril', 'Control de inventario'],
        benefits: ['Precisión ±2%', 'Cobertura total en horas', 'Comparativa temporal', 'Integración con ERP'],
        savingsDetail: 'Topografía tradicional: 1 semana + $8M CLP. Con dron: 1 día + $2M CLP.'
      },
      { 
        name: 'Inspección Indoor', 
        desc: 'Molinos SAG y espacios confinados con dron jaula', 
        saving: 'Cero riesgo',
        icon: <Search className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&q=80',
        sensor: 'Dron Elios 3 con jaula + LiDAR + Térmica',
        cases: ['Interior de molinos SAG/Bolas', 'Ductos de ventilación', 'Túneles y galerías', 'Espesadores y clarificadores'],
        benefits: ['Sin entrada de personas', 'Navegación sin GPS', 'Video 4K + térmico', 'Modelo 3D interior'],
        savingsDetail: 'Inspección humana: alto riesgo + $20M CLP. Con Elios: $5-8M CLP + cero riesgo.'
      },
      { 
        name: 'Monitoreo Geomembranas', 
        desc: 'Detección de fugas en tranques de relaves', 
        saving: '95% detección',
        icon: <Droplets className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600&q=80',
        sensor: 'Termografía diferencial FLIR + Multirotor',
        cases: ['Tranques de relaves', 'Piscinas de proceso', 'Canales revestidos', 'Embalses'],
        benefits: ['Detecta micro-fugas', 'Cobertura de hectáreas', 'Previene desastres', 'Cumplimiento SMA'],
        savingsDetail: 'Falla de geomembrana: multas + remediación $1.000M+. Detección: $10-20M CLP.'
      },
      { 
        name: 'Gemelo Digital', 
        desc: 'Modelo 3D completo de instalaciones', 
        saving: '80% vs tradicional',
        icon: <Cpu className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80',
        sensor: 'LiDAR L1 + Fotogrametría 42MP + FARO Focus',
        cases: ['Plantas de proceso completas', 'Áreas de chancado', 'Subestaciones eléctricas', 'Talleres de mantención'],
        benefits: ['Navegación virtual', 'Mediciones remotas', 'Base para ingeniería', 'Actualización periódica'],
        savingsDetail: 'Levantamiento tradicional: $80-150M CLP. Con dron + LiDAR: $15-30M CLP.'
      }
    ]
  },
  {
    id: 'energia',
    name: 'Energía',
    icon: <Zap className="w-6 h-6" />,
    tagline: 'Mantención predictiva sin cortes',
    savings: 'Hasta 90% menos cortes',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    services: [
      { 
        name: 'Efecto Corona UV', 
        desc: 'Detección de fugas eléctricas en líneas AT', 
        saving: '90% menos cortes',
        icon: <Zap className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80',
        sensor: 'Cámara UV CoroCAM + Dron M300',
        cases: ['Líneas de transmisión 220-500kV', 'Subestaciones AT', 'Aisladores contaminados', 'Conectores defectuosos'],
        benefits: ['Detecta fallas invisibles', 'Sin desenergizar', 'Previene blackouts', 'Prioriza mantención'],
        savingsDetail: 'Corte no programado: $500M+ en pérdidas. Inspección UV: $5-10M CLP.'
      },
      { 
        name: 'Termografía Solar', 
        desc: 'Detección de hotspots en paneles fotovoltaicos', 
        saving: '40% eficiencia',
        icon: <Sun className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80',
        sensor: 'FLIR XT2 + Vuelo automático RTK',
        cases: ['Plantas PMGD', 'Parques solares utility', 'Techos comerciales', 'Sistemas híbridos'],
        benefits: ['Detecta celdas quemadas', 'Identifica strings caídos', 'Maximiza generación', 'Informe por panel'],
        savingsDetail: 'Pérdida por hotspots: 5-15% generación. Inspección: $500 CLP/panel.'
      },
      { 
        name: 'Inspección Eólica', 
        desc: 'Microfisuras en aspas con zoom x50', 
        saving: 'Previene fallas',
        icon: <Wind className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=600&q=80',
        sensor: 'Cámara zoom H20T + Dron M300',
        cases: ['Aspas de aerogeneradores', 'Torres y góndolas', 'Sistemas de pitch', 'Rayos y erosión'],
        benefits: ['Detección de grietas mm', 'Sin detener turbina', 'Registro fotográfico HD', 'Comparativa temporal'],
        savingsDetail: 'Falla de aspa: $200-500M CLP. Inspección preventiva: $3-5M CLP/turbina.'
      },
      { 
        name: 'LiDAR Control Faja', 
        desc: 'Vegetación peligrosa cerca de cables', 
        saving: '75% más rápido',
        icon: <Trees className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80',
        sensor: 'LiDAR L1 + Ala fija senseFly',
        cases: ['Líneas de transmisión', 'Distribución rural', 'Servidumbres de paso', 'Post-tormenta'],
        benefits: ['Detecta invasión de faja', 'Prioriza poda', 'Previene incendios', 'Cumplimiento SEC'],
        savingsDetail: 'Incendio por contacto: multas + daños $1.000M+. LiDAR: $800 CLP/km.'
      },
      { 
        name: 'Limpieza Aisladores', 
        desc: 'Hidrolavado aéreo sin desenergizar', 
        saving: '65% vs silletas',
        icon: <Droplets className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600&q=80',
        sensor: 'Sistema hidrolavado + Dron heavy-lift',
        cases: ['Aisladores contaminados', 'Zonas costeras salinas', 'Áreas industriales', 'Post-incendio'],
        benefits: ['Sin corte de energía', 'Sin trabajo en altura', 'Alta presión efectiva', 'Cobertura rápida'],
        savingsDetail: 'Limpieza tradicional: $2M/estructura + corte. Con dron: $800K + sin corte.'
      }
    ]
  },
  {
    id: 'agricultura',
    name: 'Agricultura',
    icon: <Wheat className="w-6 h-6" />,
    tagline: 'Precisión que aumenta rendimiento',
    savings: 'Hasta 40% ahorro insumos',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
    services: [
      { 
        name: 'Fumigación Aérea', 
        desc: 'Aplicación precisa en laderas y viñedos', 
        saving: '40% insumos',
        icon: <Sprout className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80',
        sensor: 'DJI Agras T40 + Sistema de aspersión',
        cases: ['Viñedos en pendiente', 'Paltos y cítricos', 'Arándanos', 'Cerezos'],
        benefits: ['Llega donde el tractor no puede', 'Aplicación uniforme', 'Menos deriva', 'Trazabilidad GPS'],
        savingsDetail: 'Fumigación manual: 8-10 hrs/ha. Con dron: 1 hr/ha + 40% menos producto.'
      },
      { 
        name: 'Análisis NDVI', 
        desc: 'Mapas de salud del cultivo multiespectral', 
        saving: 'Detección temprana',
        icon: <Target className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80',
        sensor: 'Cámara Multiespectral MicaSense + P4 Multispectral',
        cases: ['Detección de estrés hídrico', 'Deficiencias nutricionales', 'Plagas y enfermedades', 'Variabilidad de suelo'],
        benefits: ['Ve lo invisible al ojo', 'Actúa antes de síntomas', 'Fertilización variable', 'Historial del campo'],
        savingsDetail: 'Pérdida por detección tardía: 20-40% cosecha. NDVI: $50.000 CLP/ha.'
      },
      { 
        name: 'Optimización Riego', 
        desc: 'Detección de fugas y zonas secas', 
        saving: '30% agua',
        icon: <Droplets className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=600&q=80',
        sensor: 'Termografía FLIR + Multiespectral',
        cases: ['Riego por goteo', 'Pivotes centrales', 'Aspersión', 'Detección de fugas'],
        benefits: ['Identifica zonas secas', 'Detecta goteros tapados', 'Optimiza sectores', 'Reduce consumo'],
        savingsDetail: 'Desperdicio por riego ineficiente: 30-40%. Optimización: $80.000 CLP/ha.'
      },
      { 
        name: 'Siembra Aérea', 
        desc: 'Distribución de semillas en terrenos difíciles', 
        saving: 'Acceso total',
        icon: <Wheat className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=80',
        sensor: 'DJI Agras T40 + Sistema de siembra',
        cases: ['Praderas en pendiente', 'Post-incendio', 'Cobertura de suelos', 'Revegetación'],
        benefits: ['Terrenos inaccesibles', 'Alta velocidad', 'Distribución uniforme', 'Múltiples semillas'],
        savingsDetail: 'Siembra manual: 2-3 ha/día. Con dron: 20-30 ha/día.'
      }
    ]
  },
  {
    id: 'construccion',
    name: 'Construcción',
    icon: <Building2 className="w-6 h-6" />,
    tagline: 'Control de obra en tiempo real',
    savings: 'Hasta 50% más eficiencia',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    services: [
      { 
        name: 'Seguimiento 3D', 
        desc: 'Timelapse semanal Planos vs Realidad', 
        saving: '50% control',
        icon: <Camera className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80',
        sensor: 'Fotogrametría RTK + Software de comparación',
        cases: ['Edificios en altura', 'Plantas industriales', 'Proyectos mineros', 'Infraestructura vial'],
        benefits: ['Detecta desviaciones', 'Registro histórico', 'Reportes automáticos', 'Integración BIM'],
        savingsDetail: 'Retrabajo por errores: 5-10% del proyecto. Detección temprana: $2M CLP/vuelo.'
      },
      { 
        name: 'Venta en Verde', 
        desc: 'Fotos 360° desde altura de futuros pisos', 
        saving: '300% engagement',
        icon: <Building2 className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
        sensor: 'Cámara 360° + Vuelo estabilizado',
        cases: ['Departamentos en venta', 'Oficinas premium', 'Loteos con vista', 'Condominios'],
        benefits: ['Vende la vista real', 'Diferenciador comercial', 'Material de marketing', 'Cierra ventas más rápido'],
        savingsDetail: 'Aumento en velocidad de venta: 20-40%. Costo: $500K-1M CLP/proyecto.'
      },
      { 
        name: 'Inspección Fachadas', 
        desc: 'Estado de edificios sin andamios', 
        saving: '70% vs andamios',
        icon: <Search className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
        sensor: 'Cámara zoom H20T + Termografía',
        cases: ['Edificios patrimoniales', 'Torres de oficinas', 'Condominios antiguos', 'Post-sismo'],
        benefits: ['Sin andamios ni silletas', 'Detección de grietas', 'Infiltraciones térmicas', 'Informe detallado'],
        savingsDetail: 'Andamio full fachada: $30-80M CLP. Inspección con dron: $5-10M CLP.'
      },
      { 
        name: 'Cubicación', 
        desc: 'Volumetría exacta de excavaciones', 
        saving: 'Pago preciso',
        icon: <Mountain className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=600&q=80',
        sensor: 'Fotogrametría RTK + Procesamiento',
        cases: ['Movimiento de tierras', 'Estados de pago', 'Control de avance', 'Comparativa mensual'],
        benefits: ['Precisión ±2%', 'Evita disputas', 'Registro histórico', 'Informes certificados'],
        savingsDetail: 'Error en cubicación manual: 10-20%. Con dron: ±2% + registro.'
      },
      { 
        name: 'Gemelo Digital BIM', 
        desc: 'Modelo As-Built para ingeniería', 
        saving: '80% tiempo',
        icon: <Cpu className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
        sensor: 'LiDAR + Fotogrametría + Procesamiento BIM',
        cases: ['Plantas existentes', 'Renovaciones', 'Ampliaciones', 'Due diligence'],
        benefits: ['Base para proyectos', 'Detección de interferencias', 'Mediciones remotas', 'Coordinación 3D'],
        savingsDetail: 'Levantamiento tradicional: 2-3 meses. Con dron: 2-3 semanas.'
      }
    ]
  },
  {
    id: 'forestal',
    name: 'Forestal',
    icon: <Trees className="w-6 h-6" />,
    tagline: 'Inventario y prevención de incendios',
    savings: 'Hasta 75% menos tiempo',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
    services: [
      { 
        name: 'Inventario LiDAR', 
        desc: 'Conteo de árboles y biomasa bajo vegetación', 
        saving: '75% más rápido',
        icon: <Target className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=600&q=80',
        sensor: 'LiDAR L1 + Ala fija para grandes áreas',
        cases: ['Plantaciones de pino/eucalipto', 'Bosque nativo', 'Certificación FSC', 'Valorización de activos'],
        benefits: ['Penetra el dosel', 'Altura individual', 'Volumen por rodal', 'DAP estimado'],
        savingsDetail: 'Inventario manual: 3-6 meses. Con LiDAR: 2-4 semanas para 10.000 ha.'
      },
      { 
        name: 'Patrullaje Incendios', 
        desc: 'Detección térmica de focos subterráneos', 
        saving: 'Prevención',
        icon: <Thermometer className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80',
        sensor: 'Termografía radiométrica + Vuelo automático',
        cases: ['Patrullaje preventivo verano', 'Post-incendio (rescoldos)', 'Zonas de interfaz', 'Alerta temprana'],
        benefits: ['Detecta antes del humo', 'Focos bajo superficie', 'Cobertura de grandes áreas', 'Respuesta rápida'],
        savingsDetail: 'Costo de incendio forestal: $500M-5.000M CLP. Patrullaje: $2-5M CLP/día.'
      },
      { 
        name: 'Mapeo Topográfico', 
        desc: 'MDT real penetrando vegetación', 
        saving: 'Precisión total',
        icon: <Mountain className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=600&q=80',
        sensor: 'LiDAR multiretorno + IMU de alta precisión',
        cases: ['Planificación de caminos', 'Diseño de cortafuegos', 'Hidrología', 'Erosión'],
        benefits: ['Ve el suelo real', 'Curvas de nivel precisas', 'Modelo de drenaje', 'Base para proyectos'],
        savingsDetail: 'Topografía bajo bosque tradicional: imposible o muy lenta. LiDAR: $1.500 CLP/ha.'
      }
    ]
  },
  {
    id: 'telecom',
    name: 'Telecom',
    icon: <Phone className="w-6 h-6" />,
    tagline: 'Torres sin subir técnicos',
    savings: 'Hasta 80% menos subidas',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    services: [
      { 
        name: 'Gemelo Digital Torres', 
        desc: 'Inventario de equipos instalados', 
        saving: '80% menos subidas',
        icon: <Cpu className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
        sensor: 'Fotogrametría alta resolución + LiDAR',
        cases: ['Torres de celular', 'Torres de radio', 'Monopolos', 'Rooftops'],
        benefits: ['Inventario remoto', 'Mediciones exactas', 'Planifica instalaciones', 'Registro histórico'],
        savingsDetail: 'Subida de técnico: $500K-1M CLP + riesgo. Gemelo digital: $300-500K CLP.'
      },
      { 
        name: 'Línea de Vista', 
        desc: 'Verificación de obstáculos entre cerros', 
        saving: 'Pre-instalación',
        icon: <Target className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1516044734145-07ca8eef8731?w=600&q=80',
        sensor: 'LiDAR + Modelo de elevación de alta precisión',
        cases: ['Enlaces microondas', 'Nuevos sites', 'Ampliación de cobertura', 'Interferencias'],
        benefits: ['Valida LOS antes de instalar', 'Identifica obstáculos', 'Optimiza ubicación', 'Reduce fracasos'],
        savingsDetail: 'Instalación fallida: $5-15M CLP perdidos. Estudio LOS: $1-2M CLP.'
      },
      { 
        name: 'Estado Estructural', 
        desc: 'Detección de óxido y daños', 
        saving: 'Mantención predictiva',
        icon: <Shield className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1545259742-b4fd8fea67e4?w=600&q=80',
        sensor: 'Cámara zoom H20T + Inspección visual AI',
        cases: ['Oxidación de estructura', 'Tornillos faltantes', 'Cables dañados', 'Post-sismo'],
        benefits: ['Detecta corrosión temprana', 'Prioriza mantención', 'Sin subir personas', 'Informe detallado'],
        savingsDetail: 'Falla estructural: consecuencias catastróficas. Inspección: $400-600K CLP/torre.'
      }
    ]
  },
  {
    id: 'acuicultura',
    name: 'Acuicultura',
    icon: <Fish className="w-6 h-6" />,
    tagline: 'Vigilancia de centros remotos',
    savings: 'Seguridad 24/7',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    services: [
      { 
        name: 'Vigilancia Térmica', 
        desc: 'Rondas nocturnas automatizadas', 
        saving: '70% vs guardias',
        icon: <Shield className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
        sensor: 'Dron en dock + Termografía + AI',
        cases: ['Centros de cultivo', 'Bodegas de alimento', 'Pontones', 'Wellboats'],
        benefits: ['Vigilancia 24/7', 'Detección de intrusos', 'Respuesta rápida', 'Registro automático'],
        savingsDetail: 'Robo en centro: $50-200M CLP. Sistema de vigilancia dron: $15-25M CLP/año.'
      },
      { 
        name: 'Monitoreo Jaulas', 
        desc: 'Estado de redes y estructuras', 
        saving: 'Detección daños',
        icon: <Search className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=600&q=80',
        sensor: 'Cámara zoom + Termografía + Dron marino',
        cases: ['Redes anti-lobos', 'Flotadores', 'Pasillos', 'Fondeos'],
        benefits: ['Detecta roturas', 'Estado de flotación', 'Sin buzos', 'Registro visual'],
        savingsDetail: 'Escape por rotura: pérdida total + multas. Inspección: $500K-1M CLP/centro.'
      },
      { 
        name: 'Logística Urgente', 
        desc: 'Entrega de insumos urgentes', 
        saving: 'Acceso remoto',
        icon: <Plane className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=600&q=80',
        sensor: 'Dron de carga + Sistema de liberación',
        cases: ['Medicamentos urgentes', 'Repuestos críticos', 'Muestras de laboratorio', 'Documentos'],
        benefits: ['Acceso inmediato', 'Sin depender de clima marítimo', 'Cargas hasta 5kg', 'Autonomía 20km'],
        savingsDetail: 'Lancha de emergencia: $500K-2M CLP. Dron: $100-200K CLP.'
      }
    ]
  },
  {
    id: 'seguros',
    name: 'Seguros',
    icon: <Umbrella className="w-6 h-6" />,
    tagline: 'Peritaje rápido post-siniestro',
    savings: 'Hasta 60% más rápido',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    services: [
      { 
        name: 'Evaluación Catástrofes', 
        desc: 'Mapeo 3D post terremoto/aluvión', 
        saving: '60% más rápido',
        icon: <Mountain className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&q=80',
        sensor: 'Fotogrametría + LiDAR + Térmica',
        cases: ['Post-terremoto', 'Aluviones', 'Inundaciones', 'Incendios urbanos'],
        benefits: ['Cobertura masiva rápida', 'Documentación objetiva', 'Modelo 3D de daños', 'Base para liquidación'],
        savingsDetail: 'Evaluación tradicional: semanas. Con dron: 1-3 días para zona extensa.'
      },
      { 
        name: 'Peritaje Aéreo', 
        desc: 'Documentación de daños en altura', 
        saving: 'Acceso seguro',
        icon: <Camera className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
        sensor: 'Cámara zoom H20T + Termografía',
        cases: ['Techos dañados', 'Fachadas', 'Estructuras industriales', 'Bodegas'],
        benefits: ['Sin subir al techo', 'Documentación HD', 'Detección de infiltraciones', 'Informe objetivo'],
        savingsDetail: 'Peritaje con andamio: $3-5M CLP + tiempo. Con dron: $500K-1M CLP.'
      },
      { 
        name: 'Volumetría Daños', 
        desc: 'Cuantificación precisa de pérdidas', 
        saving: 'Liquidación exacta',
        icon: <TrendingUp className="w-5 h-5" />,
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
        sensor: 'Fotogrametría + Software de cubicación',
        cases: ['Derrumbes', 'Material quemado', 'Inundaciones (área)', 'Comparativa pre/post'],
        benefits: ['Volumen exacto', 'Área afectada precisa', 'Documentación legal', 'Evita disputas'],
        savingsDetail: 'Disputa por estimación: meses de litigio. Volumetría dron: evidencia objetiva.'
      }
    ]
  }
];

export default function ConDroneComplete() {
  const [activeIndustry, setActiveIndustry] = useState(industries[0]);
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="min-h-screen bg-stone-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');
        
        * { font-family: 'DM Sans', sans-serif; }
        h1, h2, h3, h4, .font-display { font-family: 'Space Grotesk', sans-serif; }
        
        .btn-salmon {
          background: linear-gradient(135deg, #C4967A 0%, #A67B62 100%);
        }
        .btn-salmon:hover {
          background: linear-gradient(135deg, #A67B62 0%, #8B5A2B 100%);
        }
        
        .text-salmon { color: #C4967A; }
        .bg-salmon { background-color: #C4967A; }
        .border-salmon { border-color: #C4967A; }
        
        .industry-btn {
          transition: all 0.3s ease;
        }
        .industry-btn:hover {
          background: #F5F3F0;
        }
        .industry-btn.active {
          background: linear-gradient(135deg, #C4967A 0%, #A67B62 100%);
          color: white;
        }
        
        .service-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -8px rgba(196, 150, 122, 0.25);
          border-color: #C4967A;
        }
        
        .modal-overlay {
          animation: fadeIn 0.2s ease;
        }
        .modal-content {
          animation: slideUp 0.3s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 btn-salmon rounded-lg flex items-center justify-center">
              <Plane className="w-5 h-5 text-white -rotate-45" />
            </div>
            <div>
              <span className="font-display font-bold text-xl text-stone-800">ConDrone</span>
              <span className="text-salmon font-bold">.cl</span>
            </div>
          </div>
          <button className="btn-salmon text-white px-5 py-2 rounded-lg font-semibold text-sm">
            Cotizar
          </button>
        </div>
      </header>

      {/* Hero with Industry Image */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={activeIndustry.image} 
          alt={activeIndustry.name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 to-stone-900/40" />
        <div className="relative max-w-6xl mx-auto px-6 h-full flex items-center">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 btn-salmon rounded-xl flex items-center justify-center text-white">
                {activeIndustry.icon}
              </div>
              <span className="bg-white/20 text-white text-sm font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                {activeIndustry.savings}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              {activeIndustry.name}
            </h1>
            <p className="text-white/80 text-lg">{activeIndustry.tagline}</p>
          </div>
        </div>
      </section>

      {/* Industry Selector */}
      <section className="bg-white border-b border-stone-200 sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {industries.map((ind) => (
              <button
                key={ind.id}
                onClick={() => {
                  setActiveIndustry(ind);
                  setSelectedService(null);
                }}
                className={`industry-btn flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm border border-stone-200 whitespace-nowrap flex-shrink-0 ${
                  activeIndustry.id === ind.id ? 'active' : 'text-stone-700'
                }`}
              >
                {ind.icon}
                {ind.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-sm font-semibold text-stone-500 uppercase tracking-wider mb-6">
            Servicios disponibles para {activeIndustry.name}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeIndustry.services.map((service, i) => (
              <div 
                key={i} 
                className="service-card bg-white rounded-xl border border-stone-200 overflow-hidden"
                onClick={() => setSelectedService(service)}
              >
                <div className="h-32 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center text-salmon flex-shrink-0">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-stone-800 leading-tight">{service.name}</h3>
                      <p className="text-stone-500 text-sm mt-1">{service.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone-100">
                    <span className="bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {service.saving}
                    </span>
                    <span className="text-salmon text-sm font-medium flex items-center gap-1">
                      Ver más <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-r from-stone-800 to-stone-900 rounded-2xl p-8 text-center">
            <h3 className="font-display text-2xl font-bold text-white mb-2">
              ¿Necesitas una cotización para {activeIndustry.name}?
            </h3>
            <p className="text-stone-400 mb-6">
              Te enviamos una propuesta técnico-económica en 24 horas
            </p>
            <button className="btn-salmon text-white px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2">
              Solicitar Cotización <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <div 
          className="modal-overlay fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedService(null)}
        >
          <div 
            className="modal-content bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="relative h-48 md:h-56">
              <img 
                src={selectedService.image} 
                alt={selectedService.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 btn-salmon rounded-xl flex items-center justify-center text-white">
                    {selectedService.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">{selectedService.name}</h3>
                    <p className="text-white/80 text-sm">{selectedService.desc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Sensor */}
              <div className="bg-stone-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-salmon/10 rounded-lg flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-salmon" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 uppercase tracking-wider font-medium">Tecnología utilizada</p>
                    <p className="text-stone-800 font-semibold">{selectedService.sensor}</p>
                  </div>
                </div>
              </div>

              {/* Cases */}
              <div>
                <h4 className="font-display font-semibold text-stone-800 mb-3">Casos de uso</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedService.cases.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-stone-600">
                      <div className="w-1.5 h-1.5 bg-salmon rounded-full flex-shrink-0" />
                      {c}
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="font-display font-semibold text-stone-800 mb-3">Beneficios</h4>
                <div className="space-y-2">
                  {selectedService.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-stone-600">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      {b}
                    </div>
                  ))}
                </div>
              </div>

              {/* Savings Detail */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-green-700 uppercase tracking-wider font-medium mb-1">Ahorro estimado</p>
                    <p className="text-stone-700 text-sm">{selectedService.savingsDetail}</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button className="btn-salmon text-white w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2">
                Cotizar este servicio <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-stone-500 text-sm">
            <span>© 2025 ConDrone.cl</span>
            <span>•</span>
            <span>Una empresa de <span className="text-salmon font-semibold">MCCO Copper</span></span>
          </div>
          <div className="flex gap-6 text-stone-500 text-sm">
            <span className="hover:text-salmon cursor-pointer">contacto@condrone.cl</span>
            <span className="hover:text-salmon cursor-pointer">+56 9 XXXX XXXX</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
