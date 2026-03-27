import { MessageSquare, Info, CheckCircle2, UserCircle, Bell, X, RotateCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { markAsRead, markAllAsRead, fetchNotifications } from '../slices/notificationsSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { formatRelativeTime } from '@/shared/utils/dateUtils';

interface NotificationsDropdownProps {
    isOpen: boolean;
    onClose: () => void;
}

export function NotificationsDropdown({ isOpen, onClose }: NotificationsDropdownProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { items, unreadCount, loading } = useAppSelector(state => state.notifications);
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleRefresh = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(fetchNotifications());
    };

    const handleNotificationClick = (id: string, opinionId?: string) => {
        dispatch(markAsRead(id));
        if (opinionId) {
            navigate(`/opinions/${opinionId}`);
        }
        onClose();
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'NewOpinion': return <MessageSquare className="w-4 h-4 text-blue-500" />;
            case 'AdminReply': return <UserCircle className="w-4 h-4 text-indigo-500" />;
            case 'UserReply': return <MessageSquare className="w-4 h-4 text-green-500" />;
            case 'Closed': return <CheckCircle2 className="w-4 h-4 text-faa-primary" />;
            default: return <Info className="w-4 h-4 text-gray-500" />;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className={`absolute top-full mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden ${isArabic ? 'left-0 origin-top-left' : 'right-0 origin-top-right'
                        }`}
                    dir={isArabic ? 'rtl' : 'ltr'}
                >
                    {/* Header */}
                    <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-gray-900">
                                {t('notifications.title')}
                            </h3>
                            {unreadCount > 0 && (
                                <span className="px-2 py-0.5 rounded-full bg-faa-primary/10 text-faa-primary text-[10px] font-bold">
                                    {unreadCount} {t('notifications.new')}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            {unreadCount > 0 && (
                                <button
                                    onClick={() => dispatch(markAllAsRead())}
                                    className="text-[10px] font-bold text-faa-primary hover:text-faa-primary/80 transition-colors uppercase tracking-wider"
                                >
                                    {t('notifications.markAllAsRead')}
                                </button>
                            )}
                            <div className="flex items-center gap-1.5 border-s border-gray-200 ps-3">
                                <button
                                    onClick={handleRefresh}
                                    disabled={loading}
                                    className={`p-1 hover:bg-gray-200 rounded-md transition-all text-gray-400 ${loading ? 'animate-spin opacity-50' : 'hover:rotate-180 duration-500'}`}
                                    title={t('notifications.refresh')}
                                >
                                    <RotateCw size={14} />
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-1 hover:bg-gray-200 rounded-md transition-colors text-gray-400"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
                        {loading && items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 gap-3">
                                <div className="w-8 h-8 rounded-full border-2 border-faa-primary/20 border-t-faa-primary animate-spin" />
                                <p className="text-xs text-gray-400 font-medium">
                                    {t('notifications.loading')}
                                </p>
                            </div>
                        ) : items.length > 0 ? (
                            <div className="divide-y divide-gray-50">
                                {items.map((notification) => (
                                    <button
                                        key={notification.id}
                                        onClick={() => handleNotificationClick(notification.id, notification.opinionId)}
                                        className={`w-full flex gap-3.5 p-4 transition-all text-start border-s-4 ${notification.isRead
                                            ? 'bg-white border-s-transparent opacity-80 grayscale-[0.3] hover:opacity-100 hover:grayscale-0'
                                            : 'bg-faa-primary/5 border-s-faa-primary hover:bg-faa-primary/10'
                                            }`}
                                    >
                                        <div className={`p-2 rounded-xl bg-white shadow-sm border border-gray-100 self-start`}>
                                            {getIcon(notification.type)}
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between gap-2">
                                                <h4 className="text-sm font-bold text-gray-900 leading-tight">
                                                    {t(`notifications.types.${notification.type}.title`)}
                                                </h4>
                                                <span className="text-[10px] font-medium text-gray-400 whitespace-nowrap">
                                                    {formatRelativeTime(notification.createdAt, t)}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-2">
                                                {t(`notifications.types.${notification.type}.description`)}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 text-center px-8">
                                <div className="p-4 rounded-full bg-gray-50 mb-4 border border-gray-100">
                                    <Bell className="w-8 h-8 text-gray-200" />
                                </div>
                                <h4 className="text-sm font-bold text-gray-900 mb-1">
                                    {t('notifications.noNotifications')}
                                </h4>
                                <p className="text-xs text-gray-400 font-medium max-w-[200px]">
                                    {t('notifications.noNotificationsDesc')}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="p-3 border-t border-gray-50 bg-gray-50/30 flex justify-center">
                            <button
                                onClick={() => {
                                    navigate('/notifications');
                                    onClose();
                                }}
                                className="text-[10px] font-bold text-gray-400 hover:text-faa-primary transition-colors uppercase tracking-widest"
                            >
                                {t('notifications.viewAll')}
                            </button>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
