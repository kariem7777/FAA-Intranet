import { motion } from "framer-motion";
import patternImage from '@/assets/d525892a3c3b1e77bd5ac9f384bf4bd570e9d9e0.png';

export default function PatternDraw() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 2.4,
                ease: "easeOut",
                opacity: { duration: 2.0 },
                scale: { duration: 2.4 }
            }}
            className="w-full h-full"
        >
            <img
                src={patternImage}
                alt="Decorative Pattern"
                className="w-full h-full object-cover"
                style={{
                    filter: 'brightness(1.2) contrast(0.95)',
                }}
            />
        </motion.div>
    );
}