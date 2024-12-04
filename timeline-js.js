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
    // ... Agregar todos los eventos aquí
};

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
    
    const filteredEvents = events[selectedYear].filter(event => {
        const typeMatch = type === 'todos' || event.type === type;
        const areaMatch = area === 'todas' || event.area.includes(area);
        return typeMatch && areaMatch;
    });
    
    renderEvents(filteredEvents);
}

// Renderizar eventos
function renderEvents(eventsList) {
    eventsContainer.innerHTML = '';
    
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
    
    if (eventsList.length === 0) {
        eventsContainer.innerHTML = '<p class="text-center text-gray-500">No se encontraron eventos para los filtros seleccionados</p>';
    }
}

// Inicializar cuando el documento esté listo
document.addEventListener('DOMContentLoaded', initTimeline);
