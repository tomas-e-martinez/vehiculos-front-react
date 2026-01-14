import './Features.css';

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M19 17H21V18C21 18.55 20.55 19 20 19H19V17Z" fill="currentColor"/>
        <path d="M3 17H5V19H4C3.45 19 3 18.55 3 18V17Z" fill="currentColor"/>
        <path d="M21 11L19.25 5.5C19 4.65 18.2 4 17.3 4H6.7C5.8 4 5 4.65 4.75 5.5L3 11V16C3 16.55 3.45 17 4 17H20C20.55 17 21 16.55 21 16V11Z" stroke="currentColor" strokeWidth="2"/>
        <circle cx="7" cy="14" r="1.5" fill="currentColor"/>
        <circle cx="17" cy="14" r="1.5" fill="currentColor"/>
      </svg>
    ),
    title: 'Registro de Vehículos',
    description: 'Añade todos tus vehículos con sus detalles: marca, modelo, año, kilometraje y más. Todo en un solo lugar.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M14.7 6.3C14.3 5.9 13.7 5.9 13.3 6.3L8.3 11.3C7.9 11.7 7.9 12.3 8.3 12.7L13.3 17.7C13.7 18.1 14.3 18.1 14.7 17.7C15.1 17.3 15.1 16.7 14.7 16.3L10.4 12L14.7 7.7C15.1 7.3 15.1 6.7 14.7 6.3Z" fill="currentColor"/>
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    title: 'Historial Completo',
    description: 'Mantén un registro detallado de todos los mantenimientos, reparaciones y gastos de cada vehículo.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Recordatorios Inteligentes',
    description: 'Recibe notificaciones automáticas cuando se acerque un mantenimiento programado o revisión importante.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Programación Fácil',
    description: 'Programa mantenimientos futuros basados en fecha o kilometraje. Nunca más olvides un servicio.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M15 2H9C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M9 12H15M9 16H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Reportes Detallados',
    description: 'Genera informes de gastos, mantenimientos y estado general de tu flota de vehículos.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Fácil de Usar',
    description: 'Interfaz intuitiva diseñada para que gestionar tus vehículos sea simple y rápido.',
  },
];

export function Features() {
  return (
    <section className="features" id="features">
      <div className="features-container">
        <div className="features-header">
          <span className="features-badge">Características</span>
          <h2 className="features-title">Todo lo que necesitas para gestionar tus vehículos</h2>
          <p className="features-subtitle">
            Una plataforma completa con todas las herramientas para mantener tus vehículos en perfecto estado.
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
