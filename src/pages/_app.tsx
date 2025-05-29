// Configuración de contexto, PWA, etc.
import "../styles/globals.css";
import "../styles/paramModal.css";
import type { AppProps } from "next/app";
import { SimulacroProvider } from "../context/SimulacroContext";
// src/pages/_app.tsx
import "leaflet/dist/leaflet.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SimulacroProvider>
      <Component {...pageProps} />
    </SimulacroProvider>
  );
}

export default MyApp;
