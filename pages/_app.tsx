import React from 'react';
import '@/styles/globals.css';
import '@/styles/output.css';
import '@/styles/mfai-theme.css';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
});

// Créer un composant qui ne sera rendu que côté client
class ClientOnlyApp extends React.Component<AppProps & { ready: boolean }> {
  render() {
    const { Component, pageProps, ready } = this.props;
    
    // Ne rien afficher tant que React n'est pas prêt
    if (!ready) {
      return <div className="min-h-screen bg-gray-950"></div>;
    }
    
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <main className={`${inter.className} min-h-screen bg-gray-950 text-white antialiased`}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    );
  }
}

// Wrapper qui s'assure que l'application n'est rendue que côté client
class SafeHydrationApp extends React.Component<AppProps> {
  state = {
    mounted: false,
    ready: false
  };
  
  componentDidMount() {
    // Marquer que nous sommes montés côté client
    this.setState({ mounted: true });
    
    // Vérifier si React est correctement initialisé
    if (typeof window !== 'undefined' && window.React) {
      this.setState({ ready: true });
    } else {
      // Si React n'est pas initialisé, attendre un peu et réessayer
      setTimeout(() => {
        this.setState({ ready: true });
      }, 100);
    }
  }
  
  render() {
    // Ne rien afficher pendant le rendu côté serveur
    if (!this.state.mounted) {
      return <div className="min-h-screen bg-gray-950"></div>;
    }
    
    // Importer WalletProvider de manière dynamique
    const WalletProvider = dynamic(() => import('@/components/WalletProvider'), {
      ssr: false,
    });
    
    return (
      <>
        {/* Script pour s'assurer que React est correctement initialisé */}
        <Script
          id="react-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && !window.React) {
                window.React = window.React || {};
                window.React.useState = function() { return [undefined, function() {}]; };
                window.React.useEffect = function() {};
                window.React.useContext = function() { return null; };
                window.React.createContext = function() { return { Provider: function() {}, Consumer: function() {} }; };
              }
            `,
          }}
        />
        <WalletProvider>
          <ClientOnlyApp {...this.props} ready={this.state.ready} />
        </WalletProvider>
      </>
    );
  }
}

// Exporter l'application avec SSR désactivé
export default dynamic(() => Promise.resolve(SafeHydrationApp), {
  ssr: false,
});
