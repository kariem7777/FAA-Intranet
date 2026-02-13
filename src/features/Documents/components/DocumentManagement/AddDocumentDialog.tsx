import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { Dialog } from '@/shared/components/Dialog/Dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Select } from '@/shared/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Upload, X, FileText } from 'lucide-react';
import { addDocument } from '../../slices/documentsManagementSlice';
import { fetchSubCategoriesByCategory } from '@/features/Legislation/slices/legislationSlice';
import type { CreateDocument } from '../../types';

interface AddDocumentDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddDocumentDialog({ isOpen, onClose }: AddDocumentDialogProps) {
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.documentsManagement);
    const { entities, categories, subCategories } = useAppSelector((state) => state.legislationSlice);

    const isArabic = i18n.language === 'ar';

    // Form state matching CreateDocument interface
    const [categoryId, setCategoryId] = useState<number>(0);
    const [subCategoryId, setSubCategoryId] = useState<number>(0);
    const [entityId, setEntityId] = useState<number>(0);
    const [documentNameEn, setDocumentNameEn] = useState('');
    const [documentNameAr, setDocumentNameAr] = useState('');
    const [lawNumber, setLawNumber] = useState('');
    const [lawNameAr, setLawNameAr] = useState('');
    const [lawNameEn, setLawNameEn] = useState('');
    const [classification, setClassification] = useState<number>(1); // 1 = public, 2 = secret
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fetch sub-categories when category changes
    useEffect(() => {
        if (categoryId && categoryId !== 0) {
            dispatch(fetchSubCategoriesByCategory({ categoryId }));
            setSubCategoryId(0); // Reset sub-category when category changes
        }
    }, [categoryId, dispatch]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!documentNameEn || !documentNameAr || !selectedFile || !entityId || !categoryId || !subCategoryId) {
            toast.error(t('legislation.documentsManagement.toasts.fillAllFields'));
            return;
        }

        const newDocument: CreateDocument = {
            categoryId,
            subCategoryId,
            entityId,
            documentNameEn,
            documentNameAr,
            lawNumber,
            lawNameAr,
            lawNameEn,
            classification,
            file: selectedFile
        };

        const resultAction = await dispatch(addDocument(newDocument));

        if (addDocument.fulfilled.match(resultAction)) {
            toast.success(t('legislation.documentsManagement.toasts.addSuccess'));
            onClose();
            resetForm();
        } else {
            toast.error(t('legislation.documentsManagement.toasts.addError'));
        }
    };

    const resetForm = () => {
        setCategoryId(0);
        setSubCategoryId(0);
        setEntityId(0);
        setDocumentNameEn('');
        setDocumentNameAr('');
        setLawNumber('');
        setLawNameAr('');
        setLawNameEn('');
        setClassification(1);
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
            size="fullscreen"
            className={'max-w-[1800px]! max-h-[1100px]!'}
        >
            <form onSubmit={handleSubmit} dir={isArabic ? 'rtl' : 'ltr'} className="space-y-4">
                {/* Document Name English */}
                <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-dashboard-primary)' }}>
                        {t('legislation.documentsManagement.dialogs.add.documentNameEn')}
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
                        {t('legislation.documentsManagement.dialogs.add.documentNameAr')}
                    </label>
                    <Input
                        type="text"
                        value={documentNameAr}
                        onChange={(e) => setDocumentNameAr(e.target.value)}
                        required
                    />
                </div>

                {/* Entity */}
                <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-dashboard-primary)' }}>
                        {t('legislation.documentsManagement.dialogs.add.entity')}
                    </label>
                    <Select
                        value={entityId}
                        onChange={(e) => setEntityId(Number(e.target.value))}
                        required
                    >
                        <option value={0}>{t('legislation.documentsManagement.dialogs.add.selectEntity')}</option>
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
                        {t('legislation.documentsManagement.dialogs.add.category')}
                    </label>
                    <Select
                        value={categoryId}
                        onChange={(e) => {
                            setCategoryId(Number(e.target.value));
                            setSubCategoryId(0); // Reset sub-category when category changes
                        }}
                        required
                    >
                        <option value={0}>{t('legislation.documentsManagement.dialogs.add.selectCategory')}</option>
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
                        {t('legislation.documentsManagement.dialogs.add.subCategory')}
                    </label>
                    <Select
                        value={subCategoryId}
                        onChange={(e) => setSubCategoryId(Number(e.target.value))}
                        required
                        disabled={!categoryId || subCategories.loading}
                    >
                        <option value={0}>
                            {!categoryId
                                ? t('legislation.documentsManagement.dialogs.add.selectCategoryFirst')
                                : subCategories.loading
                                    ? t('common.loading')
                                    : subCategories.items.length === 0
                                        ? t('legislation.documentsManagement.dialogs.add.noSubCategories')
                                        : t('legislation.documentsManagement.dialogs.add.selectSubCategory')}
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

                {/* Law Number */}
                <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-dashboard-primary)' }}>
                        {t('legislation.documentsManagement.dialogs.add.lawNumber')}
                    </label>
                    <Input
                        type="text"
                        value={lawNumber}
                        onChange={(e) => setLawNumber(e.target.value)}
                    />
                </div>

                {/* Law Name English */}
                <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-dashboard-primary)' }}>
                        {t('legislation.documentsManagement.dialogs.add.lawNameEn')}
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
                        {t('legislation.documentsManagement.dialogs.add.lawNameAr')}
                    </label>
                    <Input
                        type="text"
                        value={lawNameAr}
                        onChange={(e) => setLawNameAr(e.target.value)}
                    />
                </div>

                {/* Classification */}
                <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-dashboard-primary)' }}>
                        {t('legislation.documentsManagement.dialogs.add.classification')}
                    </label>
                    <Select
                        value={classification}
                        onChange={(e) => setClassification(Number(e.target.value))}
                    >
                        <option value={1}>{t('legislation.documentsManagement.public')}</option>
                        <option value={2}>{t('legislation.documentsManagement.secret')}</option>
                    </Select>
                </div>

                {/* File Upload */}
                <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-dashboard-primary)' }}>
                        {t('legislation.documentsManagement.dialogs.add.file')}
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
                                    {t('legislation.documentsManagement.dialogs.add.selectFile')}
                                </Button>
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
                        {t('legislation.documentsManagement.dialogs.add.cancel')}
                    </Button>
                    <Button
                        type="submit"
                        disabled={loading.add}
                        style={{ background: 'var(--color-dashboard-primary)' }}
                    >
                        {loading.add ? t('common.loading') : t('legislation.documentsManagement.dialogs.add.submit')}
                    </Button>
                </div>
            </form>
        </Dialog>
    );
}
