import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import { fetchCategories } from '../slices/legislationSlice';
import toast from 'react-hot-toast';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { RefreshCw } from 'lucide-react';

interface LegislationLookupsProviderProps {
    children: React.ReactNode;
}

export function LegislationLookupsProvider({ children }: LegislationLookupsProviderProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { t, isRTL } = useTranslation();
    const { categories } = useSelector((state: RootState) => state.legislationSlice);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    // Error handling
    useEffect(() => {
        if (categories.error) {
            toast.error(t('legislation.failedToLoadCategories'), {
                id: 'categories-error', // Prevent duplicate toasts
            });
        }
    }, [categories.error, t]);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await dispatch(fetchCategories());
        setTimeout(() => setIsRefreshing(false), 500);
    };

    return (
        <>
            {children}
            {categories.error && (
                <button
                    onClick={handleRefresh}
                    disabled={isRefreshing || categories.loading}
                    className={`
                        fixed bottom-8 z-50 
                        flex items-center gap-2 
                        px-5 py-3 
                        text-white font-medium text-sm
                        rounded-full shadow-lg hover:shadow-xl
                        transition-all duration-300 ease-in-out
                        transform hover:scale-105
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                        ${isRTL ? 'left-8' : 'right-8'}
                    `}
                    style={{
                        background: 'var(--color-legislation-header-gradient)',
                        animation: 'fadeInUp 0.5s ease-out',
                    }}
                    onMouseEnter={(e) => {
                        if (!isRefreshing && !categories.loading) {
                            e.currentTarget.style.background = 'var(--color-legislation-header-gradient)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--color-legislation-header-gradient)';
                    }}
                >
                    <RefreshCw
                        className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
                    />
                    <span>{t('common.retry')}</span>
                </button>
            )}
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </>
    );
}
