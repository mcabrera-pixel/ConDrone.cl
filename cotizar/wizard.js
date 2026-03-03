/* ConDrone — Cotizador Profesional (Single-Page Reactive) */
/* ========================================================
   Pricing engine + reactive UI: every change recalculates
   ======================================================== */

// ── Pricing Config ──
const PRICING = {
    topografia: {
        label: 'Topografía & Fotogrametría',
        yieldUnit: 'ha',
        yieldPerDay: 50,
        dailyRate: 22,
        cabinetMultiplier: 1.2,
        drones: 'DJI Matrice 350 RTK + Zenmuse L2',
        meta: 'Rendimiento ~50 ha/día con RTK centimétrico.'
    },
    inspeccion: {
        label: 'Inspección Industrial',
        yieldUnit: 'puntos',
        yieldPerDay: 40,
        dailyRate: 28,
        cabinetMultiplier: 1.0,
        drones: 'DJI Matrice 350 RTK + H20T',
        meta: '~40 puntos de inspección por día.'
    },
    termografia: {
        label: 'Termografía & NDT',
        yieldUnit: 'puntos',
        yieldPerDay: 30,
        dailyRate: 32,
        cabinetMultiplier: 1.3,
        drones: 'DJI M350 + Zenmuse H20T (Radiométrica)',
        meta: '~30 puntos/día con cámara radiométrica.'
    },
    video: {
        label: 'Video & Fotografía Aérea',
        yieldUnit: 'horas de vuelo',
        yieldPerDay: 4,
        dailyRate: 18,
        cabinetMultiplier: 2.0,
        drones: 'DJI Mavic 3 Pro (Hasselblad 5.1K)',
        meta: '~4 hrs de vuelo/día, edición post-producción incluida.'
    },
    interiores: {
        label: 'Interiores & Espacios Confinados',
        yieldUnit: 'horas de vuelo',
        yieldPerDay: 3,
        dailyRate: 35,
        cabinetMultiplier: 1.5,
        drones: 'Elios 3 (Flyability)',
        meta: '~3 hrs/día. Ideal para calderas, silos, ductos.'
    },
    seguimiento: {
        label: 'Seguimiento de Obras',
        yieldUnit: 'vuelos',
        yieldPerDay: 8,
        dailyRate: 16,
        cabinetMultiplier: 0.8,
        drones: 'DJI Mavic 3 Enterprise + Matrice 350 RTK',
        meta: '~8 vuelos/día: ortomosaico + video update mensual.'
    },
    pipeline: {
        label: 'Pipeline / Inspección Lineal',
        yieldUnit: 'km',
        yieldPerDay: 15,
        dailyRate: 26,
        cabinetMultiplier: 1.0,
        drones: 'DJI Matrice 350 RTK + H20T',
        meta: '~15 km/día de pipeline: visual + termografía.'
    }
};

const DELIVERABLES = [
    { id: 'orto', label: 'Ortomosaico + Nube de Puntos', cost: 3.5, icon: 'fa-map' },
    { id: 'informe', label: 'Informe de Inspección Visual', cost: 2.5, icon: 'fa-file-lines' },
    { id: 'modelo', label: 'Modelo 3D / MDE / MDS', cost: 5.0, icon: 'fa-cube' },
    { id: 'termo', label: 'Informe Termográfico', cost: 4.0, icon: 'fa-temperature-high' },
    { id: 'video', label: 'Video Editado 4K/5.1K', cost: 6.0, icon: 'fa-film' },
    { id: 'ndt', label: 'Informe NDT — Espesores (API 653)', cost: 5.0, icon: 'fa-ruler' },
    { id: 'gis', label: 'GIS / KML / Shapefile', cost: 2.0, icon: 'fa-earth-americas' }
];

const LOGISTICS = {
    rm: { label: 'Santiago / Región Metropolitana', transport: 0, perDiem: 0 },
    central: { label: 'Zona Central (V–VI Región)', transport: 3, perDiem: 2 },
    northSouth: { label: 'Norte/Sur (Vuelo requerido)', transport: 10, perDiem: 5 },
    mining: { label: 'Faena Minera (Norte)', transport: 14, perDiem: 8 }
};

const UF_CLP = 38800;

// ── State ──
let selectedDeliverables = new Set(['orto']);

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
    renderDeliverables();
    bindEvents();
    recalculate();
});

function renderDeliverables() {
    const grid = document.getElementById('deliverables-grid');
    grid.innerHTML = DELIVERABLES.map(d => {
        const sel = selectedDeliverables.has(d.id) ? 'selected' : '';
        return `
            <div class="checkbox-item ${sel}" data-id="${d.id}" onclick="toggleDeliverable('${d.id}', this)">
                <span class="check-icon"><i class="fa-solid fa-check"></i></span>
                <i class="fa-solid ${d.icon}" style="color:var(--chile-blue); width:16px;"></i>
                <span>${d.label}</span>
            </div>
        `;
    }).join('');
}

