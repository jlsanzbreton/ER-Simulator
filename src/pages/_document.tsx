// src/pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          href="/favicon/apple-touch-icon-precomposed.png"
        />
        <meta name="apple-mobile-web-app-title" content="ER-Simulator" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" /> {/* Changed from /favicon/site.webmanifest */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
