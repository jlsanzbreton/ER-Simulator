# ER-Simulator 🛟

Simulación interactiva de derrames de hidrocarburos en el litoral andaluz. Esta aplicación permite generar condiciones meteorológicas realistas, simular escenarios con diferentes roles de respuesta y tomar decisiones en tiempo real como parte de ejercicios formativos o de entrenamiento.

---

## 🚀 Stack Tecnológico

Este proyecto utiliza un conjunto de tecnologías estables que han sido seleccionadas para garantizar máxima compatibilidad y facilidad de desarrollo:

- **React 18.2.0**: versión LTS probada y confiable para la mayoría de librerías.
- **Next.js 13.5.6**: versión previa a los breaking changes de Next 14+.
- **Leaflet 1.9.4** + **React-Leaflet 4.2.1**: visualización de mapas, compatible con React 18.
- **Tailwind CSS 4.1.8**: estilos rápidos y responsivos.
- **Turf.js 7.2.0**: cálculo geoespacial para análisis de derrames.
- **D3-Geo 3.1.0**: soporte para proyecciones y geometrías geográficas.
- **TypeScript 5.8.3**: tipado fuerte en todo el proyecto.
- **TopoJSON Client 3.1.0**: requerido por módulos Turf para procesar geometrías topológicas.

---

## 🔧 Scripts disponibles

- `npm run dev`: Ejecuta el servidor de desarrollo en `http://localhost:3000`.
- `npm run build`: Compila el proyecto para producción.
- `npm run start`: Lanza el servidor en modo producción.
- `npm run lint`: Ejecuta ESLint para revisar calidad de código.

---

## 🧪 Entorno Local y Consideraciones

> ⚠️ Importante: Este entorno está optimizado para React 18 y Next 13.5.6. No se recomienda actualizar aún a Next 15 debido a múltiples conflictos con React 19 y Leaflet.

Se ha restablecido `eslint` a la versión `8.x` para evitar conflictos con `eslint-config-next` y garantizar compatibilidad. Además, se ha instalado `topojson-client` como dependencia requerida por `@turf/concave`.  
También se ha añadido `topojson-client` como dependencia explícita requerida por algunos módulos Turf.

Se han limpiado conflictos de dependencias reconfigurando ESLint a su versión compatible (v8.x) y eliminando rastros residuales de instalaciones fallidas. El paquete `topojson-client` ha sido instalado correctamente tras restablecer el entorno, y ya puede usarse en el motor de simulación.

Se han eliminado paquetes no utilizados como `@turf/isobands` y `marchingsquares`, y se restauraron archivos corruptos tras fallos en caché. Este `README.md` y el `package.json` actúan como **snapshot técnico** para volver a este estado si algo se rompe en el futuro.

---

## 🗂️ Restauración del entorno

Si clonas este repositorio y quieres dejarlo operativo:

Asegúrate de tener `Node.js` actualizado y luego ejecuta:

```bash
npm install
npm run dev
```

Eso basta. Todos los paquetes están fijados a versiones estables.

---

## 🧭 Créditos y mantenimiento

Este proyecto es mantenido por Jose Sanz Bretón.  
Para más información o colaboración, contáctame o abre un issue en GitHub.

---
