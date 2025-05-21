import React, { useState } from "react";
import { ModoSimulador } from "../../types/dualidad";

const Dashboard = ({ onStart }) => {
  const [modo, setModo] = useState(null);
  
  return (
    <div className="dashboard-container fade-in">
      {/* Header con olas animadas */}
      <div className="ocean-header">
        <div className="wave-container">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
        </div>
        <div className="header-content">
          <div className="logo-container">
            <svg className="dashboard-logo" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="#58a5f0" />
              <path d="M50,10 A40,40 0 0,1 90,50 A40,40 0 0,1 50,90 A40,40 0 0,1 10,50 A40,40 0 0,1 50,10 Z" fill="none" stroke="#0277bd" strokeWidth="2" />
              <path d="M25,50 Q35,40 45,50 Q55,60 65,50 Q75,40 85,50" fill="none" stroke="white" strokeWidth="3" />
              <path d="M15,60 Q25,50 35,60 Q45,70 55,60 Q65,50 75,60" fill="none" stroke="white" strokeWidth="3" />
              <path d="M50,20 L50,30 M40,25 L60,25" stroke="#f57c00" strokeWidth="4" strokeLinecap="round" />
              <circle cx="50" cy="35" r="5" fill="#f57c00" />
            </svg>
          </div>
          <h1>Simulador de Emergencias ER-Simulator</h1>
        </div>
      </div>
      
      {/* Contenedor principal */}
      <div className="dashboard-hero card-max text-center">
        <p className="dashboard-description">
          Bienvenido al simulador avanzado de derrames en el litoral andaluz. Elige
          tu rol, define condiciones ambientales y gestiona la emergencia según la
          normativa real.
        </p>
        
        {/* Selector de modo con iconos */}
        <div className="mode-selector">
          <div 
            className={`mode-card ${modo === "entrenamiento" ? "mode-selected" : ""}`}
            onClick={() => setModo("entrenamiento")}
          >
            <div className="mode-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 4v16M4 12h16" strokeLinecap="round" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>
            <h3>Entrenamiento</h3>
            <p>Aprende y practica sin consecuencias</p>
          </div>
          
          <div 
            className={`mode-card ${modo === "simulacro" ? "mode-selected" : ""}`}
            onClick={() => setModo("simulacro")}
          >
            <div className="mode-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13 12H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3>Simulacro real</h3>
            <p>Coordina equipos y gestiona recursos</p>
          </div>
        </div>
        
        <button 
          onClick={() => modo && onStart(modo)} 
          disabled={!modo}
          className={`start-button ${modo ? "animate-pulse" : ""}`}
        >
          {modo ? (
            <>
              <span className="emergency-pulse"></span>
              Empezar Simulación
            </>
          ) : "Selecciona un modo"}
        </button>
      </div>
      
      {/* Sección de características */}
      <div className="features-section">
        <h2>Funcionalidades principales</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20v-6M12 8V2M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24M2 12h6M16 12h6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24" strokeLinecap="round" />
              </svg>
            </div>
            <h3>Aprende Normativa</h3>
            <p>Familiarízate con los protocolos oficiales y planes de contingencia para emergencias de derrames.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8v4l3 3M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" strokeLinecap="round" />
              </svg>
            </div>
            <h3>Practica Decisiones</h3>
            <p>Toma decisiones críticas en tiempo real y observa sus consecuencias en un entorno simulado seguro.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" />
              </svg>
            </div>
            <h3>Mejora Coordinación</h3>
            <p>Desarrolla habilidades de comunicación y coordinación entre los diferentes roles implicados.</p>
          </div>
        </div>
      </div>
      
      {/* Diagrama de proceso */}
      <div className="process-section card-wide">
        <h2>Proceso de simulación</h2>
        <div className="process-diagram">
          <div className="process-step">
            <div className="step-number">1</div>
            <div className="step-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8M8 12h8" strokeLinecap="round" />
              </svg>
            </div>
            <h4>Selección de ubicación</h4>
            <p>Elige el punto exacto del derrame en el mapa</p>
          </div>
          <div className="process-arrow"></div>
          <div className="process-step">
            <div className="step-number">2</div>
            <div className="step-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" />
              </svg>
            </div>
            <h4>Asignación de rol</h4>
            <p>Define tu papel en la gestión de la emergencia</p>
          </div>
          <div className="process-arrow"></div>
          <div className="process-step">
            <div className="step-number">3</div>
            <div className="step-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 10h-4v4h4v-4zM2 7a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7z" strokeLinecap="round" />
                <path d="M2 11h4M2 15h4M10 2v4M14 2v4M18 2v4" strokeLinecap="round" />
              </svg>
            </div>
            <h4>Condiciones ambientales</h4>
            <p>Establece viento, oleaje y otros factores</p>
          </div>
          <div className="process-arrow"></div>
          <div className="process-step">
            <div className="step-number">4</div>
            <div className="step-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h4>Gestión de emergencia</h4>
            <p>Controla la situación y toma decisiones</p>
          </div>
        </div>
      </div>
      
      {/* Zonas grises */}
      <div className="card card-wide grey-zones-card">
        <div className="grey-zones-content">
          <div className="grey-zones-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <path d="M12 9v4M12 17h.01" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h2>¿Qué son las "Zonas Grises"?</h2>
            <p>
              Áreas, actividades o interfaces entre equipos/sistemas que suelen ser ignoradas 
              por ser repetitivas, conocidas, de otros departamentos o aparentemente poco peligrosas. 
              Son focos habituales de siniestros y deben ser identificadas y gestionadas en el simulacro.
            </p>
            <p className="text-secondary example-text">
              <strong>Ejemplo:</strong> Un punto de transferencia entre el equipo de operaciones y 
              el de mantenimiento donde nadie asume la responsabilidad directa ante una anomalía.
            </p>
          </div>
        </div>
      </div>
      
      {/* Enlaces */}
      <div className="legal-links card-max">
        <h3>Recursos normativos</h3>
        <div className="links-container">
          <a
            href="https://www.boe.es/buscar/doc.php?id=BOE-A-2012-15482"
            target="_blank"
            rel="noopener noreferrer"
            className="legal-link"
          >
            <div className="link-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="link-text">
              <span>Consultar Real Decreto 1695/2012</span>
              <small>Sistema Nacional de Respuesta</small>
            </div>
          </a>
          
          <a
            href="https://www.juntadeandalucia.es/medioambiente/servtc5/pecla/pecla.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="legal-link"
          >
            <div className="link-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="link-text">
              <span>Ver PECLA Andalucía</span>
              <small>Plan de Emergencia ante Contaminación del Litoral Andaluz</small>
            </div>
          </a>
        </div>
      </div>
      
      {/* Footer con olas */}
      <div className="ocean-footer">
        <div className="wave-container">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
        </div>
        <div className="footer-content">
          <p>© 2025 - Simulador de Emergencias ER-Simulator</p>
        </div>
      </div>
      
      <style jsx>{`
        .dashboard-container {
          padding-bottom: 2rem;
          overflow-x: hidden;
          width: 100%;
        }
        
        /* Header con olas */
        .ocean-header, .ocean-footer {
          position: relative;
          width: 100%;
          height: 200px;
          background: linear-gradient(0deg, var(--primary-light) 0%, var(--primary) 100%);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
        }
        
        .ocean-footer {
          height: 150px;
          margin-top: 3rem;
          margin-bottom: 0;
          background: linear-gradient(180deg, var(--primary-light) 0%, var(--primary) 100%);
        }
        
        .wave-container {
          position: absolute;
          width: 100%;
          height: 100px;
          bottom: 0;
          left: 0;
          right: 0;
        }
        
        .wave {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100px;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%23f5f7fa'/%3E%3C/svg%3E");
          background-size: 1200px 100px;
        }
        
        .wave1 {
          opacity: 0.7;
          animation: wave-animation 30s linear infinite;
          z-index: 1;
        }
        
        .wave2 {
          opacity: 0.5;
          animation: wave-animation 15s linear infinite reverse;
          z-index: 2;
        }
        
        @keyframes wave-animation {
          0% { background-position-x: 0; }
          100% { background-position-x: 1200px; }
        }
        
        .header-content, .footer-content {
          z-index: 3;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: white;
          padding: 0 1rem;
        }
        
        .footer-content {
          margin-bottom: 60px;
        }
        
        .logo-container {
          width: 80px;
          height: 80px;
          margin-bottom: 1rem;
        }
        
        .dashboard-logo {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
        }
        
        .header-content h1 {
          color: white;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .header-content h1:after {
          display: none;
        }
        
        /* Dashboard principal */
        .dashboard-hero {
          padding: 2rem;
          position: relative;
          box-shadow: var(--shadow-lg);
          border-radius: var(--radius-lg);
          background: var(--card-bg);
          border: 1px solid var(--border);
        }
        
        .dashboard-description {
          font-size: 1.2rem;
          max-width: 80%;
          margin: 0 auto 2.5rem;
          color: var(--text-secondary);
        }
        
        /* Selector de modo */
        .mode-selector {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2.5rem;
        }
        
        .mode-card {
          padding: 1.5rem;
          background: var(--background);
          border-radius: var(--radius);
          border: 2px solid var(--border);
          width: 250px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: var(--shadow);
        }
        
        .mode-selected {
          border-color: var(--primary);
          box-shadow: 0 0 0 2px var(--primary-light), var(--shadow-lg);
          transform: translateY(-5px);
        }
        
        .mode-icon {
          width: 60px;
          height: 60px;
          background: var(--primary-light);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          color: white;
          transition: all 0.3s ease;
        }
        
        .mode-card:hover .mode-icon {
          background: var(--primary);
          transform: scale(1.1) rotate(10deg);
        }
        
        .mode-icon svg {
          width: 30px;
          height: 30px;
        }
        
        .mode-card h3 {
          margin: 0.5rem 0;
          color: var(--primary-dark);
        }
        
        .mode-card p {
          margin: 0;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        
        /* Botón de inicio */
        .start-button {
          background: var(--success);
          color: white;
          font-size: 1.2rem;
          font-weight: bold;
          padding: 1rem 2.5rem;
          border-radius: var(--radius);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 1rem;
          box-shadow: var(--shadow);
        }
        
        .start-button:hover {
          background: #35a13c;
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
        }
        
        .start-button:disabled {
          background: var(--text-light);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .emergency-pulse {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #ff5252;
          margin-right: 10px;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(255, 82, 82, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 82, 82, 0); }
        }
        
        /* Sección de características */
        .features-section {
          margin: 4rem auto;
          max-width: 1000px;
          padding: 0 1rem;
        }
        
        .features-section h2 {
          text-align: center;
          margin-bottom: 2rem;
          position: relative;
          padding-bottom: 1rem;
        }
        
        .features-section h2:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: var(--accent);
          border-radius: 2px;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        
        .feature-card {
          background: var(--card-bg);
          border-radius: var(--radius);
          padding: 2rem 1.5rem;
          text-align: center;
          box-shadow: var(--shadow);
          border: 1px solid var(--border);
          transition: all 0.3s ease;
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }
        
        .feature-icon {
          width: 60px;
          height: 60px;
          background: var(--primary-light);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: white;
        }
        
        .feature-icon svg {
          width: 30px;
          height: 30px;
        }
        
        .feature-card h3 {
          color: var(--primary-dark);
          margin: 0 0 1rem;
        }
        
        .feature-card p {
          color: var(--text-secondary);
          margin: 0;
          font-size: 0.95rem;
        }
        
        /* Diagrama de proceso */
        .process-section {
          margin: 4rem auto;
          padding: 2rem;
          background: var(--card-bg);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow);
          border: 1px solid var(--border);
        }
        
        .process-section h2 {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .process-diagram {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }
        
        .process-step {
          flex: 0 0 20%;
          text-align: center;
          position: relative;
          padding: 0 10px;
        }
        
        .step-number {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--accent);
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          z-index: 1;
        }
        
        .step-icon {
          width: 70px;
          height: 70px;
          background: var(--primary-light);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: white;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .process-step:hover .step-icon {
          transform: scale(1.1);
          background: var(--primary);
        }
        
        .step-icon svg {
          width: 35px;
          height: 35px;
        }
        
        .process-step h4 {
          margin: 0 0 0.5rem;
          color: var(--primary-dark);
          font-size: 1rem;
        }
        
        .process-step p {
          margin: 0;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        
        .process-arrow {
          flex: 0 0 5%;
          height: 2px;
          background: var(--primary-light);
          position: relative;
          margin-top: -50px;
        }
        
        .process-arrow:after {
          content: '';
          position: absolute;
          right: 0;
          top: -4px;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 5px 0 5px 10px;
          border-color: transparent transparent transparent var(--primary-light);
        }
        
        /* Zonas grises */
        .grey-zones-card {
          background: linear-gradient(135deg, var(--background) 0%, #dbeafe 100%);
          padding: 2rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          margin: 4rem auto;
        }
        
        .grey-zones-content {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        
        .grey-zones-icon {
          flex: 0 0 100px;
          width: 100px;
          height: 100px;
          background: var(--accent);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .grey-zones-icon svg {
          width: 60px;
          height: 60px;
        }
        
        .grey-zones-card h2 {
          color: var(--primary-dark);
          margin-top: 0;
        }
        
        .example-text {
          background: rgba(0, 0, 0, 0.03);
          padding: 1rem;
          border-radius: var(--radius);
          border-left: 4px solid var(--accent);
        }
        
        /* Enlaces */
        .legal-links {
          margin: 4rem auto;
          padding: 2rem;
          background: var(--card-bg);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow);
          text-align: center;
        }
        
        .legal-links h3 {
          margin-bottom: 2rem;
        }
        
        .links-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .legal-link {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.25rem;
          background: var(--background);
          border-radius: var(--radius);
          transition: all 0.3s ease;
          text-decoration: none;
          color: var(--text-main);
          border: 1px solid var(--border);
        }
        
        .legal-link:hover {
          transform: translateX(5px);
          box-shadow: var(--shadow);
          border-color: var(--primary-light);
        }
        
        .legal-link:hover:after {
          display: none;
        }
        
        .link-icon {
          width: 40px;
          height: 40px;
          background: var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }
        
        .link-icon svg {
          width: 20px;
          height: 20px;
        }
        
        .link-text {
          text-align: left;
          display: flex;
          flex-direction: column;
        }
        
        .link-text span {
          font-weight: 600;
          color: var(--primary-dark);
        }
        
        .link-text small {
          color: var(--text-secondary);
          font-size: 0.85rem;
        }
        
        /* Responsive */
        @media (max-width: 900px) {
          .mode-selector {
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
          }
          
          .mode-card {
            width: 100%;
            max-width: 350px;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
            max-width: 350px;
            margin: 0 auto;
          }
          
          .process-diagram {
            flex-direction: column;
            gap: 2.5rem;
          }
          
          .process-step {
            flex: 0 0 100%;
            max-width: 250px;
            margin: 0 auto;
          }
          
          .process-arrow {
            display: none;
          }
          
          .grey-zones-content {
            flex-direction: column;
            text-align: center;
          }
          
          .grey-zones-icon {
            margin-bottom: 1.5rem;
          }
          
          .ocean-header {
            height: 180px;
          }
          
          .ocean-footer {
            height: 120px;
          }
        }
        
        @media (max-width: 600px) {
          .dashboard-description {
            max-width: 95%;
            font-size: 1rem;
          }
          
          .dashboard-hero {
            padding: 1.5rem 1rem;
          }
          
          .header-content h1 {
            font-size: 1.7rem;
          }
          
          .logo-container {
            width: 60px;
            height: 60px;
          }
          
          .legal-link {
            padding: 1rem;
          }
          
          .links-container {
            gap: 0.75rem;
          }
          
          .process-section, .grey-zones-card, .legal-links {
            padding: 1.5rem 1rem;
          }
        }