function toggleDeliverable(id, el) {
    if (selectedDeliverables.has(id)) {
        if (selectedDeliverables.size === 1) return; // keep at least 1
        selectedDeliverables.delete(id);
        el.classList.remove('selected');
    } else {
        selectedDeliverables.add(id);
        el.classList.add('selected');
    }
    recalculate();
}

function bindEvents() {
    document.getElementById('service-select').addEventListener('change', () => {
        updateServiceMeta();
        recalculate();
    });
    document.getElementById('size-input').addEventListener('input', recalculate);
    document.getElementById('location-select').addEventListener('change', recalculate);
    document.getElementById('hazard-toggle').addEventListener('change', recalculate);
    document.getElementById('dgac-toggle').addEventListener('change', recalculate);
    document.getElementById('urgency-toggle').addEventListener('change', recalculate);

    updateServiceMeta();
}

function updateServiceMeta() {
    const svc = PRICING[document.getElementById('service-select').value];
    document.getElementById('size-unit').textContent = svc.yieldUnit;
    document.getElementById('service-meta').textContent = svc.meta;
    document.getElementById('size-meta').textContent = `Rendimiento: ~${svc.yieldPerDay} ${svc.yieldUnit}/día`;
}

// ── Price Engine ──
function recalculate() {
    const serviceKey = document.getElementById('service-select').value;
    const size = Math.max(1, parseFloat(document.getElementById('size-input').value) || 1);
    const locationKey = document.getElementById('location-select').value;
    const hazard = document.getElementById('hazard-toggle').checked;
    const dgac = document.getElementById('dgac-toggle').checked;
    const urgent = document.getElementById('urgency-toggle').checked;

    const svc = PRICING[serviceKey];
    const loc = LOGISTICS[locationKey];

    // Days
    const daysField = Math.ceil(size / svc.yieldPerDay);
    const daysCabinet = Math.ceil(daysField * svc.cabinetMultiplier);
    const totalDays = daysField + daysCabinet;

    // Terrain
    const terrainCost = daysField * svc.dailyRate;

    // Logistics
    const transportCost = loc.transport;
    const perDiemCost = loc.perDiem * daysField;

    // Deliverables
    const deliverablesBreakdown = [];
    let cabinetTotal = 0;
    DELIVERABLES.forEach(d => {
        if (selectedDeliverables.has(d.id)) {
            const scaleFactor = 1 + Math.log10(Math.max(1, size / 10));
            const cost = d.cost * scaleFactor;
            cabinetTotal += cost;
            deliverablesBreakdown.push({ label: d.label, cost: cost });
        }
    });

    // Extras
    const hazardCost = hazard ? daysField * 8 : 0;
    const dgacCost = dgac ? 3 : 0;

    let subtotal = terrainCost + transportCost + perDiemCost + cabinetTotal + hazardCost + dgacCost;

    // Urgency
    const urgencyCost = urgent ? subtotal * 0.30 : 0;
    subtotal += urgencyCost;

    // Volume discount
    let discount = 0;
    if (subtotal > 200) discount = -subtotal * 0.10;
    else if (subtotal > 100) discount = -subtotal * 0.05;
    subtotal += discount;

    const totalUF = Math.max(8, subtotal);
    const totalCLP = totalUF * UF_CLP;

    // HH estimate
    const hh = Math.round(totalUF / 1.8);

    renderResult({
        svc, loc, totalUF, totalCLP, hh,
        daysField, daysCabinet, totalDays,
        terrainCost, transportCost, perDiemCost,
        cabinetTotal, deliverablesBreakdown,
        hazard, hazardCost, dgac, dgacCost,
        urgent, urgencyCost, discount
    });
}

