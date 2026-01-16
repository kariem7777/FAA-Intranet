import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { Dialog } from '@/shared/components/Dialog/Dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addDocument } from '../../slices/documentsManagementSlice';
import { Upload, X, FileText } from 'lucide-react';

interface AddDocumentDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddDocumentDialog({ isOpen, onClose }: AddDocumentDialogProps) {
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.documentsManagement);

    const isArabic = i18n.language === 'ar';
    const fontFamily = isArabic ? 'Dubai, Arial, sans-serif' : 'Inter, system-ui, sans-serif';

    const [title, setTitle] = useState('');
    const [entity, setEntity] = useState('');
    const [legislation, setLegislation] = useState('');
    const [category, setCategory] = useState('');
    const [classification, setClassification] = useState<'public' | 'secret'>('public');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !entity || !legislation || !category || !selectedFile) return; // Simple validation

        const resultAction = await dispatch(addDocument({
            title,
            entity,
            legislation,
            category,
            classification,
            uploadedBy: 'Current User', // TODO: Get from auth context
            pdfUrl: '', // Will be set by the server after file upload

        }));

        if (addDocument.fulfilled.match(resultAction)) {
            toast.success(t('legislation.documentsManagement.toasts.addSuccess'));
            onClose();
            resetForm();
        } else {
            toast.error(t('legislation.documentsManagement.toasts.addError'));
        }
    };

    const resetForm = () => {
        setTitle('');
        setEntity('');
        setLegislation('');
        setCategory('');
        setClassification('public');
        setSelectedFile(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };



    if (!isOpen) return null;

    return (
        <Dialog
            onClose={onClose}
            title={t('legislation.documentsManagement.dialogs.add.title')}
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
                                {/* Add more options as needed or fetch dynamically */}
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
                                {/* Add more options */}
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
                                {/* Add more options */}
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

                    {/* File Upload */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            {t('legislation.documentsManagement.form.fileLabel')}
                        </label>
                        <div
                            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept=".pdf,.docx,.doc"
                                onChange={handleFileChange}
                            />
                            {selectedFile ? (
                                <div className="flex items-center justify-center gap-2 text-[#2F4F6F]">
                                    <FileText className="h-6 w-6" />
                                    <span className="font-medium">{selectedFile.name}</span>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedFile(null);
                                        }}
                                        className="p-1 hover:bg-red-50 rounded-full text-red-500"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-gray-500">
                                    <Upload className="h-8 w-8 text-[#C9A24D]" />
                                    <p>{t('legislation.documentsManagement.form.uploadText')}</p>
                                    <p className="text-xs text-gray-400">{t('legislation.documentsManagement.form.fileSupport')}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {error.add && (
                        <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md">
                            {error.add}
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            style={{ fontFamily }}
                        >
                            {t('legislation.documentsManagement.dialogs.add.cancel')}
                        </Button>
                        <Button
                            type="submit"
                            className="bg-[#2F4F6F] hover:bg-[#1e3a53] text-white"
                            disabled={loading.add}
                            style={{ fontFamily }}
                        >
                            {loading.add ? t('common.loading') : t('legislation.documentsManagement.dialogs.add.submit')}
                        </Button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
}
