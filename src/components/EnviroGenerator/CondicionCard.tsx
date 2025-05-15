// Card/resumen de condiciones ambientales
import React from "react";
import { SimulacroCondicionesAmbientales } from "../../types/simulacro";

interface CondicionCardProps {
  condiciones: SimulacroCondicionesAmbientales;
}

const mapMarea = {
  ALTA: "Marea alta",
  BAJA: "Marea baja",
  PLEAMAR: "Pleamar",
  BAJAMAR: "Bajamar",
};

const mapPrecipitacion = {
  NINGUNA: "Sin precipitación",
  LLUVIA_LIGERA: "Lluvia ligera",
  LLUVIA_INTENSA: "Lluvia intensa",
  TORMENTA: "Tormenta",
  CALIMA: "Calima",
};

const CondicionCard: React.FC<CondicionCardProps> = ({ condiciones }) => (
  <div className="card card-wide">
    <h2>Resumen Ambiental</h2>
    <ul className="list-unstyled">
      <li>
        <b>Hora:</b> {condiciones.hora}
      </li>
      <li>
        <b>Marea:</b> {mapMarea[condiciones.marea]}
      </li>
      <li>
        <b>Viento:</b> {condiciones.viento.fuerza} nudos (
        {condiciones.viento.direccion})
      </li>
      <li>
        <b>Precipitación:</b> {mapPrecipitacion[condiciones.precipitacion]}
      </li>
      <li>
        <b>Temperatura:</b> {condiciones.temperatura} ºC
      </li>
    </ul>
    <p className="role-desc">{condiciones.resumen}</p>
  </div>
);

export default CondicionCard;
