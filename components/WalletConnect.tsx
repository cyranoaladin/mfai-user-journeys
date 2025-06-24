import { motion } from 'framer-motion';
import { ChevronDown, Wallet, Link, Coins, Ghost, CircleDollarSign } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../utils/store';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

const walletOptions = [
  { id: 'metamask', name: 'MetaMask', icon: CircleDollarSign },
  { id: 'walletconnect', name: 'WalletConnect', icon: Link },
  { id: 'coinbase', name: 'Coinbase Wallet', icon: Coins },
  { id: 'phantom', name: 'Phantom', icon: Ghost },
];

export default function WalletConnect() {
  const [isOpen, setIsOpen] = useState(false);
  const { walletConnected, walletAddress, connectWallet, disconnectWallet } = useStore();
  const { toast } = useToast();

  const handleConnect = (walletId: string, walletName: string) => {
    // Simulate wallet connection
    const mockAddress =
      '0x' +
      Array(40)
        .fill(0)
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join('');

    // Convert wallet ID to the expected type
    const walletType = walletId.includes('phantom') ? 'solana' : 'ethereum';

    connectWallet(mockAddress, walletType);
    toast(`Connected to ${walletName}`, 'success');
    setIsOpen(false);
  };

  const handleDisconnect = () => {
    disconnectWallet();
    toast('Wallet disconnected', 'info');
  };

  const truncateAddress = (address: string | null) => {
    if (!address) return '0x0000...0000';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="relative">
      {!walletConnected ? (
        <div>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            <Wallet className="h-4 w-4" />
            <span>Connect Wallet</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </Button>

          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 border border-gray-700 z-50"
            >
              <div className="py-1 divide-y divide-gray-700">
                {walletOptions.map(wallet => (
                  <button
                    key={wallet.id}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition-colors"
                    onClick={() => handleConnect(wallet.id, wallet.name)}
                  >
                    <wallet.icon className="h-5 w-5 mr-2" />
                    {wallet.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="bg-gray-800 rounded-full px-3 py-1 text-sm border border-gray-700 flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
            <span className="text-gray-300">{truncateAddress(walletAddress)}</span>
          </div>
          <Button variant="outline" onClick={handleDisconnect} className="text-xs py-1 px-2 h-auto">
            Disconnect
          </Button>
        </div>
      )}
    </div>
  );
}
