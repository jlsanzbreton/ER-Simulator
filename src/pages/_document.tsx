// src/pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        {/* Use relative paths for assets when basePath is active */}
        <link rel="manifest" href="manifest.json" />
        <link
          rel="apple-touch-icon"
          href="favicon/apple-touch-icon.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          href="favicon/apple-touch-icon-precomposed.png"
        />
        <link rel="icon" href="favicon.ico" />
        {/* 
          Ensure manifest.json is in public/manifest.json
          Ensure apple-touch-icon.png is in public/favicon/apple-touch-icon.png
          Ensure apple-touch-icon-precomposed.png is in public/favicon/apple-touch-icon-precomposed.png
          Ensure favicon.ico is in public/favicon.ico (root of public)
        */}
        <meta name="theme-color" content="#000000" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
