export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

export function formatRelativeTime(dateString: string, t: any): string {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) return t('notifications.relativeTime.justNow');
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return t('notifications.relativeTime.minutes', { count: diffInMinutes });
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return t('notifications.relativeTime.hours', { count: diffInHours });
    
    const diffInDays = Math.floor(diffInHours / 24);
    return t('notifications.relativeTime.days', { count: diffInDays });
}