import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import { fetchCategories, fetchDepartments, fetchEntities } from '../slices/legislationSlice';
import toast from 'react-hot-toast';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { RefreshCw } from 'lucide-react';

interface LegislationLookupsProviderProps {
    children: React.ReactNode;
}

type FailedFetch = 'categories' | 'entities' | 'departments';

export function LegislationLookupsProvider({ children }: LegislationLookupsProviderProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { t, isRTL } = useTranslation();
    const { categories, entities, departments } = useSelector((state: RootState) => state.legislationSlice);
    const [refreshing, setRefreshing] = useState<Set<FailedFetch>>(new Set());

    useEffect(() => {
        Promise.allSettled([
            dispatch(fetchCategories()),
            dispatch(fetchEntities()),
            dispatch(fetchDepartments())
        ]);
    }, [dispatch]);

    useEffect(() => {
        if (categories.error) {
            toast.error(t('legislation.failedToLoadCategories'), {
                id: 'categories-error',
            });
        }
    }, [categories.error, t]);

    useEffect(() => {
        if (entities.error) {
            toast.error(t('legislation.failedToLoadEntities'), {
                id: 'entities-error',
            });
        }
    }, [entities.error, t]);

    useEffect(() => {
        if (departments.error) {
            toast.error(t('legislation.failedToLoadDepartments'), {
                id: 'departments-error',
            });
        }
    }, [departments.error, t]);

    const handleRetry = async (type: FailedFetch) => {
        setRefreshing(prev => new Set(prev).add(type));

        try {
            if (type === 'categories') {
                await dispatch(fetchCategories());
            } else if (type === 'entities') {
                await dispatch(fetchEntities());
            } else if (type === 'departments') {
                await dispatch(fetchDepartments());
            }
        } finally {
            setTimeout(() => {
                setRefreshing(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(type);
                    return newSet;
                });
            }, 500);
        }
    };

    const handleRetryAll = async () => {
        const failedFetches: FailedFetch[] = [];
        if (categories.error) failedFetches.push('categories');
        if (entities.error) failedFetches.push('entities');
        if (departments.error) failedFetches.push('departments');

        setRefreshing(new Set(failedFetches));

        try {
            await Promise.allSettled([
                categories.error ? dispatch(fetchCategories()) : Promise.resolve(),
                entities.error ? dispatch(fetchEntities()) : Promise.resolve(),
                departments.error ? dispatch(fetchDepartments()) : Promise.resolve()
            ]);
        } finally {
            setTimeout(() => setRefreshing(new Set()), 500);
        }
    };

    const hasMultipleErrors = categories.error && entities.error && departments.error;

    return (
        <>
            {children}
            {/* Individual retry buttons for specific failed fetches */}
            {categories.error && !entities.error && !departments.error && (
                <button
                    onClick={() => handleRetry('categories')}
                    disabled={refreshing.has('categories') || categories.loading}
                    className={`
                        fixed bottom-8 z-50 
                        flex items-center gap-2 
                        px-4 py-3 
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
                        if (!refreshing.has('categories') && !categories.loading) {
                            e.currentTarget.style.background = 'var(--color-legislation-header-gradient)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--color-legislation-header-gradient)';
                    }}
                >
                    <RefreshCw
                        className={`h-4 w-4 ${refreshing.has('categories') ? 'animate-spin' : ''}`}
                    />
                    <span>{t('legislation.retryCategories')}</span>
                </button>
            )}

            {entities.error && !categories.error && !departments.error && (
                <button
                    onClick={() => handleRetry('entities')}
                    disabled={refreshing.has('entities') || entities.loading}
                    className={`
                        fixed bottom-8 z-50 
                        flex items-center gap-2 
                        px-4 py-3 
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
                        if (!refreshing.has('entities') && !entities.loading) {
                            e.currentTarget.style.background = 'var(--color-legislation-header-gradient)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--color-legislation-header-gradient)';
                    }}
                >
                    <RefreshCw
                        className={`h-4 w-4 ${refreshing.has('entities') ? 'animate-spin' : ''}`}
                    />
                    <span>{t('legislation.retryEntities')}</span>
                </button>
            )}

            {/* Retry All button when multiple errors exist */}
            {hasMultipleErrors && (
                <button
                    onClick={handleRetryAll}
                    disabled={refreshing.size > 0 || categories.loading || entities.loading || departments.loading}
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
                        if (refreshing.size === 0 && !categories.loading && !entities.loading && !departments.loading) {
                            e.currentTarget.style.background = 'var(--color-legislation-header-gradient)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--color-legislation-header-gradient)';
                    }}
                >
                    <RefreshCw
                        className={`h-4 w-4 ${refreshing.size > 0 ? 'animate-spin' : ''}`}
                    />
                    <span>{t('legislation.retryAll')}</span>
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
