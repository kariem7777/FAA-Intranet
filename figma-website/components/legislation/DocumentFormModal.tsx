import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { Button } from '../ui/button';

interface DocumentFormModalProps {
  document?: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (document: any) => void;
  language: string;
  entities: any[];
}

export function DocumentFormModal({ document, isOpen, onClose, onSave, language, entities }: DocumentFormModalProps) {
  const isArabic = language === 'ar';
  const isEditMode = !!document;

  const [formData, setFormData] = useState({
    nameEn: '',
    nameAr: '',
    title: '',
    lawNumber: '',
    entity: '',
    issueDate: '',
    effectiveDate: '',
    gazette: '',
    issuingAuthority: '',
    description: '',
    date: '',
    category: '',
    status: 'active',
    classification: 'public',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (document) {
      setFormData({
        nameEn: document.nameEn || '',
        nameAr: document.nameAr || '',
        title: document.title || document.nameEn || document.nameAr || '',
        lawNumber: document.lawNumber || '',
        entity: document.entity || '',
        issueDate: document.issueDate || '',
        effectiveDate: document.effectiveDate || '',
        gazette: document.gazette || '',
        issuingAuthority: document.issuingAuthority || '',
        description: document.description || '',
        date: document.date || '',
        category: document.category || '',
        status: document.status || 'active',
        classification: document.classification || 'public',
      });
    } else {
      setFormData({
        nameEn: '',
        nameAr: '',
        title: '',
        lawNumber: '',
        entity: '',
        issueDate: '',
        effectiveDate: '',
        gazette: '',
        issuingAuthority: '',
        description: '',
        date: '',
        category: '',
        status: 'active',
        classification: 'public',
      });
      setSelectedFile(null);
    }
  }, [document, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      nameEn: formData.title,
      nameAr: formData.title,
      id: document?.id || Date.now(),
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Check file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert(isArabic ? 'حجم الملف يجب أن يكون أقل من 10 ميجابايت' : 'File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  if (!isOpen) return null;

  const content = {
    en: {
      addTitle: 'Add New Document',
      editTitle: 'Edit Document',
      entity: 'Entity',
      category: 'Category',
      title: 'Title',
      classification: 'Document Classification',
      public: 'Public',
      secret: 'Secret',
      uploadFile: 'Upload File',
      chooseFile: 'Choose File',
      supportedFiles: 'Supported files: PDF (Max 10MB)',
      cancel: 'Cancel',
      saveChanges: 'Save Changes',
      addDocument: 'Add Document',
      required: '*',
      placeholderTitle: 'Enter document title',
      selectEntity: 'Select an entity',
      selectCategory: 'Select a category',
    },
    ar: {
      addTitle: 'إضافة مستند جديد',
      editTitle: 'تعديل المستند',
      entity: 'الجهة',
      category: 'الفئة',
      title: 'العنوان',
      classification: 'تصنيف المستند',
      public: 'عام',
      secret: 'سري',
      uploadFile: 'رفع ملف',
      chooseFile: 'اختر ملف',
      supportedFiles: 'الملفات المدعومة: PDF (بحد أقصى 10 ميجابايت)',
      cancel: 'إلغاء',
      saveChanges: 'حفظ التغييرات',
      addDocument: 'إضافة مستند',
      required: '*',
      placeholderTitle: 'أدخل عنوان المستند',
      selectEntity: 'اختر الجهة',
      selectCategory: 'اختر الفئة',
    },
  };

  const t = content[language as 'en' | 'ar'];

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{ 
        fontFamily: isArabic ? 'var(--font-family-ar)' : 'var(--font-family-en)',
      }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10 rounded-t-2xl"
          style={{
            borderColor: '#D1D5DB',
          }}
        >
          <h2
            className="text-gray-900"
            style={{
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            {isEditMode ? t.editTitle : t.addTitle}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            {/* Entity */}
            <div>
              <label
                className="block text-gray-700 mb-2"
                style={{
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                {t.entity} <span className="text-red-600">{t.required}</span>
              </label>
              <select
                value={formData.entity}
                onChange={(e) => setFormData({ ...formData, entity: e.target.value })}
                required
                className="w-full h-11 px-4 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#7b282d] focus:border-transparent"
                style={{
                  borderColor: '#D1D5DB',
                  fontSize: 'var(--font-size-sm)',
                }}
              >
                <option value="">{t.selectEntity}</option>
                {entities.map((entity) => (
                  <option key={entity.id} value={entity.nameEn}>
                    {isArabic ? entity.nameAr : entity.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label
                className="block text-gray-700 mb-2"
                style={{
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                {t.category} <span className="text-red-600">{t.required}</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full h-11 px-4 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#7b282d] focus:border-transparent"
                style={{
                  borderColor: '#D1D5DB',
                  fontSize: 'var(--font-size-sm)',
                }}
              >
                <option value="">{t.selectCategory}</option>
                <option value="1">{isArabic ? 'تشريعات الجهة' : "Entity's Legislation"}</option>
                <option value="2">{isArabic ? 'التشريعات الاتحادية' : 'Federal Legislation'}</option>
                <option value="3">{isArabic ? 'التشريعات المحلية' : 'Local Legislation'}</option>
                <option value="4">{isArabic ? 'الرأي القانوني للجنة العليا' : "Supreme Committee's Legal Opinion"}</option>
                <option value="5">{isArabic ? 'الآراء القانونية للجهاز' : 'FAA Legal Opinions'}</option>
                <option value="6">{isArabic ? 'تشريعات الجهاز' : "FAA's Legislation"}</option>
              </select>
            </div>

            {/* Title */}
            <div>
              <label
                className="block text-gray-700 mb-2"
                style={{
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                {t.title} <span className="text-red-600">{t.required}</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder={t.placeholderTitle}
                required
                className="w-full h-11 px-4 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#7b282d] focus:border-transparent"
                style={{
                  borderColor: '#D1D5DB',
                  fontSize: 'var(--font-size-sm)',
                }}
              />
            </div>

            {/* File Upload */}
            <div>
              <label
                className="block text-gray-700 mb-2"
                style={{
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                {t.uploadFile} {!isEditMode && <span className="text-red-600">{t.required}</span>}
              </label>
              <div
                className="border-2 border-dashed rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                style={{ borderColor: '#D1D5DB' }}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <Upload size={32} className="mx-auto mb-3 text-gray-400" />
                <p className="text-gray-700 mb-1" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                  {selectedFile ? selectedFile.name : t.chooseFile}
                </p>
                <p className="text-gray-500" style={{ fontSize: 'var(--font-size-xs)' }}>
                  {t.supportedFiles}
                </p>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  required={!isEditMode}
                />
              </div>
            </div>

            {/* Document Classification */}
            <div>
              <label
                className="block text-gray-700 mb-2"
                style={{
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                {t.classification}
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="classification"
                    value="public"
                    checked={formData.classification === 'public'}
                    onChange={(e) => setFormData({ ...formData, classification: e.target.value as 'public' | 'secret' })}
                    className="w-4 h-4 text-[#7b282d] border-gray-300 "
                  />
                  <span className="text-gray-700" style={{ fontSize: 'var(--font-size-sm)' }}>
                    {t.public}
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="classification"
                    value="secret"
                    checked={formData.classification === 'secret'}
                    onChange={(e) => setFormData({ ...formData, classification: e.target.value as 'public' | 'secret' })}
                    className="w-4 h-4 text-[#7b282d] border-gray-300 "
                  />
                  <span className="text-gray-700" style={{ fontSize: 'var(--font-size-sm)' }}>
                    {t.secret}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="mt-6 pt-6 border-t flex items-center justify-end gap-3" style={{ borderColor: '#E5E7EB' }}>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-11 px-6 border bg-white hover:bg-gray-50"
              style={{
                borderColor: '#D1D5DB',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              {t.cancel}
            </Button>
            <Button
              type="submit"
              className="h-11 px-6 text-white"
              style={{
                backgroundColor: '#7b282d',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-semibold)',
              }}
            >
              {isEditMode ? t.saveChanges : t.addDocument}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}