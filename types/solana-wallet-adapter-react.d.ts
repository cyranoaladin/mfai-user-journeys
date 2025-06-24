declare module '@solana/wallet-adapter-react' {
  import { PublicKey } from '@solana/web3.js';
  import { FC, ReactNode } from 'react';

  export interface WalletContextState {
    publicKey: PublicKey | null;
    connecting: boolean;
    connected: boolean;
    disconnecting: boolean;
    select: (walletName: string) => void;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
  }

  export const useWallet: () => WalletContextState;

  export interface WalletProviderProps {
    children: ReactNode;
    wallets?: any[];
  }

  export const WalletProvider: FC<WalletProviderProps>;
}
