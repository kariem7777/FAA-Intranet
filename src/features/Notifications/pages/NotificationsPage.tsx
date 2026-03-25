import { Bell, CheckCircle2, MessageSquare, UserCircle, Info, ChevronRight, Check, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { markAsRead, markAllAsRead, fetchNotifications } from '../slices/notificationsSlice';
import { useEffect, useState, useMemo } from 'react';
import { formatRelativeTime } from '@/shared/utils/dateUtils';

export default function NotificationsPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { items, unreadCount, loading } = useAppSelector(state => state.notifications);
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';

    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch]);

    const filters = [
        { id: 'all', label: t('notifications.filters.all') },
        { id: 'newOpionion', label: t('notifications.filters.opinions') },
        { id: 'replies', label: t('notifications.filters.replies') },
        { id: 'unread', label: t('notifications.filters.unread') },
    ];

    const filteredItems = useMemo(() => {
        if (activeFilter === 'all') return items;
        if (activeFilter === 'unread') return items.filter(n => !n.isRead);
        if (activeFilter === 'replies') return items.filter(n => n.type === 'AdminReply' || n.type === 'UserReply');
        return items.filter(n => n.type === activeFilter);
    }, [items, activeFilter]);

    const getIcon = (type: string) => {
        switch (type) {
            case 'NewOpionion': return <MessageSquare className="w-5 h-5 text-blue-500" />;
            case 'AdminReply': return <UserCircle className="w-5 h-5 text-indigo-500" />;
            case 'UserReply': return <MessageSquare className="w-5 h-5 text-green-500" />;
            case 'Closed': return <CheckCircle2 className="w-5 h-5 text-faa-primary" />;
            default: return <Info className="w-5 h-5 text-gray-500" />;
        }
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8 min-h-screen" dir={isArabic ? 'rtl' : 'ltr'}>
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                <button onClick={() => navigate('/')} className="hover:text-faa-primary transition-colors">
                    {t('notifications.home')}
                </button>
                <ChevronRight size={14} className={isArabic ? 'rotate-180' : ''} />
                <span className="text-gray-900">{t('notifications.title')}</span>
            </div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                        <Bell className="w-8 h-8 text-faa-primary" />
                        {t('notifications.centerTitle')}
                    </h1>
                    <p className="text-gray-500 mt-2 font-medium">
                        {t('notifications.unreadCount', { count: unreadCount })}
                    </p>
                </div>
                {unreadCount > 0 && (
                    <button
                        onClick={() => dispatch(markAllAsRead())}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-faa-primary/5 hover:bg-faa-primary/10 text-faa-primary rounded-2xl border border-faa-primary/10 transition-all font-bold text-sm"
                    >
                        <Check size={18} />
                        {t('notifications.markAllAsRead')}
                    </button>
                )}
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-gray-50 p-1.5 rounded-[1.5rem] border border-gray-100 self-start inline-flex">
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`px-5 py-2 rounded-[1.2rem] text-sm font-bold transition-all ${activeFilter === filter.id
                            ? 'bg-white text-faa-primary shadow-sm ring-1 ring-black/5'
                            : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            <div className="h-px bg-gray-100" />

            {/* List */}
            <div className="space-y-4">
                {(loading && filteredItems.length === 0) ? (
                    <div className="py-20 flex flex-col items-center gap-4">
                        <div className="w-12 h-12 rounded-full border-4 border-faa-primary/10 border-t-faa-primary animate-spin" />
                        <p className="text-gray-400 font-black uppercase tracking-widest text-sm">
                            {t('notifications.loading')}
                        </p>
                    </div>
                ) : filteredItems.length > 0 ? (
                    <div className="grid gap-4">
                        {filteredItems.map((notification) => (
                            <button
                                key={notification.id}
                                onClick={() => {
                                    dispatch(markAsRead(notification.id));
                                    if (notification.opinionId) navigate(`/opinions/${notification.opinionId}`);
                                }}
                                className={`w-full group flex flex-col sm:flex-row sm:items-center gap-4 p-6 rounded-3xl transition-all border text-start relative overflow-hidden ${notification.isRead
                                    ? 'bg-white border-gray-100 opacity-70 grayscale-[0.2] hover:opacity-100 hover:grayscale-0'
                                    : 'bg-white border-faa-primary/10 shadow-md ring-1 ring-faa-primary/5 hover:border-faa-primary/20'
                                    }`}
                            >
                                {!notification.isRead && (
                                    <div className="absolute top-0 bottom-0 start-0 w-1.5 bg-faa-primary" />
                                )}

                                <div className={`p-4 rounded-2xl shadow-sm border border-gray-100 self-start sm:self-center transition-transform group-hover:scale-110 duration-300 ${notification.isRead ? 'bg-gray-50' : 'bg-faa-primary/5'
                                    }`}>
                                    {getIcon(notification.type)}
                                </div>

                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="text-lg font-black text-gray-900 group-hover:text-faa-primary transition-colors">
                                            {t(`notifications.types.${notification.type}.title`)}
                                        </h3>
                                        <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 whitespace-nowrap">
                                            {formatRelativeTime(notification.createdAt, t)}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 font-medium leading-relaxed max-w-3xl">
                                        {t(`notifications.types.${notification.type}.description`)}
                                    </p>
                                </div>

                                {notification.opinionId && (
                                    <div className="sm:ms-4 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all p-3 rounded-full bg-faa-primary/5 text-faa-primary self-end sm:self-center hidden sm:block">
                                        <ChevronRight size={20} className={isArabic ? 'rotate-180' : ''} />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center border-2 border-dashed border-gray-100 rounded-[3rem]">
                        <div className="inline-flex p-8 rounded-full bg-gray-50 mb-6 relative">
                            {activeFilter === 'all' ? (
                                <Bell className="w-16 h-16 text-gray-200" />
                            ) : (
                                <Filter className="w-16 h-16 text-gray-200" />
                            )}
                            <div className="absolute top-6 right-6 w-4 h-4 rounded-full bg-gray-200 border-4 border-white" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mb-2">
                            {activeFilter === 'all'
                                ? t('notifications.noNotifications')
                                : t('notifications.noResults')}
                        </h2>
                        <p className="text-gray-400 font-bold max-w-sm mx-auto">
                            {activeFilter === 'all'
                                ? t('notifications.noNotificationsDesc')
                                : t('notifications.noResultsDesc')}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
