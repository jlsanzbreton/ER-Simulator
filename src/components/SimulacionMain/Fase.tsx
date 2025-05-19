// Cada fase de la simulación (detectar, notificar, etc.)
import React from "react";
import { FaseSimulacroProps } from "../../types/simulacro";

const DESCRIPCIONES: Record<string, string> = {
  deteccion:
    "¿Detectas el derrame a tiempo, o tardas por confusión o presión ambiental?",
  deteccion:
    "¿Notificas inmediatamente a las autoridades, o primero tratas de controlar la situación?",
  gestion: "¿Activarás el plan de emergencia/contención, o esperas refuerzos?",
  coordinacion: "¿Coordinarás activamente con otros roles implicados?",
  comunicacion:
    "¿Comunicas rápido a tu organización/fletador/armador/terminal/medios?",
};

const OPCIONES: Record<string, { texto: string; feedback: string }[]> = {
  deteccion: [
    {
      texto: "Detecto y evalúo el incidente rápidamente",
      feedback:
        "¡Bien! Detectar rápido permite minimizar daños y activar el protocolo a tiempo.",
    },
    {
      texto: "Tardo en detectar por distracción o mala visibilidad",
      feedback:
        "Cuidado, el retraso puede aumentar el daño ambiental y complicar la respuesta.",
    },
  ],
  deteccion: [
    {
      texto: "Notifico de inmediato a todos los implicados",
      feedback:
        "Correcto: la normativa exige notificación temprana (RD 1695/2012).",
    },
    {
      texto: "Intento controlar primero y demoro el aviso",
      feedback:
        "¡Ojo! Demorar la notificación puede conllevar sanciones y empeorar la crisis.",
    },
  ],
  gestion: [
    {
      texto: "Activo todos los recursos y planes internos",
      feedback:
        "¡Perfecto! La coordinación y previsión salvan tiempo y reputación.",
    },
    {
      texto: "Espero instrucciones o refuerzos externos",
      feedback:
        "Puede ser prudente, pero perder tiempo puede aumentar el alcance del derrame.",
    },
  ],
  coordinacion: [
    {
      texto: "Coordino activamente con otros implicados",
      feedback: "¡Eso marca la diferencia en emergencias reales!",
    },
    {
      texto: "Trabajo de forma aislada, sin avisar a otros",
      feedback: "El aislamiento genera duplicidades y puede aumentar el caos.",
    },
  ],
  comunicacion: [
    {
      texto: "Comunico rápido a todos los stakeholders",
      feedback: "La comunicación ágil reduce rumorología y pánico.",
    },
    {
      texto: "Espero a que la situación mejore para informar",
      feedback: "La opacidad puede ser castigada y genera desconfianza.",
    },
  ],
};

const Fase: React.FC<FaseSimulacroProps> = ({
  fase,
  onDecision,
  isBlocked,
}) => (
  <div className={`card${isBlocked ? " opacity-disabled" : ""}`}>
    <h2>Fase: {fase.charAt(0).toUpperCase() + fase.slice(1)}</h2>
    <p>{DESCRIPCIONES[fase]}</p>
    <div className="mt-2">
      {OPCIONES[fase].map((op, idx) => (
        <button
          key={idx}
          onClick={() => !isBlocked && onDecision(fase, op.texto, op.feedback)}
          className="btn-mr btn-mb"
          disabled={isBlocked}
        >
          {op.texto}
        </button>
      ))}
    </div>
  </div>
);

export default Fase;
