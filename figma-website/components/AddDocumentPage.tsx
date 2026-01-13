import { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Upload, ArrowLeft, FileText, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { LegislationBanner } from './LegislationBanner';

interface AddDocumentPageProps {
  onBack: () => void;
  onSave?: (documentData: any) => void;
  editDocument?: any; // Document to edit (if any)
}

export function AddDocumentPage({ onBack, onSave, editDocument }: AddDocumentPageProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  // Legislation Platform Theme Colors
  const legislationColors = {
    primary: '#2F4F6F',      // Deep Blue-Gray (legislation primary)
    accent: '#C9A24D',       // Muted Gold
    bgOffWhite: '#F7F8FA',   // Off-White
  };

  // Typography - Use Dubai font for Arabic
  const fontFamily = isArabic 
    ? 'Dubai, Arial, sans-serif' 
    : 'Inter, system-ui, sans-serif';
  
  const [formData, setFormData] = useState({
    legislation: editDocument?.legislation || '',
    entity: editDocument?.entity || '',
    documentCategory: editDocument?.documentCategory || '',
    title: editDocument?.title || '',
    file: null as File | null,
    classification: editDocument?.classification || 'public',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);

  const content = {
    en: {
      pageTitle: editDocument ? 'Edit Document' : 'Add New Document',
      pageDescription: editDocument ? 'Update document information and metadata' : 'Upload and categorize a new legislative document',
      backButton: 'Back to Documents',
      legislation: 'Legislation',
      legislationPlaceholder: 'Select legislation type',
      entity: 'Entity',
      entityPlaceholder: 'Select an entity',
      documentCategory: 'Category',
      documentCategoryPlaceholder: 'Select a document category',
      title: 'Title',
      titlePlaceholder: 'Enter document title',
      uploadFile: 'Upload File',
      chooseFile: 'Choose File',
      currentFile: 'Current File',
      changeFile: 'Change File',
      supportedFiles: 'Supported files: PDF (Max 10MB)',
      dragDrop: 'or drag and drop your file here',
      classification: 'Document Classification',
      public: 'public',
      secret: 'Secret',
      publicDesc: 'Accessible to all authorized users',
      secretDesc: 'Restricted access - confidential document',
      saveDocument: editDocument ? 'Update Document' : 'Save Document',
      cancel: 'Cancel',
      selectLegislation: 'Please select legislation type',
      selectEntity: 'Please select an entity',
      selectDocumentCategory: 'Please select a document category',
      enterTitle: 'Please enter a title',
      uploadFileRequired: 'Please upload a file',
      fileTooLarge: 'File size exceeds 10MB',
      invalidFileType: 'Only PDF files are supported',
      legislations: {
        entityLegislation: "Entity's Legislation",
        federalLegislation: 'Federal Legislation',
        localLegislation: 'Local Legislation',
        faaLegislation: "FAA's Legislation",
      },
      entities: {
        federal: 'Federal Government',
        cabinet: 'Cabinet',
        abudhabi: 'Abu Dhabi Government',
        dubai: 'Dubai Government',
        faa: 'Financial Audit Authority',
        bank: 'Abu Dhabi Commercial Bank',
      },
      documentCategories: {
        financial: 'Financial Documents',
        legal: 'Legal Documents',
        administrative: 'Administrative Documents',
        technical: 'Technical Documents',
        operational: 'Operational Documents',
      },
    },
    ar: {
      pageTitle: editDocument ? 'تعديل الوثيقة' : 'إضافة وثيقة جديدة',
      pageDescription: editDocument ? 'تحديث معلومات الوثيقة والبيانات الوصفية' : 'رفع وتصنيف وثيقة تشريعية جديدة',
      backButton: 'العودة إلى الوثائق',
      legislation: 'التشريع',
      legislationPlaceholder: 'اختر نوع التشريع',
      entity: 'الجهة',
      entityPlaceholder: 'اختر الجهة',
      documentCategory: 'الفئة',
      documentCategoryPlaceholder: 'اختر فئة الوثيقة',
      title: 'العنوان',
      titlePlaceholder: 'أدخل عنوان الوثيقة',
      uploadFile: 'رفع الملف',
      chooseFile: 'اختر ملف',
      currentFile: 'الملف الحالي',
      changeFile: 'تغيير الملف',
      supportedFiles: 'الملفات المدعومة: PDF (الحد الأقصى 10 ميجابايت)',
      dragDrop: 'أو اسحب وأفلت الملف هنا',
      classification: 'تصنيف الوثيقة',
      public: 'عامة',
      secret: 'سرية',
      publicDesc: 'يمكن الوصول إليها من قبل جميع المستخدمين المصرح لهم',
      secretDesc: 'وصول محدود - وثيقة سرية',
      saveDocument: editDocument ? 'تحديث الوثيقة' : 'حفظ الوثيقة',
      cancel: 'إلغاء',
      selectLegislation: 'الرجاء اختيار نوع التشريع',
      selectEntity: 'الرجاء اختيار الجهة',
      selectDocumentCategory: 'الرجاء اختيار فئة الوثيقة',
      enterTitle: 'الرجاء إدخال العنوان',
      uploadFileRequired: 'الرجاء رفع ملف',
      fileTooLarge: 'حجم الملف يتجاوز 10 ميجابايت',
      invalidFileType: 'فقط ملفات PDF مدعومة',
      legislations: {
        entityLegislation: 'تشريعات الجهات الخاضعة',
        federalLegislation: 'التشريعات الاتحادية',
        localLegislation: 'التشريعات المحلية',
        faaLegislation: 'تشريعات الجهاز',
      },
      entities: {
        federal: 'الحكومة الاتحادية',
        cabinet: 'مجلس الوزراء',
        abudhabi: 'حكومة أبوظبي',
        dubai: 'حكومة دبي',
        faa: 'هيئة التدقيق المالي',
        bank: 'بنك أبوظبي التجاري',
      },
      documentCategories: {
        financial: 'وثائق مالية',
        legal: 'وثائق قانونية',
        administrative: 'وثائق إدارية',
        technical: 'وثائق فنية',
        operational: 'وثائق تشغيلية',
      },
    },
  };

  const t = content[language];

  const legislations = [
    { id: '', name: t.legislationPlaceholder },
    { id: 'entityLegislation', name: t.legislations.entityLegislation },
    { id: 'federalLegislation', name: t.legislations.federalLegislation },
    { id: 'localLegislation', name: t.legislations.localLegislation },
    { id: 'faaLegislation', name: t.legislations.faaLegislation },
  ];

  const entities = [
    { id: '', name: t.entityPlaceholder },
    { id: 'federal', name: t.entities.federal },
    { id: 'cabinet', name: t.entities.cabinet },
    { id: 'abudhabi', name: t.entities.abudhabi },
    { id: 'dubai', name: t.entities.dubai },
    { id: 'faa', name: t.entities.faa },
    { id: 'bank', name: t.entities.bank },
  ];

  const documentCategories = [
    { id: '', name: t.documentCategoryPlaceholder },
    { id: 'financial', name: t.documentCategories.financial },
    { id: 'legal', name: t.documentCategories.legal },
    { id: 'administrative', name: t.documentCategories.administrative },
    { id: 'technical', name: t.documentCategories.technical },
    { id: 'operational', name: t.documentCategories.operational },
  ];

  const handleFileChange = (file: File | null) => {
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      setErrors({ ...errors, file: t.invalidFileType });
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrors({ ...errors, file: t.fileTooLarge });
      return;
    }

    setFormData({ ...formData, file });
    setErrors({ ...errors, file: '' });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.legislation) newErrors.legislation = t.selectLegislation;
    if (!formData.entity) newErrors.entity = t.selectEntity;
    if (!formData.documentCategory) newErrors.documentCategory = t.selectDocumentCategory;
    if (!formData.title.trim()) newErrors.title = t.enterTitle;
    if (!formData.file && !editDocument) newErrors.file = t.uploadFileRequired;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form data:', formData);
      if (onSave) {
        onSave(formData);
      }
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-[#FEFEFE]" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Banner */}
      <LegislationBanner 
        title={{
          en: editDocument ? 'Edit Document' : 'Add New Document',
          ar: editDocument ? 'تعديل الوثيقة' : 'إضافة وثيقة جديدة'
        }}
        description={{
          en: t.pageDescription,
          ar: t.pageDescription
        }}
      />

      {/* Back Button - Below Banner */}
      <div className="px-20 py-6 bg-white border-b border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center gap-2 transition-colors"
          style={{ 
            color: '#6B7280',
            fontFamily,
            fontWeight: 500 
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = legislationColors.primary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#6B7280';
          }}
        >
          <ArrowLeft className={`h-5 w-5 ${isArabic ? 'rotate-180' : ''}`} />
          {t.backButton}
        </button>
      </div>

      {/* Form */}
     <div className="px-20 py-12">
  <form onSubmit={handleSubmit} className="space-y-14">

    {/* ================= Document Information ================= */}
    <section className="space-y-6">
      <h2
        className="text-[22px] text-[#1d293d]"
        style={{
          fontFamily: isArabic ? 'Dubai, Arial, sans-serif' : 'Arial, sans-serif',
          fontWeight: 700,
        }}
      >
        {isArabic ? 'معلومات الوثيقة' : 'Document Information'}
      </h2>

      {/* Row 1 */}
      <div className="grid grid-cols-3 gap-6">
        {/* Legislation */}
        <div>
          <label className="block text-[16px] text-gray-700 mb-2 font-semibold">
            {t.legislation} <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.legislation}
            onChange={(e) =>
              setFormData({ ...formData, legislation: e.target.value })
            }
            style={{ 
              fontFamily,
              borderColor: errors.legislation ? '#DC2626' : '#D1D5DB',
            }}
            onFocus={(e) => {
              if (!errors.legislation) e.currentTarget.style.borderColor = legislationColors.primary;
            }}
            onBlur={(e) => {
              if (!errors.legislation) e.currentTarget.style.borderColor = '#D1D5DB';
            }}
            className="w-full h-12 px-4 rounded-lg border bg-white transition text-[17px]"
          >
            {legislations.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>

        {/* Entity */}
        <div>
          <label className="block text-[16px] text-gray-700 mb-2 font-semibold">
            {t.entity} <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.entity}
            onChange={(e) =>
              setFormData({ ...formData, entity: e.target.value })
            }
            style={{ 
              fontFamily,
              borderColor: errors.entity ? '#DC2626' : '#D1D5DB',
            }}
            onFocus={(e) => {
              if (!errors.entity) e.currentTarget.style.borderColor = legislationColors.primary;
            }}
            onBlur={(e) => {
              if (!errors.entity) e.currentTarget.style.borderColor = '#D1D5DB';
            }}
            className="w-full h-12 px-4 rounded-lg border bg-white transition text-[17px]"
          >
            {entities.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-[16px] text-gray-700 mb-2 font-semibold">
            {t.documentCategory} <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.documentCategory}
            onChange={(e) =>
              setFormData({ ...formData, documentCategory: e.target.value })
            }
            style={{ 
              fontFamily,
              borderColor: errors.documentCategory ? '#DC2626' : '#D1D5DB',
            }}
            onFocus={(e) => {
              if (!errors.documentCategory) e.currentTarget.style.borderColor = legislationColors.primary;
            }}
            onBlur={(e) => {
              if (!errors.documentCategory) e.currentTarget.style.borderColor = '#D1D5DB';
            }}
            className="w-full h-12 px-4 rounded-lg border bg-white transition text-[17px]"
          >
            {documentCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 2 - Title */}
      <div>
        <label className="block text-[16px] text-gray-700 mb-2 font-semibold">
          {t.title} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          placeholder={t.titlePlaceholder}
          style={{ 
            fontFamily,
            borderColor: errors.title ? '#DC2626' : '#D1D5DB',
          }}
          onFocus={(e) => {
            if (!errors.title) e.currentTarget.style.borderColor = legislationColors.primary;
          }}
          onBlur={(e) => {
            if (!errors.title) e.currentTarget.style.borderColor = '#D1D5DB';
          }}
          className="w-full h-12 px-4 rounded-lg border transition text-[17px]"
        />
      </div>
    </section>

    {/* ================= File Upload ================= */}
    <section className="space-y-4">
      <h2 className="text-[22px] font-bold text-[#1d293d]" style={{ fontFamily }}>
        {t.uploadFile}
      </h2>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          borderColor: isDragging ? legislationColors.primary : '#D1D5DB',
          backgroundColor: isDragging ? `${legislationColors.primary}10` : '#fafafa',
        }}
        className="relative rounded-xl border transition"
      >
        <input
          type="file"
          accept=".pdf"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        />

        <div className="py-14 text-center space-y-2">
          <Upload 
            className="mx-auto h-10 w-10" 
            style={{ color: legislationColors.accent }}
          />
          <p 
            className="text-[17px] text-[#1d293d]" 
            style={{ 
              fontFamily,
              fontWeight: 600 
            }}
          >
            {formData.file ? formData.file.name : t.chooseFile}
          </p>
          <p 
            className="text-[15px] text-gray-500"
            style={{ fontFamily }}
          >
            {t.dragDrop}
          </p>
        </div>
      </div>
    </section>

    {/* ================= Classification ================= */}
    <section className="space-y-4">
      <h2 className="text-[22px] font-bold text-[#1d293d]" style={{ fontFamily }}>
        {t.classification}
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {['public', 'Secret'].map((type) => (
          <label
            key={type}
            style={{
              borderColor: formData.classification === type ? legislationColors.primary : '#D1D5DB',
              backgroundColor: formData.classification === type ? `${legislationColors.primary}08` : 'transparent',
            }}
            className="p-6 rounded-xl border cursor-pointer transition hover:bg-gray-50"
          >
            <input
              type="radio"
              name="classification"
              checked={formData.classification === type}
              onChange={() =>
                setFormData({ ...formData, classification: type })
              }
              className="me-3"
            />
            <span 
              className="text-[17px] text-[#1d293d]"
              style={{ 
                fontFamily,
                fontWeight: 600 
              }}
            >
              {type === 'public' ? t.public : t.secret}
            </span>
            <p 
              className="mt-1 text-[15px] text-gray-600"
              style={{ fontFamily }}
            >
              {type === 'public' ? t.publicDesc : t.secretDesc}
            </p>
          </label>
        ))}
      </div>
    </section>

    {/* ================= Actions ================= */}
    <div className="flex gap-6 pt-10 border-t border-gray-200">
      <button
        type="submit"
        style={{
          backgroundColor: legislationColors.accent,
          fontFamily,
          fontWeight: 600,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#B8933D';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = legislationColors.accent;
        }}
        className="h-12 px-10 rounded-lg text-white transition"
      >
        {t.saveDocument}
      </button>

      <button
        type="button"
        onClick={onBack}
        style={{ fontFamily, fontWeight: 600 }}
        className="h-12 px-10 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
      >
        {t.cancel}
      </button>
    </div>

  </form>
</div>
 
    </div>
  );
}