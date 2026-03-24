import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/shared/hooks/useTranslation';

interface YearPickerProps {
    value: number;
    onChange: (year: number) => void;
    className?: string;
}

export function YearPicker({ value, onChange, className = '' }: YearPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [decadeStart, setDecadeStart] = useState(() => Math.floor(value / 12) * 12);
    const { isRTL } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);
    const currentYear = new Date().getFullYear();

    const years = Array.from({ length: 12 }, (_, i) => decadeStart + i);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleOpen = () => {
        setDecadeStart(Math.floor(value / 12) * 12);
        setIsOpen(prev => !prev);
    };

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            <button
                type="button"
                onClick={handleOpen}
                className={`flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-faa-primary/20 hover:border-gray-400 transition-all text-sm font-medium text-gray-700 min-w-[130px] ${isRTL ? 'flex-row-reverse' : ''}`}
            >
                <Calendar className="w-4 h-4 text-gray-500 shrink-0" />
                <span className="flex-1 text-center">{value}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 4, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className={`absolute z-50 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl p-3 ${isRTL ? 'right-0' : 'left-0'}`}
                        style={{ width: 240 }}
                    >
                        {/* Header — decade navigation */}
                        <div className="flex items-center justify-between mb-2 px-1">
                            <button
                                type="button"
                                onClick={() => setDecadeStart(d => d - 12)}
                                className="p-1 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            <span className="text-xs font-medium text-gray-500 select-none">
                                {decadeStart} – {decadeStart + 11}
                            </span>

                            <button
                                type="button"
                                onClick={() => setDecadeStart(d => d + 12)}
                                // Disable the "next" arrow if the entire next page is in the future
                                disabled={decadeStart + 12 > currentYear}
                                className="p-1 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                        {/* 3-column year grid */}
                        <div className="grid grid-cols-3 gap-1.5">
                            {years.map(year => {
                                const isSelected = year === value;
                                const isToday = year === currentYear;
                                const isFuture = year > currentYear;

                                return (
                                    <button
                                        key={year}
                                        type="button"
                                        disabled={isFuture}
                                        onClick={() => {
                                            onChange(year);
                                            setIsOpen(false);
                                        }}
                                        className={`py-2.5 rounded-lg text-sm text-center transition-colors
                                            ${isFuture
                                                ? 'text-gray-300 cursor-not-allowed'
                                                : isSelected
                                                    ? 'bg-faa-primary text-white font-semibold'
                                                    : isToday
                                                        ? 'border border-faa-primary text-faa-primary font-semibold hover:bg-faa-primary/10'
                                                        : 'text-gray-700 hover:bg-gray-100 font-normal'
                                            }`}
                                    >
                                        {year}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}