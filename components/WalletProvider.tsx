import React, { FC, ReactNode, useMemo } from 'react';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

// Import des styles
import '@solana/wallet-adapter-react-ui/styles.css';

interface Props {
  children: ReactNode;
}

const WalletProviderWrapper: FC<Props> = ({ children }) => {
  // Initialiser les wallets une seule fois avec useMemo
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <WalletProvider wallets={wallets}>
      <WalletModalProvider>{children}</WalletModalProvider>
    </WalletProvider>
  );
};

export default WalletProviderWrapper;
