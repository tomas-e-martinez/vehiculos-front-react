import './Hero.css';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-badge">Nueva plataforma de gestión</span>
          <h1 className="hero-title">
            Gestiona tus vehículos y su
            <span className="gradient-text"> mantenimiento</span> de forma inteligente
          </h1>
          <p className="hero-description">
            Mantén el control total de tus vehículos. Registra mantenimientos,
            programa recordatorios y nunca más olvides un cambio de aceite o revisión importante.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={onGetStarted}>
              Comenzar Gratis
              <svg viewBox="0 0 24 24" fill="none" className="btn-icon">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="btn btn-outline btn-lg">
              Ver Demo
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">10K+</span>
              <span className="stat-label">Usuarios activos</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-value">50K+</span>
              <span className="stat-label">Vehículos registrados</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-value">99.9%</span>
              <span className="stat-label">Disponibilidad</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card hero-card-main">
            <div className="card-header">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M19 17H21V18C21 18.55 20.55 19 20 19H19V17Z" fill="currentColor"/>
                  <path d="M3 17H5V19H4C3.45 19 3 18.55 3 18V17Z" fill="currentColor"/>
                  <path d="M21 11L19.25 5.5C19 4.65 18.2 4 17.3 4H6.7C5.8 4 5 4.65 4.75 5.5L3 11V16C3 16.55 3.45 17 4 17H20C20.55 17 21 16.55 21 16V11Z" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="7" cy="14" r="1.5" fill="currentColor"/>
                  <circle cx="17" cy="14" r="1.5" fill="currentColor"/>
                </svg>
              </div>
              <span className="card-title">Toyota Corolla 2022</span>
            </div>
            <div className="card-body">
              <div className="maintenance-item">
                <div className="maintenance-icon good">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="maintenance-info">
                  <span className="maintenance-name">Cambio de aceite</span>
                  <span className="maintenance-date">Realizado hace 2 días</span>
                </div>
              </div>
              <div className="maintenance-item">
                <div className="maintenance-icon warning">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="maintenance-info">
                  <span className="maintenance-name">Rotación de neumáticos</span>
                  <span className="maintenance-date">Programado en 5 días</span>
                </div>
              </div>
              <div className="maintenance-item">
                <div className="maintenance-icon pending">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="maintenance-info">
                  <span className="maintenance-name">Revisión de frenos</span>
                  <span className="maintenance-date">En 2 meses</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-card hero-card-float">
            <div className="notification-content">
              <div className="notification-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="notification-text">
                <span className="notification-title">Recordatorio</span>
                <span className="notification-message">Cambio de aceite en 500 km</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
    </section>
  );
}
