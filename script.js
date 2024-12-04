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

    const renderHeader = () => (
        <div className="timeline-header">
            <h1 className="timeline-title">Línea de Tiempo SIED UNT</h1>
            <p className="timeline-subtitle">2013-2024</p>
            
            <div className="view-toggle">
                <button 
                    className={`view-button ${view === 'timeline' ? 'active' : ''}`}
                    onClick={() => setView('timeline')}
                >
                    <i data-feather="clock" />
                    Línea de Tiempo
                </button>
                <button 
                    className={`view-button ${view === 'calendar' ? 'active' : ''}`}
                    onClick={() => setView('calendar')}
                >
                    <i data-feather="calendar" />
                    Calendario
                </button>
            </div>
            
            <div className="filters-container">
                <div className="filter-group">
                    <label className="filter-label">Tipo de Evento</label>
                    <select 
                        className="filter-select"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option value="todos">Todos los tipos</option>
                        <option value="resolution">Resoluciones</option>
                        <option value="academic">Eventos Académicos</option>
                        <option value="institutional">Eventos Institucionales</option>
                        <option value="approval">Aprobaciones</option>
                        <option value="research">Investigación</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label className="filter-label">Área</label>
                    <select 
                        className="filter-select"
                        value={areaFilter}
                        onChange={(e) => setAreaFilter(e.target.value)}
                    >
                        <option value="todas">Todas las áreas</option>
                        <option value="Rectorado">Rectorado</option>
                        <option value="SIED UNT">SIED UNT</option>
                        <option value="Secretaría">Secretaría Académica</option>
                        <option value="HCS">HCS UNT</option>
                    </select>
                </div>
            </div>
        </div>
    );

    const renderYearSelector = () => (
        <div className="timeline-nav">
            {Object.keys(events).map(year => (
                <div
                    key={year}
                    className={`year-marker ${selectedYear === year ? 'active' : ''}`}
                    onClick={() => setSelectedYear(year)}
                >
                    {year}
                </div>
            ))}
        </div>
    );

    return (
        <div className="timeline-container">
            {renderHeader()}
            {renderYearSelector()}
            {view === 'timeline' ? renderTimeline() : renderCalendar()}
        </div>
    );
};

// Renderizar la aplicación
ReactDOM.render(<Timeline />, document.getElementById('root'));
