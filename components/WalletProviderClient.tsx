import React, { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

interface Props {
  children: ReactNode;
}

// Composant qui ne sera rendu que côté client
export const WalletProviderClient: FC<Props> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  // S'assurer que le composant est monté côté client avant de le rendre
  useEffect(() => {
    setMounted(true);
  }, []);

  // Ne rien rendre jusqu'à ce que le composant soit monté côté client
  if (!mounted) {
    return null;
  }

  return (
    <WalletProvider wallets={wallets}>
      <WalletModalProvider>{children}</WalletModalProvider>
    </WalletProvider>
  );
};

export default WalletProviderClient;
