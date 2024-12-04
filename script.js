// Datos de eventos
const events = {
    2013: [
        {
            title: "UNT Virtual",
            type: "resolution",
            doc: "Res. N° 680-13",
            area: "Rectorado"
        }
    ],
    2019: [
        {
            title: "Aprobación/Validación SIED UNT",
            type: "approval",
            area: "SPU"
        }
    ],
    2021: [
        {
            title: "Diplomatura de Posgrado: Estrategias para enseñar y aprender en la Virtualidad",
            type: "academic",
            doc: "Res. N° 85-21",
            area: "Secretaría de Posgrado y Secretaría Académica"
        }
    ],
    2022: [
        {
            title: "Plan Estratégico Institucional UNT",
            type: "institutional",
            doc: "Documento Institucional",
            area: "Rectorado"
        },
        {
            title: "Reglamento General para Opciones Pedagógicas a Distancia",
            type: "regulation",
            doc: "Res. N° 2029-22",
            area: "Rectorado"
        },
        {
            title: "Estructura Organizacional del SIED UNT",
            type: "institutional",
            doc: "Res. N° 859-22",
            area: "Rectorado"
        }
    ],
    2023: [
        {
            title: "Comisión Intrainstitucional SIED UNT",
            type: "institutional",
            doc: "Res. N° 117/23",
            area: "Rectorado"
        },
        {
            title: "Aprobación Proyecto de Investigación PIUNT",
            type: "research",
            doc: "Res. HCS N° 356-23",
            area: "HCS UNT"
        },
        {
            title: "Taller 'La investigación científica y la formación de investigadores en EaD'",
            type: "academic",
            doc: "Res. N° 110-23",
            area: "SIED UNT"
        }
    ],
    2024: [
        {
            title: "Curso de Posgrado: IA en Acción",
            type: "academic",
            doc: "RES - DGAC - 5244/2024",
            area: "SIED UNT"
        },
        {
            title: "Convenio Marco UNT- Asociación Civil 'Chicos Net'",
            type: "institutional",
            doc: "RES - DGD - 13954/2024",
            area: "SIED UNT"
        },
        {
            title: "Ciclo de Talleres: Integrando IA en la UNT",
            type: "academic",
            doc: "RES - DGD - 16169/2024",
            area: "SIED UNT"
        }
    ]
};

// Variables globales
let selectedYear = null;
const eventsContainer = document.getElementById('events-container');
const typeFilter = document.getElementById('typeFilter');
const areaFilter = document.getElementById('areaFilter');

// Inicializar la línea de tiempo
function initTimeline() {
    const yearMarkers = document.querySelectorAll('.year-marker');
    yearMarkers.forEach(marker => {
        marker.addEventListener('click', () => {
            const year = marker.dataset.year;
            selectYear(year);
        });
    });

    // Configurar filtros
    typeFilter.addEventListener('change', updateEvents);
    areaFilter.addEventListener('change', updateEvents);
    
    // Seleccionar el año más reciente por defecto
    selectYear('2024');
}

// Seleccionar un año
function selectYear(year) {
    selectedYear = year;
    document.querySelectorAll('.year-marker').forEach(marker => {
        marker.classList.toggle('active', marker.dataset.year === year);
    });
    updateEvents();
}

// Actualizar eventos mostrados
function updateEvents() {
    if (!selectedYear) return;
    
    const type = typeFilter.value;
    const area = areaFilter.value;
    
    const filteredEvents = events[selectedYear]?.filter(event => {
        const typeMatch = type === 'todos' || event.type === type;
        const areaMatch = area === 'todas' || event.area.includes(area);
        return typeMatch && areaMatch;
    }) || [];
    
    renderEvents(filteredEvents);
}

// Renderizar eventos
function renderEvents(eventsList) {
    eventsContainer.innerHTML = '';
    
    if (eventsList.length === 0) {
        eventsContainer.innerHTML = '<p class="text-center text-gray-500 p-4">No se encontraron eventos para los filtros seleccionados</p>';
        return;
    }
    
    eventsList.forEach(event => {
        const card = document.createElement('div');
        card.className = `event-card event-${event.type}`;
        
        card.innerHTML = `
            <h3 class="event-title">${event.title}</h3>
            <p class="event-details">
                ${event.doc ? event.doc + ' | ' : ''}${event.area}
            </p>
        `;
        
        eventsContainer.appendChild(card);
    });
}

// Inicializar cuando el documento esté listo
document.addEventListener('DOMContentLoaded', initTimeline);
