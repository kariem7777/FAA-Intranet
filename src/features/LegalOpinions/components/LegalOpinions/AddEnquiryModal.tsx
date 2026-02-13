import { useState } from 'react';
import { Plus, X, CheckCircle2, Building2, Loader2, AlertCircle } from 'lucide-react';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

interface AddEnquiryModalProps {
    isOpen: boolean;
    departmentName: string;
    isLoading?: boolean;
    error?: string | null;
    onClose: () => void;
    onSubmit: (title: string, description: string) => void;
}

export function AddEnquiryModal({ isOpen, departmentName, isLoading = false, error, onClose, onSubmit }: AddEnquiryModalProps) {
    const { t, isRTL, language } = useTranslation();
    const isArabic = language === 'ar';

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!title || !description || isLoading) return;
        onSubmit(title, description);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()} dir={isRTL ? 'rtl' : 'ltr'}>
                {/* Header */}
                <div
                    className="px-8 py-6 border-b-2 border-gray-200 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--color-faa-primary) 3%, white)' }}
                >
                    <h3 className="text-slate-900 text-2xl font-semibold flex items-center gap-3">
                        <Plus className="h-6 w-6 text-legislation-active-indicator" />
                        {t('legalOpinions.addNewEnquiry')}
                    </h3>
                    <button onClick={onClose} className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-gray-100 transition-colors">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div className="mx-8 mt-6 flex items-start gap-3 rounded-lg border-2 border-red-200 bg-red-50 p-4">
                        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="flex-1 text-red-800 text-sm font-medium">{error}</p>
                    </div>
                )}

                {/* Body */}
                <div className="px-8 py-6 space-y-6">
                    <div>
                        <label className="block text-base text-slate-700 mb-2 font-semibold">{t('legalOpinions.enquiryTitle')} *</label>
                        <Input
                            type="text"
                            placeholder={t('legalOpinions.enterTitle')}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={isLoading}
                            className={`h-12 text-base border-2 border-gray-300 ${isArabic ? 'text-right' : ''}`}
                        />
                    </div>
                    <div>
                        <label className="block text-base text-slate-700 mb-2 font-semibold">{t('legalOpinions.enquiryDetails')} *</label>
                        <textarea
                            placeholder={t('legalOpinions.enterEnquiry')}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={isLoading}
                            rows={6}
                            className={`w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none resize-none disabled:opacity-50 ${isArabic ? 'text-right' : ''}`}
                        />
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200 flex items-start gap-3">
                        <Building2 className="h-5 w-5 text-blue-600 mt-0.5" />
                        <p className="text-blue-800 text-sm font-medium">
                            {t('legalOpinions.departmentLabel')}: {departmentName}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 border-t-2 border-gray-200 flex gap-3">
                    <Button variant="outline" onClick={onClose} disabled={isLoading} className="flex-1 h-11 border-2 border-gray-300 hover:bg-gray-100">
                        {t('legalOpinions.cancel')}
                    </Button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || !title || !description}
                        className="flex-1 h-11 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-base font-medium bg-legislation-active-indicator text-slate-800 hover:bg-dashboard-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <CheckCircle2 className={`h-4 w-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                        )}
                        {isLoading ? t('common.loading') : t('legalOpinions.submit')}
                    </button>
                </div>
            </div>
        </div>
    );
}
