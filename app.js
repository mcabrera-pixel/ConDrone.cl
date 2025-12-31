// ===================================
// ConDrone.cl - Main Application
// ===================================

// Blog Posts Data
const blogPosts = [
  {
    id: 1,
    title: 'LiDAR vs Fotogrametría: ¿Cuál usar en cada proyecto?',
    excerpt: 'Descubre cuándo usar LiDAR o Fotogrametría en tus proyectos. Comparativa técnica para minería, forestal y construcción.',
    category: 'Tecnología',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80',
    date: '2025-01-15',
    readTime: '8 min',
    url: 'blog/lidar-vs-fotogrametria.html'
  },
  {
    id: 2,
    title: 'Medición de Espesores con Drones: Guía Completa UT',
    excerpt: 'Cómo realizar inspecciones ultrasónicas aéreas en tanques, silos y chimeneas sin andamios ni detención de planta.',
    category: 'Inspección',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600&q=80',
    date: '2025-01-10',
    readTime: '10 min',
    url: 'blog/medicion-espesores-drones.html'
  },
  {
    id: 3,
    title: 'Normativa DGAC para Drones en Chile 2025',
    excerpt: 'Todo lo que necesitas saber sobre la regulación de drones comerciales en Chile según la Dirección General de Aeronáutica Civil.',
    category: 'Normativa',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80',
    date: '2025-01-05',
    readTime: '12 min',
    url: 'blog/normativa-dgac-drones-chile.html'
  },
  {
    id: 4,
    title: 'Termografía en Paneles Solares: Detecta Hotspots',
    excerpt: 'Aprende cómo la termografía infrarroja puede detectar fallas en paneles solares antes de que afecten la generación.',
    category: 'Energía',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80',
    date: '2024-12-28',
    readTime: '7 min',
    url: 'blog/termografia-paneles-solares.html'
  },
  {
    id: 5,
    title: 'Gemelos Digitales Industriales con Drones',
    excerpt: 'Cómo crear modelos 3D precisos de tus instalaciones para optimización y planificación de proyectos.',
    category: 'Industria 4.0',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    date: '2024-12-20',
    readTime: '9 min',
    url: 'blog/gemelos-digitales-industriales.html'
  },
  {
    id: 6,
    title: 'Fumigación con Drones vs Tradicional',
    excerpt: 'Análisis comparativo de costos, eficiencia y resultados entre fumigación aérea con drones y métodos tradicionales.',
    category: 'Agricultura',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80',
    date: '2024-12-15',
    readTime: '6 min',
    url: 'blog/fumigacion-drones-vs-tradicional.html'
  }
];

