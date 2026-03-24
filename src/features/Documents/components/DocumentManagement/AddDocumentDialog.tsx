import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { Dialog } from '@/shared/components/Dialog/Dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Select } from '@/shared/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Upload, X, FileText } from 'lucide-react';
import { addDocument } from '../../slices/documentsManagementSlice';
import {
    fetchSubCategoriesByCategory,
    fetchCategories,
    fetchEntities
} from '@/features/Legislation/slices/legislationSlice';
import { useForm, Controller } from 'react-hook-form';
import { documentSchema, zodResolver, type DocumentFormData } from '../../schemas';
import { FetchingSelect } from '@/shared/components/Select/FetchingSelect';
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
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { register, handleSubmit, watch, setValue, setError, reset, control, formState: { errors } } = useForm<DocumentFormData>({
        resolver: zodResolver(documentSchema),
        defaultValues: {
            categoryId: 0,
            subCategoryId: 0,
            entityId: 0,
            classification: 1,
            documentNameEn: '',
            documentNameAr: '',
            lawNumber: '',
            lawNameAr: '',
            lawNameEn: '',
        }
    });

    const categoryId = watch('categoryId');
    const selectedFile = watch('file');

    const selectedCategory = categories.items.find(cat => cat.id === categoryId);
    const isEntityLegislation = selectedCategory?.slug === 'entity-legislation';

    useEffect(() => {
        if (categoryId && categoryId !== 0) {
            dispatch(fetchSubCategoriesByCategory({ categoryId }));
            setValue('subCategoryId', 0);
        }
    }, [categoryId, dispatch, setValue]);

    const handleRetryCategories = () => dispatch(fetchCategories());
    const handleRetrySubCategories = () => {
        if (categoryId) dispatch(fetchSubCategoriesByCategory({ categoryId }));
    };
    const handleRetryEntities = () => dispatch(fetchEntities());

    const onValidSubmit = async (data: DocumentFormData) => {
        if (!selectedFile) {
            setError('file', { type: 'manual', message: 'legislation.documentsManagement.validation.fileRequired' });
            return;
        }

        if (isEntityLegislation && (!data.entityId || data.entityId === 0)) {
            setError('entityId', { type: 'manual', message: 'legislation.documentsManagement.validation.selectEntity' });
            return;
        }

        const newDocument: CreateDocument = {
            categoryId: Number(data.categoryId),
            subCategoryId: Number(data.subCategoryId),
            documentNameEn: data.documentNameEn,
            documentNameAr: data.documentNameAr,
            lawNumber: data.lawNumber || '',
            lawNameAr: data.lawNameAr || '',
            lawNameEn: data.lawNameEn || '',
            classification: data.classification,
            file: selectedFile,
        };

        if (isEntityLegislation) {
            newDocument.entityId = data.entityId ? Number(data.entityId) : 0;
        } else {
            newDocument.entityId = undefined
        }

        try {
            const resultAction = await dispatch(addDocument(newDocument));
            if (resultAction && resultAction.type && resultAction.type.endsWith('/fulfilled')) {
                toast.success(t('legislation.documentsManagement.toasts.addSuccess'));
                onClose();
                reset();
            } else {
                console.log("asdad")

                toast.error(t('legislation.documentsManagement.toasts.addError'));
            }
        } catch (error) {
            console.log(error)
            toast.error(t('legislation.documentsManagement.toasts.addError'));
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
            title={t('legislation.documentsManagement.dialogs.add.title')}
            size="large"
        >
            <form onSubmit={handleSubmit(onValidSubmit)} dir={isArabic ? 'rtl' : 'ltr'} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Document Name English */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-faa-primary">
                            {t('legislation.documentsManagement.dialogs.add.documentNameEn')}
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
                            {t('legislation.documentsManagement.dialogs.add.documentNameAr')}
                        </label>
                        <Input
                            type="text"
                            {...register('documentNameAr')}
                        />
                        {errors.documentNameAr && <p className="text-red-500 text-xs mt-1">{t(String(errors.documentNameAr.message || ''))}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-faa-primary">
                            {t('legislation.documentsManagement.dialogs.add.lawNumber')}
                        </label>
                        <Input
                            type="text"
                            {...register('lawNumber')}
                        />
                    </div>
                </div>


                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <Controller
                            name="categoryId"
                            control={control}
                            render={({ field }) => (
                                <FetchingSelect
                                    id="categoryId"
                                    label={t('legislation.documentsManagement.dialogs.add.category')}
                                    value={field.value}
                                    onChange={(val) => {
                                        field.onChange(val);
                                        setValue('subCategoryId', 0);
                                    }}
                                    isLoading={categories.loading}
                                    error={categories.error}
                                    onRetry={handleRetryCategories}
                                    required
                                    placeholder={t('legislation.documentsManagement.dialogs.add.selectCategory')}
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

                    {/* Sub Category */}
                    <div>
                        <Controller
                            name="subCategoryId"
                            control={control}
                            render={({ field }) => (
                                <FetchingSelect
                                    id="subCategoryId"
                                    label={t('legislation.documentsManagement.dialogs.add.subCategory')}
                                    value={field.value}
                                    onChange={(val) => field.onChange(val)}
                                    disabled={!categoryId || subCategories.loading}
                                    isLoading={subCategories.loading}
                                    error={subCategories.error}
                                    onRetry={handleRetrySubCategories}
                                    required
                                    placeholder={
                                        !categoryId
                                            ? t('legislation.documentsManagement.dialogs.add.selectCategoryFirst')
                                            : subCategories.items.length === 0 && !subCategories.loading
                                                ? t('legislation.documentsManagement.dialogs.add.noSubCategories')
                                                : t('legislation.documentsManagement.dialogs.add.selectSubCategory')
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
                {/* Category */}
                {isEntityLegislation && (
                    <div className='grid grid-cols-1 md:grid-cols-1 gap-4'>
                        <div>
                            <Controller
                                name="entityId"
                                control={control}
                                render={({ field }) => (
                                    <FetchingSelect
                                        id="entityId"
                                        label={t('legislation.documentsManagement.dialogs.add.entity')}
                                        value={field.value || 0}
                                        onChange={(val) => field.onChange(val)}
                                        isLoading={entities.loading}
                                        error={entities.error}
                                        onRetry={handleRetryEntities}
                                        required
                                        placeholder={t('legislation.documentsManagement.dialogs.add.selectEntity')}
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
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Law Name English */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-faa-primary">
                            {t('legislation.documentsManagement.dialogs.add.lawNameEn')}
                        </label>
                        <Input
                            type="text"
                            {...register('lawNameEn')}
                        />
                    </div>

                    {/* Law Name Arabic */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-faa-primary">
                            {t('legislation.documentsManagement.dialogs.add.lawNameAr')}
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
                        {t('legislation.documentsManagement.dialogs.add.classification')}
                    </label>
                    <Select
                        {...register('classification', { valueAsNumber: true })}
                    >
                        <option value={1}>{t('legislation.documentsManagement.public')}</option>
                        <option value={2}>{t('legislation.documentsManagement.secret')}</option>
                    </Select>
                </div>

                {/* File Upload */}
                <div>
                    <label className="block text-sm font-medium mb-2 text-faa-primary">
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
                                    {t('legislation.documentsManagement.dialogs.add.selectFile')}
                                </Button>
                                {errors.file && <p className="text-red-500 text-xs mt-1">{t(String(errors.file.message || ''))}</p>}
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
                        className="bg-faa-primary"
                    >
                        {loading.add ? t('common.loading') : t('legislation.documentsManagement.dialogs.add.submit')}
                    </Button>
                </div>
            </form>
        </Dialog>
    );
}
