// src/pages/_app.tsx
import "../styles/globals.css";
import "../styles/paramModal.css";
import type { AppProps } from "next/app";
import { SimulacroProvider } from "../context/SimulacroContext";
import "leaflet/dist/leaflet.css";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SimulacroProvider>
      <Head>
        <title>ER-Simulator</title>
        <meta
          name="description"
          content="Simulador de emergencias marítimas del litoral andaluz"
        />
      </Head>
      <Component {...pageProps} />
    </SimulacroProvider>
  );
}

export default MyApp;
