# ConDrone.cl - Proyecto Web Completo

## Descripción
Proyecto web para ConDrone.cl, división de servicios de inspección aérea con drones de MCCO Copper.

## Estructura del proyecto

```
condrone-project/
├── README.md                    # Este archivo
├── web/
│   └── condrone-complete.jsx    # Componente React principal de la web
├── seo/
│   ├── Guia_SEO_ConDrone.docx   # Guía SEO completa (documento Word)
│   ├── schema-markup.html       # Schema markup listo para implementar
│   ├── sitemap.xml              # Mapa del sitio
│   └── robots.txt               # Configuración de rastreo
└── blog/
    ├── 01-lidar-vs-fotogrametria.md
    ├── 02-medicion-espesores-drones-ut.md
    ├── 03-normativa-dgac-drones-chile.md
    ├── 04-termografia-paneles-solares.md
    ├── 05-gemelos-digitales-industriales.md
    └── 06-fumigacion-drones-vs-tradicional.md
```

## Colores corporativos MCCO Copper

```css
:root {
  --salmon: #C4967A;
  --salmon-light: #D4AA92;
  --salmon-dark: #A67B62;
  --copper: #B87333;
  --copper-dark: #8B5A2B;
  --gray-warm: #8B8680;
  --gray-pale: #F5F3F0;
  --white-pale: #FDFCFB;
}
```

## Web (React)

El archivo `web/condrone-complete.jsx` contiene:
- Página principal con selector de industrias
- Cards de servicios con modal de detalle
- Información de sensores, casos de uso, beneficios y ahorros
- Diseño responsive
- Colores corporativos MCCO

### Industrias cubiertas:
1. Minería
2. Energía
3. Agricultura
4. Construcción
5. Forestal
6. Telecom
7. Acuicultura
8. Seguros

### Para usar:
```bash
# En un proyecto React/Next.js
npm install lucide-react
# Copiar el componente y usar
```

## SEO

### Guía SEO (Word)
Documento profesional con:
- Estrategia de keywords (B2B + volumen)
- Arquitectura de URLs
- Meta tags por página
- Schema Markup
- Google Business Profile
- Ideas de blog
- Checklist técnico

### Schema Markup
Archivo HTML con todos los scripts JSON-LD:
- LocalBusiness + ProfessionalService
- ItemList de servicios
- FAQPage
- BreadcrumbList
- Open Graph + Twitter Cards

### Sitemap
Mapa XML con todas las páginas:
- Home y contacto
- 8 páginas de industrias
- 11 páginas de servicios
- Blog

## Blog

6 artículos técnicos optimizados para SEO:

1. **LiDAR vs Fotogrametría** - Guía comparativa
2. **Medición de espesores UT** - Inspección sin andamios
3. **Normativa DGAC 2025** - Regulación de drones en Chile
4. **Termografía paneles solares** - Detección de hotspots
5. **Gemelos digitales** - Digital twins industriales
6. **Fumigación con drones** - Comparativa de costos

Cada artículo incluye:
- Meta title y description optimizados
- URL sugerida
- Keywords objetivo
- Contenido técnico de calidad
- CTAs hacia contacto

## Próximos pasos sugeridos

1. **Hosting**: Configurar dominio condrone.cl
2. **Framework**: Next.js recomendado para SEO
3. **CMS**: Considerar headless CMS para blog (Strapi, Contentful)
4. **Analytics**: Implementar GA4 + Search Console
5. **Google Business**: Crear ficha con datos del SEO
6. **Backlinks**: Solicitar enlace desde web de INGPROTEC/MCCO

## Contacto

- **Empresa**: MCCO Copper / INGPROTEC
- **Proyecto**: ConDrone.cl
- **Email**: contacto@condrone.cl

---

*Proyecto preparado por Claude para Mario Cabrera - MCCO Copper*
