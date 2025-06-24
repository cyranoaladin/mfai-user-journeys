import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface InspirationalQuoteProps {
  quote: string;
  author: string;
}

export default function InspirationalQuote({ quote, author }: InspirationalQuoteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative p-6 rounded-xl bg-black/50 border border-[#14F195]/20 backdrop-blur-sm"
    >
      <div className="absolute top-4 left-4 text-[#14F195]/20">
        <Quote className="w-8 h-8" />
      </div>
      <div className="pl-12">
        <p className="text-lg text-gray-300 italic mb-4">&ldquo;{quote}&rdquo;</p>
        <p className="text-sm text-[#14F195]">— {author}</p>
      </div>
    </motion.div>
  );
}