// Industries Data (translated from React component)
const industries = [
  {
    id: 'mineria',
    name: 'Minería',
    icon: 'factory',
    tagline: 'Inspección sin detener operaciones',
    savings: 'Hasta 85% ahorro',
    image: 'https://images.unsplash.com/photo-1578496479763-c21c718af028?w=800&q=80',
    services: [
      { 
        name: 'Inspección Ultrasónica (UT)', 
        desc: 'Medición de espesores en tanques, silos y chimeneas', 
        saving: '85% vs andamios',
        icon: 'radio',
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
        icon: 'thermometer',
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
        icon: 'mountain',
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
        icon: 'wind',
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
        icon: 'target',
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
        icon: 'search',
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
        icon: 'droplets',
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
        icon: 'cpu',
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
    icon: 'zap',
    tagline: 'Mantención predictiva sin cortes',
    savings: 'Hasta 90% menos cortes',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    services: [
      { 
        name: 'Efecto Corona UV', 
        desc: 'Detección de fugas eléctricas en líneas AT', 
        saving: '90% menos cortes',
        icon: 'zap',
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
        icon: 'sun',
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
        icon: 'wind',
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
        icon: 'trees',
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
        icon: 'droplets',
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
    icon: 'wheat',
    tagline: 'Precisión que aumenta rendimiento',
    savings: 'Hasta 40% ahorro insumos',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
    services: [
      { 
        name: 'Fumigación Aérea', 
        desc: 'Aplicación precisa en laderas y viñedos', 
        saving: '40% insumos',
        icon: 'sprout',
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
        icon: 'target',
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
        icon: 'droplets',
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
        icon: 'wheat',
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
    icon: 'building-2',
    tagline: 'Control de obra en tiempo real',
    savings: 'Hasta 50% más eficiencia',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    services: [
      { 
        name: 'Seguimiento 3D', 
        desc: 'Timelapse semanal Planos vs Realidad', 
        saving: '50% control',
        icon: 'camera',
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
        icon: 'building-2',
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
        icon: 'search',
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
        icon: 'mountain',
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
        icon: 'cpu',
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
    icon: 'trees',
    tagline: 'Inventario y prevención de incendios',
    savings: 'Hasta 75% menos tiempo',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
    services: [
      { 
        name: 'Inventario LiDAR', 
        desc: 'Conteo de árboles y biomasa bajo vegetación', 
        saving: '75% más rápido',
        icon: 'target',
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
        icon: 'thermometer',
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
        icon: 'mountain',
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
    icon: 'phone',
    tagline: 'Torres sin subir técnicos',
    savings: 'Hasta 80% menos subidas',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    services: [
      { 
        name: 'Gemelo Digital Torres', 
        desc: 'Inventario de equipos instalados', 
        saving: '80% menos subidas',
        icon: 'cpu',
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
        icon: 'target',
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
        icon: 'shield',
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
    icon: 'fish',
    tagline: 'Vigilancia de centros remotos',
    savings: 'Seguridad 24/7',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    services: [
      { 
        name: 'Vigilancia Térmica', 
        desc: 'Rondas nocturnas automatizadas', 
        saving: '70% vs guardias',
        icon: 'shield',
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
        icon: 'search',
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
        icon: 'plane',
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
    icon: 'umbrella',
    tagline: 'Peritaje rápido post-siniestro',
    savings: 'Hasta 60% más rápido',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    services: [
      { 
        name: 'Evaluación Catástrofes', 
        desc: 'Mapeo 3D post terremoto/aluvión', 
        saving: '60% más rápido',
        icon: 'mountain',
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
        icon: 'camera',
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
        icon: 'trending-up',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
        sensor: 'Fotogrametría + Software de cubicación',
        cases: ['Derrumbes', 'Material quemado', 'Inundaciones (área)', 'Comparativa pre/post'],
        benefits: ['Volumen exacto', 'Área afectada precisa', 'Documentación legal', 'Evita disputas'],
        savingsDetail: 'Disputa por estimación: meses de litigio. Volumetría dron: evidencia objetiva.'
      }
    ]
  }
];

// State
let activeIndustry = industries[0];
let selectedService = null;
let mobileMenuOpen = false;

// DOM Elements
const heroImage = document.getElementById('heroImage');
const heroIcon = document.getElementById('heroIcon');
const heroSavings = document.getElementById('heroSavings');
const heroTitle = document.getElementById('heroTitle');
const heroTagline = document.getElementById('heroTagline');
const industryButtons = document.getElementById('industryButtons');
const servicesTitle = document.getElementById('servicesTitle');
const servicesGrid = document.getElementById('servicesGrid');
const ctaIndustry = document.getElementById('ctaIndustry');
const serviceModal = document.getElementById('serviceModal');
const menuToggle = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');
const scrollTopBtn = document.getElementById('scrollTop');
const loadingOverlay = document.getElementById('loadingOverlay');
const blogGrid = document.getElementById('blogGrid');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading overlay
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
    }, 500);

    renderIndustryButtons();
    updateDisplay();
    renderBlogPosts();
    lucide.createIcons();

    // Mobile menu toggle
    menuToggle.addEventListener('click', toggleMobileMenu);

    // Close modal on overlay click
    serviceModal.addEventListener('click', (e) => {
        if (e.target === serviceModal) {
            closeModal();
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closeMobileMenu();
        }
    });

    // Scroll to top button visibility
    window.addEventListener('scroll', handleScroll);

    // Scroll to top click
    scrollTopBtn.addEventListener('click', scrollToTop);

    // Form submission with validation
    document.getElementById('contactForm').addEventListener('submit', handleFormSubmit);

    // Real-time form validation
    setupFormValidation();
});

// Mobile Menu Functions
function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    navMobile.classList.toggle('active', mobileMenuOpen);

    // Update icon
    const menuIcon = document.getElementById('menuIcon');
    menuIcon.setAttribute('data-lucide', mobileMenuOpen ? 'x' : 'menu');
    lucide.createIcons();
}

function closeMobileMenu() {
    mobileMenuOpen = false;
    navMobile.classList.remove('active');

    const menuIcon = document.getElementById('menuIcon');
    menuIcon.setAttribute('data-lucide', 'menu');
    lucide.createIcons();
}

// Scroll Functions
function handleScroll() {
    const scrollY = window.scrollY;

    // Show/hide scroll to top button
    if (scrollY > 400) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Blog Posts Rendering
function renderBlogPosts() {
    if (!blogGrid) return;

    blogGrid.innerHTML = blogPosts.map(post => `
        <article class="blog-card" onclick="openBlogPost('${post.url}')">
            <div class="blog-card-image">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
                <span class="blog-card-category">${post.category}</span>
            </div>
            <div class="blog-card-content">
                <h3 class="blog-card-title font-display">${post.title}</h3>
                <p class="blog-card-excerpt">${post.excerpt}</p>
                <div class="blog-card-footer">
                    <div class="blog-card-meta">
                        <i data-lucide="clock"></i>
                        ${post.readTime}
                    </div>
                    <span class="blog-card-link">
                        Leer más <i data-lucide="arrow-right"></i>
                    </span>
                </div>
            </div>
        </article>
    `).join('');
}

function openBlogPost(url) {
    window.location.href = url;
}

// Toast Notification
function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => {
        toast.classList.add('visible');
    }, 10);

    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Form Validation
function setupFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error
    const existingError = field.parentNode.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }

    // Validation rules
    if (field.required && !value) {
        isValid = false;
        errorMessage = 'Este campo es requerido';
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Ingresa un email válido';
        }
    } else if (field.type === 'tel' && value) {
        const phoneRegex = /^[\d\s+()-]{8,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Ingresa un teléfono válido';
        }
    }

    // Update field state
    field.classList.remove('error', 'success');
    if (!isValid) {
        field.classList.add('error');
        const errorEl = document.createElement('span');
        errorEl.className = 'form-error';
        errorEl.textContent = errorMessage;
        field.parentNode.appendChild(errorEl);
    } else if (value) {
        field.classList.add('success');
    }

    return isValid;
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

// Render industry buttons
function renderIndustryButtons() {
    industryButtons.innerHTML = industries.map(ind => `
        <button 
            class="industry-btn ${ind.id === activeIndustry.id ? 'active' : ''}" 
            data-industry="${ind.id}"
            onclick="selectIndustry('${ind.id}')"
        >
            <i data-lucide="${ind.icon}"></i>
            ${ind.name}
        </button>
    `).join('');
}

// Select industry
function selectIndustry(industryId) {
    activeIndustry = industries.find(ind => ind.id === industryId);
    updateDisplay();
    renderIndustryButtons();
    lucide.createIcons();
}

// Update display based on active industry
function updateDisplay() {
    // Update hero
    heroImage.src = activeIndustry.image;
    heroImage.alt = activeIndustry.name;
    heroIcon.innerHTML = `<i data-lucide="${activeIndustry.icon}"></i>`;
    heroSavings.textContent = activeIndustry.savings;
    heroTitle.textContent = activeIndustry.name;
    heroTagline.textContent = activeIndustry.tagline;
    
    // Update services title
    servicesTitle.textContent = `Servicios disponibles para ${activeIndustry.name}`;
    
    // Update CTA
    ctaIndustry.textContent = activeIndustry.name;
    
    // Render services
    renderServices();
    
    // Update form industry select
    const industrySelect = document.getElementById('industry');
    if (industrySelect) {
        industrySelect.value = activeIndustry.id;
    }
    
    // Re-initialize icons
    lucide.createIcons();
}

// Render service cards
function renderServices() {
    servicesGrid.innerHTML = activeIndustry.services.map((service, index) => `
        <div class="service-card" onclick="openModal(${index})">
            <div class="service-card-image">
                <img src="${service.image}" alt="${service.name}" loading="lazy">
            </div>
            <div class="service-card-content">
                <div class="service-card-header">
                    <div class="service-card-icon">
                        <i data-lucide="${service.icon}"></i>
                    </div>
                    <div>
                        <h3 class="service-card-title font-display">${service.name}</h3>
                        <p class="service-card-desc">${service.desc}</p>
                    </div>
                </div>
                <div class="service-card-footer">
                    <span class="service-saving-badge">${service.saving}</span>
                    <span class="service-card-link">
                        Ver más <i data-lucide="arrow-right"></i>
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}

// Open modal
function openModal(serviceIndex) {
    selectedService = activeIndustry.services[serviceIndex];
    
    // Update modal content
    document.getElementById('modalImage').src = selectedService.image;
    document.getElementById('modalImage').alt = selectedService.name;
    document.getElementById('modalIcon').innerHTML = `<i data-lucide="${selectedService.icon}"></i>`;
    document.getElementById('modalTitle').textContent = selectedService.name;
    document.getElementById('modalDesc').textContent = selectedService.desc;
    document.getElementById('modalSensor').textContent = selectedService.sensor;
    
    // Render cases
    document.getElementById('modalCases').innerHTML = selectedService.cases.map(c => `
        <div class="case-item">
            <div class="case-dot"></div>
            ${c}
        </div>
    `).join('');
    
    // Render benefits
    document.getElementById('modalBenefits').innerHTML = selectedService.benefits.map(b => `
        <div class="benefit-item">
            <i data-lucide="check-circle-2"></i>
            ${b}
        </div>
    `).join('');
    
    // Update savings detail
    document.getElementById('modalSavingsDetail').textContent = selectedService.savingsDetail;
    
    // Show modal
    serviceModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Re-initialize icons
    lucide.createIcons();
}

// Close modal
function closeModal() {
    serviceModal.classList.remove('active');
    document.body.style.overflow = '';
    selectedService = null;
}

// Scroll to contact
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();

    // Validate form
    if (!validateForm(e.target)) {
        showToast('Por favor completa los campos requeridos', 'error');
        return;
    }

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Show loading state on button
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading-spinner" style="width:1.25rem;height:1.25rem;border-width:2px;display:inline-block;"></span> Enviando...';
    submitBtn.disabled = true;

    // Simulate sending (in production this would be an actual API call)
    setTimeout(() => {
        console.log('Form submitted:', data);

        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Show success message
        showToast('¡Gracias! Te contactaremos en menos de 24 horas.', 'success');

        // Reset form
        e.target.reset();

        // Remove success classes
        e.target.querySelectorAll('.success').forEach(el => el.classList.remove('success'));

        // Re-initialize icons
        lucide.createIcons();
    }, 1500);
}
