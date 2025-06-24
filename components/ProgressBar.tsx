import { motion } from 'framer-motion';

interface ProgressBarProps {
    progress: number;
    label?: string;
    color?: string;
    height?: number;
    showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    label,
    color = 'from-purple-500 to-blue-500',
    height = 8,
    showPercentage = true,
}) => {
    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    return (
        <div className="w-full">
            {label && (
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">{label}</span>
                    {showPercentage && (
                        <span className="text-sm text-gray-300">{clampedProgress}%</span>
                    )}
                </div>
            )}
            <div
                className="w-full bg-gray-700 rounded-full overflow-hidden"
                style={{ height: `${height}px` }}
            >
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${clampedProgress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className={`h-full bg-gradient-to-r ${color} rounded-full`}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="h-full w-full bg-white/20"
                        style={{
                            backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)',
                            backgroundSize: '20px 20px',
                            animation: 'progress-bar-stripes 1s linear infinite',
                        }}
                    />
                </motion.div>
            </div>
        </div>
    );
};

// Ajout des styles d'animation
const style = document.createElement('style');
style.textContent = `
  @keyframes progress-bar-stripes {
    from { background-position: 20px 0; }
    to { background-position: 0 0; }
  }
`;
document.head.appendChild(style); 