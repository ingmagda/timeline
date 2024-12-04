// Componente principal
const Timeline = () => {
    const [view, setView] = React.useState('timeline');
    const [selectedYear, setSelectedYear] = React.useState(null);
    const [typeFilter, setTypeFilter] = React.useState('todos');
    const [areaFilter, setAreaFilter] = React.useState('todas');
    const [selectedEvent, setSelectedEvent] = React.useState(null);

    const events = {
        2013: [
            {
                title: "UNT Virtual",
                type: "resolution",
                doc: "Res. N° 680-13",
                area: "Rectorado",
                month: "Marzo",
                description: "Creación de UNT Virtual"
            }
        ],
        2019: [
            {
                title: "Aprobación/Validación SIED UNT",
                type: "approval",
                area: "SPU",
                month: "Julio",
                description: "Validación del Sistema Institucional de Educación a Distancia"
            }
        ],
        2021: [
            {
                title: "Diplomatura de Posgrado: Estrategias para enseñar y aprender en la Virtualidad",
                type: "academic",
                doc: "Res. N° 85-21",
                area: "Secretaría de Posgrado",
                month: "Mayo",
                description: "Aprobación del trayecto curricular sistémico de posgrado"
            }
        ],
        2022: [
            {
                title: "Plan Estratégico Institucional UNT",
                type: "institutional",
                doc: "Documento Institucional",
                area: "Rectorado",
                month: "Marzo"
            },
            {
                title: "Reglamento General para Opciones Pedagógicas a Distancia",
                type: "regulation",
                doc: "Res. N° 2029-22",
                area: "Rectorado",
                month: "Junio"
            },
            {
                title: "Estructura Organizacional del SIED UNT",
                type: "institutional",
                doc: "Res. N° 859-22",
                area: "Rectorado",
                month: "Agosto"
            }
        ],
        2023: [
            {
                title: "Comisión Intrainstitucional SIED UNT",
                type: "institutional",
                doc: "Res. N° 117/23",
                area: "Rectorado",
                month: "Febrero"
            },
            {
                title: "Aprobación Proyecto de Investigación PIUNT",
                type: "research",
                doc: "Res. HCS N° 356-23",
                area: "HCS UNT",
                month: "Mayo"
            },
            {
                title: "Ciclo de Webinarios CPRES NOA",
                type: "academic",
                doc: "Res. N° 1432/2024",
                area: "CPRES NOA",
                month: "Septiembre"
            }
        ],
        2024: [
            {
                title: "Curso de Posgrado: IA en Acción",
                type: "academic",
                doc: "RES - DGAC - 5244/2024",
                area: "SIED UNT",
                month: "Febrero"
            },
            {
                title: "Curso de Posgrado: Integración de IA en la Escritura Académica",
                type: "academic",
                doc: "RES - DGAC -7153/2024",
                area: "SIED UNT",
                month: "Marzo"
            },
            {
                title: "Convenio Marco UNT- Asociación Civil 'Chicos Net'",
                type: "institutional",
                doc: "RES - DGD - 13954/2024",
                area: "SIED UNT",
                month: "Abril"
            },
            {
                title: "Ciclo de Talleres: Integrando IA en la UNT",
                type: "academic",
                doc: "RES - DGD - 16169/2024",
                area: "SIED UNT",
                month: "Mayo"
            }
        ]
    };

    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const getEventIcon = (type) => {
        switch(type) {
            case 'resolution': return 'file-text';
            case 'academic': return 'book';
            case 'institutional': return 'landmark';
            case 'approval': return 'award';
            case 'research': return 'users';
            case 'regulation': return 'book-open';
            default: return 'calendar';
        }
    };

    React.useEffect(() => {
        // Inicializar Feather Icons después de cada render
        if (window.feather) {
            window.feather.replace();
        }
        
        // Seleccionar el año más reciente por defecto
        if (!selectedYear) {
            setSelectedYear('2024');
        }
    }, [view, selectedYear]);

    const filteredEvents = React.useMemo(() => {
        if (!selectedYear) return [];
        
        return events[selectedYear].filter(event => {
            const typeMatch = typeFilter === 'todos' || event.type === typeFilter;
            const areaMatch = areaFilter === 'todas' || event.area.includes(areaFilter);
            return typeMatch && areaMatch;
        });
    }, [selectedYear, typeFilter, areaFilter]);

    const renderTimeline = () => (
        <div className="events-grid">
            {filteredEvents.map((event, index) => (
                <div key={index} className={`event-card event-${event.type}`}>
                    <i data-feather={getEventIcon(event.type)} className="event-icon" />
                    <h3 className="event-title">{event.title}</h3>
                    <div className="event-details">
                        <div className="event-date">
                            <i data-feather="calendar" className="w-4 h-4" />
                            {event.month}
                        </div>
                        {event.doc && <div>{event.doc}</div>}
                        <div>{event.area}</div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderCalendar = () => (
        <div className="calendar-grid">
            {months.map(month => {
                const monthEvents = filteredEvents.filter(event => event.month === month);
                
                return (
                    <div key={month} className="month-card">
                        <h3 className="month-title">{month}</h3>
                        <div className="month-events">
                            {monthEvents.map((event, index) => (
                                <div
