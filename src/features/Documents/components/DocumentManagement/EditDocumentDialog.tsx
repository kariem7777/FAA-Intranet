import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { Dialog } from '@/shared/components/Dialog/Dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Select } from '@/shared/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Upload, X, FileText } from 'lucide-react';
import { updateDocument } from '../../slices/documentsManagementSlice';
import {
    fetchSubCategoriesByCategory,
    fetchCategories,
    fetchEntities
} from '@/features/Legislation/slices/legislationSlice';
import { useForm, Controller } from 'react-hook-form';
import { documentSchema, zodResolver, type DocumentFormData } from '../../schemas';
import { FetchingSelect } from '@/shared/components/Select/FetchingSelect';
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
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { register, handleSubmit, watch, setValue, setError, control, formState: { errors } } = useForm<DocumentFormData>({
        resolver: zodResolver(documentSchema),
        defaultValues: {
            categoryId: document.categoryId,
            subCategoryId: document.subCategoryId,
            entityId: document.entityId,
            documentNameEn: document.documentNameEn,
            documentNameAr: document.documentNameAr,
            lawNumber: document.lawNumber || '',
            lawNameAr: document.lawNameAr || '',
            lawNameEn: document.lawNameEn || '',
            classification: document.classification,
        }
    });

    const categoryId = watch('categoryId');
    const selectedFile = watch('file');

    const selectedCategory = categories.items.find(cat => cat.id === categoryId);
    const isEntityLegislation = selectedCategory?.slug === 'entity-legislation';

    // Fetch sub-categories when category changes
    useEffect(() => {
        if (categoryId && categoryId !== 0) {
            dispatch(fetchSubCategoriesByCategory({ categoryId }));
        }
    }, [categoryId, dispatch]);

    // Initial load of sub-categories if needed (though watch might handle it if initial categoryId is set)
    useEffect(() => {
        if (document.categoryId) {
            dispatch(fetchSubCategoriesByCategory({ categoryId: document.categoryId }));
        }
    }, [document.categoryId, dispatch]);

    const handleRetryCategories = () => dispatch(fetchCategories());
    const handleRetrySubCategories = () => {
        if (categoryId) dispatch(fetchSubCategoriesByCategory({ categoryId }));
    };
    const handleRetryEntities = () => dispatch(fetchEntities());

    const onValidSubmit = async (data: DocumentFormData) => {
        if (isEntityLegislation && (!data.entityId || data.entityId === 0)) {
            setError('entityId', { type: 'manual', message: 'legislation.documentsManagement.validation.selectEntity' });
            return;
        }

        const updatedDocument: Document = {
            ...document,
            categoryId: Number(data.categoryId),
            subCategoryId: Number(data.subCategoryId),
            entityId: data.entityId ? Number(data.entityId) : 0,
            documentNameEn: data.documentNameEn,
            documentNameAr: data.documentNameAr,
            lawNumber: data.lawNumber || '',
            lawNameAr: data.lawNameAr || '',
            lawNameEn: data.lawNameEn || '',
            classification: data.classification,
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
            setValue('file', e.target.files[0]);
        }
    };

    if (!isOpen) return null;

    return (
        <Dialog
            onClose={onClose}
            title={t('legislation.documentsManagement.dialogs.edit.title')}
            size="large"
        >
            <form onSubmit={handleSubmit(onValidSubmit)} dir={isArabic ? 'rtl' : 'ltr'} className="space-y-6">
                {/* General Details Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Document Name English */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-faa-primary">
                            {t('legislation.documentsManagement.dialogs.edit.documentNameEn')}
                        </label>
                        <Input
                            type="text"
                            {...register('documentNameEn')}
                        />
                        {errors.documentNameEn && <p className="text-red-500 text-xs mt-1">{t(String(errors.documentNameEn.message || ''))}</p>}
                    </div>

                    {/* Document Name Arabic */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-faa-primary">
                            {t('legislation.documentsManagement.dialogs.edit.documentNameAr')}
                        </label>
                        <Input
                            type="text"
                            {...register('documentNameAr')}
                        />
                        {errors.documentNameAr && <p className="text-red-500 text-xs mt-1">{t(String(errors.documentNameAr.message || ''))}</p>}
                    </div>
                </div>
                {/* Law Number and Slug */}
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-faa-primary">
                            {t('legislation.documentsManagement.dialogs.edit.lawNumber')}
                        </label>
                        <Input
                            type="text"
                            {...register('lawNumber')}
                        />
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {/* Entity */}
                    {isEntityLegislation && (
                        <div>
                            <Controller
                                name="entityId"
                                control={control}
                                render={({ field }) => (
                                    <FetchingSelect
                                        id="entityId"
                                        label={t('legislation.documentsManagement.dialogs.edit.entity')}
                                        value={field.value || 0}
                                        onChange={(val) => field.onChange(val)}
                                        isLoading={entities.loading}
                                        error={entities.error}
                                        onRetry={handleRetryEntities}
                                        required
                                        placeholder={t('legislation.documentsManagement.dialogs.edit.selectEntity')}
                                    >
                                        {entities.items.map((entity) => (
                                            <option key={entity.entityId} value={entity.entityId}>
                                                {isArabic ? entity.entityNameAr : entity.entityName}
                                            </option>
                                        ))}
                                    </FetchingSelect>
                                )}
                            />
                            {errors.entityId && <p className="text-red-500 text-xs mt-1">{t(String(errors.entityId.message || ''))}</p>}
                        </div>
                    )}
                    <div>
                        <Controller
                            name="categoryId"
                            control={control}
                            render={({ field }) => (
                                <FetchingSelect
                                    id="categoryId"
                                    label={t('legislation.documentsManagement.dialogs.edit.category')}
                                    value={field.value}
                                    onChange={(val) => field.onChange(val)}
                                    isLoading={categories.loading}
                                    error={categories.error}
                                    onRetry={handleRetryCategories}
                                    required
                                    placeholder={t('legislation.documentsManagement.dialogs.edit.selectCategory')}
                                >
                                    {categories.items.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {isArabic ? cat.lawCategoryAr : cat.lawCategoryEn}
                                        </option>
                                    ))}
                                </FetchingSelect>
                            )}
                        />
                        {errors.categoryId && <p className="text-red-500 text-xs mt-1">{t(String(errors.categoryId.message || ''))}</p>}
                    </div>
                    <div>
                        <Controller
                            name="subCategoryId"
                            control={control}
                            render={({ field }) => (
                                <FetchingSelect
                                    id="subCategoryId"
                                    label={t('legislation.documentsManagement.dialogs.edit.subCategory')}
                                    value={field.value}
                                    onChange={(val) => field.onChange(val)}
                                    disabled={!categoryId || subCategories.loading}
                                    isLoading={subCategories.loading}
                                    error={subCategories.error}
                                    onRetry={handleRetrySubCategories}
                                    required
                                    placeholder={
                                        !categoryId
                                            ? t('legislation.documentsManagement.dialogs.edit.selectCategoryFirst')
                                            : subCategories.items.length === 0 && !subCategories.loading
                                                ? t('legislation.documentsManagement.dialogs.edit.noSubCategories')
                                                : t('legislation.documentsManagement.dialogs.edit.selectSubCategory')
                                    }
                                >
                                    {subCategories.items.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {isArabic ? cat.lawSubCategoryAr : cat.lawSubCategoryEn}
                                        </option>
                                    ))}
                                </FetchingSelect>
                            )}
                        />
                        {errors.subCategoryId && <p className="text-red-500 text-xs mt-1">{t(String(errors.subCategoryId.message || ''))}</p>}
                    </div>
                </div>


                {/*Law Name English  */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Law Name English */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-faa-primary">
                            {t('legislation.documentsManagement.dialogs.edit.lawNameEn')}
                        </label>
                        <Input
                            type="text"
                            {...register('lawNameEn')}
                        />
                    </div>

                    {/* Law Name Arabic */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-faa-primary">
                            {t('legislation.documentsManagement.dialogs.edit.lawNameAr')}
                        </label>
                        <Input
                            type="text"
                            {...register('lawNameAr')}
                        />
                    </div>
                </div>


                {/* Classification */}
                <div>
                    <label className="block text-sm font-medium mb-2 text-faa-primary">
                        {t('legislation.documentsManagement.dialogs.edit.classification')}
                    </label>
                    <Select
                        {...register('classification', { valueAsNumber: true })}
                    >
                        <option value={1}>{t('legislation.documentsManagement.public')}</option>
                        <option value={2}>{t('legislation.documentsManagement.secret')}</option>
                    </Select>
                </div>

                {/* File Upload (Optional for edit) */}
                <div>
                    <label className="block text-sm font-medium mb-2 text-faa-primary">
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
                                    <FileText className="h-5 w-5 text-faa-primary" />
                                    <span>{selectedFile.name}</span>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setValue('file', null)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Upload className="h-8 w-8 mx-auto mb-2 text-faa-primary" />
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
                        className="bg-faa-primary"
                    >
                        {loading.update ? t('common.loading') : t('legislation.documentsManagement.dialogs.edit.submit')}
                    </Button>
                </div>
            </form>
        </Dialog>
    );
}
