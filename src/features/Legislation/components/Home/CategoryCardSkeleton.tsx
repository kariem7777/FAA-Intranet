import { motion } from 'framer-motion';

export function CategoryCardSkeleton() {
    return (
        <motion.div
            className="relative bg-white rounded-[18px] shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.04)] overflow-hidden h-[242.375px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200 animate-pulse" />
            <div className="px-6 py-6 flex flex-col items-center justify-start h-full">
                <div className="flex items-center justify-center mb-5 h-20">
                    <div className="w-18 h-18 bg-gray-200 rounded-lg animate-pulse" />
                </div>
                <div className="w-3/4 h-7 bg-gray-200 rounded-md mb-3 animate-pulse" />
                <div className="w-full space-y-2">
                    <div className="w-full h-4 bg-gray-200 rounded-md animate-pulse" />
                    <div className="w-5/6 h-4 bg-gray-200 rounded-md animate-pulse mx-auto" />
                </div>
            </div>
        </motion.div>
    );
}
