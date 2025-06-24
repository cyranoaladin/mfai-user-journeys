import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Précharger les scripts React pour éviter les problèmes d'initialisation */}
        <link rel="preload" href="/_next/static/chunks/framework-f75312fc4004b783.js" as="script" />
      </Head>
      <body>
        {/* Charger notre patch React avant tout autre code */}
        <Script
          id="react-patch"
          src="/react-patch.js"
          strategy="beforeInteractive"
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
