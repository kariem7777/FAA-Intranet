import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { Dialog } from '@/shared/components/Dialog/Dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateDocument } from '../../slices/documentsManagementSlice';
import { type DocumentDto } from '../../services/DocumentsService';

interface EditDocumentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    document: DocumentDto;
}

export function EditDocumentDialog({ isOpen, onClose, document }: EditDocumentDialogProps) {
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.documentsManagement);



    const isArabic = i18n.language === 'ar';
    const fontFamily = isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif';

    const [title, setTitle] = useState(document.title);
    const [entity, setEntity] = useState(document.entity);
    const [legislation, setLegislation] = useState(document.legislation);
    const [category, setCategory] = useState(document.category);
    const [classification, setClassification] = useState(document.classification);

    useEffect(() => {
        if (document) {
            setTitle(document.title);
            setEntity(document.entity);
            setLegislation(document.legislation);
            setCategory(document.category);
            setClassification(document.classification);
        }
    }, [document]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !entity || !legislation || !category) return;

        const resultAction = await dispatch(updateDocument({
            ...document,
            title,
            entity,
            legislation,
            category,
            classification,
        }));

        if (updateDocument.fulfilled.match(resultAction)) {
            toast.success(t('legislation.documentsManagement.toasts.updateSuccess'));
            onClose();
        } else {
            toast.error(t('legislation.documentsManagement.toasts.updateError'));
        }
    };

    if (!isOpen) return null;

    return (
        <Dialog
            onClose={onClose}
            title={t('legislation.documentsManagement.dialogs.edit.title')}
            size="medium"
            className={isArabic ? 'rtl' : 'ltr'}
        >
            <div dir={isArabic ? 'rtl' : 'ltr'} style={{ fontFamily }}>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            {t('legislation.documentsManagement.form.titleLabel')}
                        </label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={t('legislation.documentsManagement.form.titlePlaceholder')}
                            required
                            style={{ fontFamily }}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Entity */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                {t('legislation.documentsManagement.form.entityLabel')}
                            </label>
                            <select
                                value={entity}
                                onChange={(e) => setEntity(e.target.value)}
                                className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A24D]"
                                required
                                style={{ fontFamily }}
                            >
                                <option value="">{t('legislation.documentsManagement.form.entityPlaceholder')}</option>
                                <option value="Federal Government">{t('options.entities.federalGovernment')}</option>
                                <option value="Cabinet">{t('options.entities.cabinet')}</option>
                                <option value="Abu Dhabi Government">{t('options.entities.abuDhabiGovernment')}</option>
                            </select>
                        </div>

                        {/* Legislation */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                {t('legislation.documentsManagement.form.legislationLabel')}
                            </label>
                            <select
                                value={legislation}
                                onChange={(e) => setLegislation(e.target.value)}
                                className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A24D]"
                                required
                                style={{ fontFamily }}
                            >
                                <option value="">{t('legislation.documentsManagement.form.legislationPlaceholder')}</option>
                                <option value="federalLegislation">{t('options.legislationTypes.federalLegislation')}</option>
                                <option value="localLegislation">{t('options.legislationTypes.localLegislation')}</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Category */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                {t('legislation.documentsManagement.form.categoryLabel')}
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A24D]"
                                required
                                style={{ fontFamily }}
                            >
                                <option value="">{t('legislation.documentsManagement.form.categoryPlaceholder')}</option>
                                <option value="laws">{t('options.docCategories.laws')}</option>
                                <option value="resolutions">{t('options.docCategories.resolutions')}</option>
                            </select>
                        </div>

                        {/* Classification */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                {t('legislation.documentsManagement.form.classificationLabel')}
                            </label>
                            <select
                                value={classification}
                                onChange={(e) => setClassification(e.target.value as 'public' | 'secret')}
                                className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A24D]"
                                style={{ fontFamily }}
                            >
                                <option value="public">{t('legislation.documentsManagement.public')}</option>
                                <option value="secret">{t('legislation.documentsManagement.secret')}</option>
                            </select>
                        </div>
                    </div>

                    {error.update && (
                        <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md">
                            {error.update}
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            style={{ fontFamily }}
                        >
                            {t('legislation.documentsManagement.dialogs.edit.cancel')}
                        </Button>
                        <Button
                            type="submit"
                            className="bg-[#2F4F6F] hover:bg-[#1e3a53] text-white"
                            disabled={loading.update}
                            style={{ fontFamily }}
                        >
                            {loading.update ? t('common.loading') : t('legislation.documentsManagement.dialogs.edit.submit')}
                        </Button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
}
