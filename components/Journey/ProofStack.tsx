import { FC } from 'react';
import { motion } from 'framer-motion';

interface ProofStackProps {
  proofs: string[];
}

/**
 * ProofStack - displays a mini on-chain explorer style list of minted proofs
 */
const ProofStack: FC<ProofStackProps> = ({ proofs }) => {
  return (
    <div className="proof-stack bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 mt-8">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span>🧾</span> Proof Stack
      </h3>
      <ul className="space-y-2 text-sm">
        {proofs.map((proof, idx) => (
          <li key={idx} className="flex items-center justify-between bg-gray-900 p-3 rounded-md">
            <span>{proof}</span>
            <span className="text-green-400 flex items-center gap-1">
              <span className="hidden sm:inline">Mint simulated</span> ✅
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProofStack;
