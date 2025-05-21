// Cada fase de la simulación (detectar, notificar, etc.)
import React from "react";
import { FaseSimulacroProps } from "../../types/simulacro";

const DESCRIPCIONES: Record<string, string> = {
  deteccion:
    "¿Detectas el derrame a tiempo, o tardas por confusión o presión ambiental?",
  activacion:
    "¿Activas los planes y notificas inmediatamente a las autoridades pertinentes, o primero tratas de controlar la situación?",
  contencion:
    "¿Inicias las acciones de contención y respuesta según el plan, o esperas refuerzos/instrucciones adicionales?",
  recuperacion:
    "¿Coordinas las labores de recuperación y limpieza de manera efectiva con todas las partes implicadas?",
  conclusion:
    "¿Documentas y comunicas las lecciones aprendidas y cierras formalmente el incidente?",
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
  activacion: [
    {
      texto: "Activo planes y notifico de inmediato a todos los implicados",
      feedback:
        "Correcto: la activación temprana de planes y la notificación son cruciales (RD 1695/2012).",
    },
    {
      texto: "Intento controlar primero y demoro la activación/notificación",
      feedback:
        "¡Ojo! Demorar la activación de planes y la notificación puede conllevar sanciones y empeorar la crisis.",
    },
  ],
  contencion: [
    {
      texto: "Inicio acciones de contención con recursos disponibles",
      feedback:
        "¡Perfecto! Una respuesta rápida y decidida en la contención es vital.",
    },
    {
      texto: "Espero instrucciones o refuerzos externos antes de actuar",
      feedback:
        "Puede ser prudente en ciertos casos, pero perder tiempo en la contención puede aumentar el alcance del derrame.",
    },
  ],
  recuperacion: [
    {
      texto: "Coordino activamente la recuperación y limpieza",
      feedback:
        "¡La coordinación efectiva en la recuperación marca la diferencia para restaurar la normalidad!",
    },
    {
      texto: "Dejo que otros lideren o trabajo de forma aislada",
      feedback:
        "La falta de coordinación en la recuperación puede generar ineficiencias y retrasar la limpieza.",
    },
  ],
  conclusion: [
    {
      texto: "Documento todo y comunico el cierre y lecciones aprendidas",
      feedback:
        "La documentación exhaustiva y la comunicación transparente son clave para la mejora continua.",
    },
    {
      texto:
        "Cierro el incidente sin una revisión formal o comunicación amplia",
      feedback:
        "Omitir la fase de conclusión formal impide aprender de la experiencia y mejorar protocolos.",
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
