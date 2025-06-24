import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/utils/store';

export default function WalletStateCTA() {
  const { walletConnected, connectWallet } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative p-6 rounded-xl bg-black/50 border border-[#14F195]/20 backdrop-blur-sm"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#9945FF]/10 to-[#14F195]/10 rounded-xl blur-xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-2 rounded-lg bg-[#14F195]/10 text-[#14F195]">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              {walletConnected ? 'Wallet Connected' : 'Connect Your Wallet'}
            </h3>
            <p className="text-gray-400 text-sm">
              {walletConnected
                ? 'You can now access all features and earn rewards'
                : 'Connect your wallet to start your journey and earn rewards'}
            </p>
          </div>
        </div>

        {!walletConnected && (
          <Button
            onClick={() => connectWallet('', 'ethereum')}
            className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] text-black font-semibold hover:shadow-lg hover:shadow-[#14F195]/20 transition-all duration-300"
          >
            Connect Wallet
          </Button>
        )}
      </div>
    </motion.div>
  );
}
