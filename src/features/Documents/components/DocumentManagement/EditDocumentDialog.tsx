import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { Dialog } from '@/shared/components/Dialog/Dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Select } from '@/shared/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Upload, X, FileText } from 'lucide-react';
import { updateDocument } from '../../slices/documentsManagementSlice';
import { fetchSubCategoriesByCategory } from '@/features/Legislation/slices/legislationSlice';
import type { Document } from '../../types';

interface EditDocumentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    document: Document;
}

export function EditDocumentDialog({ isOpen, onClose, document }: EditDocumentDialogProps) {
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.documentsManagement);
    const { entities, categories, subCategories } = useAppSelector((state) => state.legislationSlice);

    const isArabic = i18n.language === 'ar';

    // Form state initialized from document
    const [categoryId, setCategoryId] = useState<number>(document.categoryId);
    const [subCategoryId, setSubCategoryId] = useState<number>(document.subCategoryId);
    const [entityId, setEntityId] = useState<number>(document.entityId);
    const [documentNameEn, setDocumentNameEn] = useState(document.documentNameEn);
    const [documentNameAr, setDocumentNameAr] = useState(document.documentNameAr);
    const [lawNumber, setLawNumber] = useState(document.lawNumber);
    const [lawNameAr, setLawNameAr] = useState(document.lawNameAr);
    const [lawNameEn, setLawNameEn] = useState(document.lawNameEn);
    const [classification, setClassification] = useState<number>(document.classification);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fetch sub-categories when category changes
    useEffect(() => {
        if (categoryId && categoryId !== 0) {
            dispatch(fetchSubCategoriesByCategory({ categoryId }));
        }
    }, [categoryId, dispatch]);

    // Load sub-categories for the initial category
    useEffect(() => {
        if (document.categoryId) {
            dispatch(fetchSubCategoriesByCategory({ categoryId: document.categoryId }));
        }
    }, [document.categoryId, dispatch]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!documentNameEn || !documentNameAr || !entityId || !categoryId || !subCategoryId) {
            toast.error(t('legislation.documentsManagement.toasts.fillAllFields'));
            return;
        }

        const updatedDocument: Document = {
            ...document,
            categoryId,
            subCategoryId,
            entityId,
            documentNameEn,
            documentNameAr,
            lawNumber,
            lawNameAr,
            lawNameEn,
            classification,
        };

        const resultAction = await dispatch(updateDocument({
            document: updatedDocument,
            file: selectedFile || undefined
        }));
        if (resultAction && resultAction.type && resultAction.type.endsWith('/fulfilled')) {
            toast.success(t('legislation.documentsManagement.toasts.updateSuccess'));
            onClose();
        } else {
            toast.error(t('legislation.documentsManagement.toasts.updateError'));
        }
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
            title={t('legislation.documentsManagement.dialogs.edit.title')}
            size="fullscreen"
            className={'max-w-[1800px]! max-h-[970px]!'}
        >
            <form onSubmit={handleSubmit} dir={isArabic ? 'rtl' : 'ltr'} className="space-y-4">
                {/* Document Name and Law Number Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Document Name English */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-dashboard-primary)' }}>
                            {t('legislation.documentsManagement.dialogs.edit.documentNameEn')}
                        </label>
                        <Input
                            type="text"
                            value={documentNameEn}
                            onChange={(e) => setDocumentNameEn(e.target.value)}
                            required
                        />
                    </div>

                    {/* Document Name Arabic */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-dashboard-primary)' }}>
                            {t('legislation.documentsManagement.dialogs.edit.documentNameAr')}
                        </label>
                        <Input
                            type="text"
                            value={documentNameAr}
                            onChange={(e) => setDocumentNameAr(e.target.value)}
                            required
                        />
                    </div>
                </div>
                {/* Law Number (Unique Column) */}
                <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-dashboard-primary)' }}>
                        {t('legislation.documentsManagement.dialogs.edit.lawNumber')}
                    </label>
                    <Input
                        type="text"
                        value={lawNumber}
                        onChange={(e) => setLawNumber(e.target.value)}
                    />
                </div>

                {/* Entity */}
                <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-dashboard-primary)' }}>
                        {t('legislation.documentsManagement.dialogs.edit.entity')}
                    </label>
                    <Select
                        value={entityId}
                        onChange={(e) => setEntityId(Number(e.target.value))}
                        required
                    >
                        <option value={0}>{t('legislation.documentsManagement.dialogs.edit.selectEntity')}</option>
                        {entities.items.map((entity) => (
                            <option key={entity.entityId} value={entity.entityId}>
                                {isArabic ? entity.entityNameAr : entity.entityName}
                            </option>
                        ))}
                    </Select>
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-dashboard-primary)' }}>
                        {t('legislation.documentsManagement.dialogs.edit.category')}
                    </label>
                    <Select
                        value={categoryId}
                        onChange={(e) => {
                            setCategoryId(Number(e.target.value));
                            setSubCategoryId(0); // Reset sub-category when category changes
                        }}
                        required
                    >
                        <option value={0}>{t('legislation.documentsManagement.dialogs.edit.selectCategory')}</option>
                        {categories.items.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {isArabic ? cat.lawCategoryAr : cat.lawCategoryEn}
                            </option>
                        ))}
                    </Select>
                </div>

                {/* Sub Category */}
                <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-dashboard-primary)' }}>
                        {t('legislation.documentsManagement.dialogs.edit.subCategory')}
                    </label>
                    <Select
                        value={subCategoryId}
                        onChange={(e) => setSubCategoryId(Number(e.target.value))}
                        required
                        disabled={!categoryId || subCategories.loading}
                    >
                        <option value={0}>
                            {!categoryId
                                ? t('legislation.documentsManagement.dialogs.edit.selectCategoryFirst')
                                : subCategories.loading
                                    ? t('common.loading')
                                    : subCategories.items.length === 0
                                        ? t('legislation.documentsManagement.dialogs.edit.noSubCategories')
                                        : t('legislation.documentsManagement.dialogs.edit.selectSubCategory')}
                        </option>
                        {subCategories.items.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {isArabic ? cat.lawSubCategoryAr : cat.lawSubCategoryEn}
                            </option>
                        ))}
                    </Select>
                    {subCategories.error && (
                        <p className="text-red-500 text-sm mt-1">{subCategories.error}</p>
                    )}
                </div>

                {/*Law Name English  */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Law Name English */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-dashboard-primary)' }}>
                            {t('legislation.documentsManagement.dialogs.edit.lawNameEn')}
                        </label>
                        <Input
                            type="text"
                            value={lawNameEn}
                            onChange={(e) => setLawNameEn(e.target.value)}
                        />
                    </div>

                    {/* Law Name Arabic */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-dashboard-primary)' }}>
                            {t('legislation.documentsManagement.dialogs.edit.lawNameAr')}
                        </label>
                        <Input
                            type="text"
                            value={lawNameAr}
                            onChange={(e) => setLawNameAr(e.target.value)}
                        />
                    </div>
                </div>


                {/* Classification */}
                <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-dashboard-primary)' }}>
                        {t('legislation.documentsManagement.dialogs.edit.classification')}
                    </label>
                    <Select
                        value={classification}
                        onChange={(e) => setClassification(Number(e.target.value))}
                    >
                        <option value={1}>{t('legislation.documentsManagement.public')}</option>
                        <option value={2}>{t('legislation.documentsManagement.secret')}</option>
                    </Select>
                </div>

                {/* File Upload (Optional for edit) */}
                <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-dashboard-primary)' }}>
                        {t('legislation.documentsManagement.dialogs.edit.file')} ({t('legislation.documentsManagement.dialogs.edit.optional')})
                    </label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        {selectedFile ? (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" style={{ color: 'var(--color-dashboard-primary)' }} />
                                    <span>{selectedFile.name}</span>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setSelectedFile(null)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Upload className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--color-dashboard-primary)' }} />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {t('legislation.documentsManagement.dialogs.edit.selectFile')}
                                </Button>
                                <p className="text-sm text-gray-500 mt-2">
                                    {t('legislation.documentsManagement.dialogs.edit.currentFile')}: {isArabic ? document.documentNameAr : document.documentNameEn}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                    >
                        {t('legislation.documentsManagement.dialogs.edit.cancel')}
                    </Button>
                    <Button
                        type="submit"
                        disabled={loading.update}
                        style={{ background: 'var(--color-dashboard-primary)' }}
                    >
                        {loading.update ? t('common.loading') : t('legislation.documentsManagement.dialogs.edit.submit')}
                    </Button>
                </div>
            </form>
        </Dialog>
    );
}