// ── Render Result Panel ──
function renderResult(d) {
    const panel = document.getElementById('calc-result');

    panel.innerHTML = `
        <!-- Price Box -->
        <div class="price-box">
            <div class="price-label">Inversión Estimada</div>
            <div class="price-amount">${formatUF(d.totalUF)} <span class="price-iva">+ IVA</span></div>
            <div class="price-clp">Ref. ${formatMoney(d.totalCLP)}</div>
        </div>

        <!-- Breakdown -->
        <div class="breakdown-section">
            <div class="breakdown-title">Desglose</div>
            <table class="breakdown-table">
                <tr><td>Operación en Terreno</td><td>${formatUF(d.terrainCost)}</td></tr>
                <tr class="sub-row"><td>${d.daysField} día(s) × ${d.svc.dailyRate} UF</td><td></td></tr>
                ${d.transportCost > 0 ? `<tr><td>Transporte / Movilización</td><td>${formatUF(d.transportCost)}</td></tr>` : ''}
                ${d.perDiemCost > 0 ? `<tr><td>Viáticos</td><td>${formatUF(d.perDiemCost)}</td></tr>` : ''}
                <tr><td>Proc. y Entregables</td><td>${formatUF(d.cabinetTotal)}</td></tr>
                ${d.deliverablesBreakdown.map(item => `
                    <tr class="sub-row"><td>${item.label}</td><td>${formatUF(item.cost)}</td></tr>
                `).join('')}
                ${d.hazardCost > 0 ? `<tr><td>Zona Peligrosa</td><td>${formatUF(d.hazardCost)}</td></tr>` : ''}
                ${d.dgacCost > 0 ? `<tr><td>Permiso DGAC</td><td>${formatUF(d.dgacCost)}</td></tr>` : ''}
                ${d.urgencyCost > 0 ? `<tr><td>Recargo Urgencia (+30%)</td><td>${formatUF(d.urgencyCost)}</td></tr>` : ''}
                ${d.discount < 0 ? `<tr><td>Desc. Volumen</td><td style="color:green">${formatUF(d.discount)}</td></tr>` : ''}
                <tr class="total-row"><td>Total Neto</td><td>${formatUF(d.totalUF)}</td></tr>
            </table>
        </div>

        <!-- Specs -->
        <div class="breakdown-section">
            <div class="breakdown-title">Detalles Técnicos</div>
            <ul class="specs-list">
                <li><strong>Equipo:</strong> ${d.svc.drones}</li>
                <li><strong>Terreno:</strong> ${d.daysField} día(s) · <strong>Gabinete:</strong> ${d.daysCabinet} día(s)</li>
                <li><strong>Plazo Total:</strong> ${d.totalDays} días corridos</li>
                <li><strong>HH Estimadas:</strong> ${d.hh} HH</li>
                <li><strong>Ubicación:</strong> ${d.loc.label}</li>
            </ul>
        </div>

        <!-- CTA -->
        <div class="cta-section">
            <h3>¿Listo para cotizar?</h3>
            <input type="text" id="client-name" placeholder="Tu nombre">
            <input type="text" id="client-company" placeholder="Empresa (opcional)">
            <input type="tel" id="client-phone" placeholder="Teléfono (opcional)">
            <button class="btn-email" onclick="sendQuote()">
                <i class="fa-solid fa-envelope"></i> Enviar Cotización por Email
            </button>
            <a class="btn-whatsapp" href="https://wa.me/56979860843" target="_blank">
                <i class="fa-brands fa-whatsapp"></i> Consultar por WhatsApp
            </a>
            <p class="disclaimer">Estimación Clase 4 · Vigencia 30 días · Valores neto + IVA<br>Forma de Pago: 50% Anticipo / 50% Contra Entrega</p>
        </div>
    `;
}

// ── Send Quote via mailto ──
function sendQuote() {
    const clientName = document.getElementById('client-name')?.value || '';
    const clientCompany = document.getElementById('client-company')?.value || '';
    const clientPhone = document.getElementById('client-phone')?.value || '';

    // Recalculate to get values
    const serviceKey = document.getElementById('service-select').value;
    const size = Math.max(1, parseFloat(document.getElementById('size-input').value) || 1);
    const locationKey = document.getElementById('location-select').value;
    const svc = PRICING[serviceKey];

    // Gather selected deliverables labels
    const selectedLabels = DELIVERABLES.filter(d => selectedDeliverables.has(d.id)).map(d => d.label);

    // Get current total from the rendered price
    const priceEl = document.querySelector('.price-amount');
    const totalText = priceEl ? priceEl.textContent.trim() : '';

    const body = [
        `PROPUESTA TÉCNICA ECONÓMICA — ConDrone`,
        `════════════════════════════════════════`,
        ``,
        `Cliente: ${clientName}`,
        clientCompany ? `Empresa: ${clientCompany}` : '',
        clientPhone ? `Teléfono: ${clientPhone}` : '',
        ``,
        `SERVICIO: ${svc.label}`,
        `Alcance: ${size} ${svc.yieldUnit}`,
        `Drones: ${svc.drones}`,
        `Ubicación: ${LOGISTICS[locationKey].label}`,
        ``,
        `ENTREGABLES:`,
        ...selectedLabels.map(l => `  • ${l}`),
        ``,
        `INVERSIÓN ESTIMADA: ${totalText}`,
        ``,
        `═══ CONDICIONES ═══`,
        `• Vigencia: 30 días corridos`,
        `• Valores Neto (No incluyen IVA)`,
        `• Forma de Pago: 50% Anticipo / 50% Contra Entrega`,
        `• Estimación clase 4 sujeta a visita técnica`,
        ``,
        `──────────────────────────`,
        `ConDrone — Servicios Profesionales de Drones`,
        `+56 9 7986 0843 | mcabrera@mccocopper.cl`,
        `condrone.cl`
    ].filter(Boolean).join('\n');

    const subject = `Propuesta Técnica ${svc.label} — ${totalText} — ConDrone`;
    const cc = 'mcabrera@mccocopper.cl';

    const mailtoLink = `mailto:?cc=${encodeURIComponent(cc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    // Show toast confirmation
    showToast('✅ Se abrió tu cliente de correo con la propuesta. Solo presiona Enviar.');
}

function showToast(message) {
    const existing = document.querySelector('.wizard-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'wizard-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
}

// ── Formatting Helpers ──
function formatUF(v) {
    if (v === 0) return '0 UF';
    return v.toFixed(1).replace(/\.0$/, '') + ' UF';
}

function formatMoney(v) {
    return '$' + Math.round(v).toLocaleString('es-CL') + ' CLP';
}
