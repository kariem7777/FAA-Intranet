// ============================================================================
// ENTITIES - Shared across all services
// ============================================================================
export const MOCK_ENTITIES = [
  { id: 'rta', nameAr: 'هيئة الطرق والمواصلات', nameEn: 'Roads and Transport Authority' },
  { id: 'dha', nameAr: 'هيئة الصحة', nameEn: 'Health Authority' },
  { id: 'dewa', nameAr: 'هيئة كهرباء ومياه دبي', nameEn: 'Dubai Electricity and Water Authority' },
  { id: 'dld', nameAr: 'دائرة الأراضي والأملاك', nameEn: 'Dubai Land Department' },
  { id: 'ded', nameAr: 'دائرة التنمية الاقتصادية', nameEn: 'Department of Economic Development' },
  { id: 'ddf', nameAr: 'دائرة المالية', nameEn: 'Department of Finance' },
  { id: 'khda', nameAr: 'هيئة المعرفة والتنمية البشرية', nameEn: 'Knowledge and Human Development Authority' },
  { id: 'shjm', nameAr: 'بلدية الشارقة', nameEn: 'Sharjah Municipality' },
  { id: 'adcb', nameAr: 'بنك أبوظبي التجاري', nameEn: 'Abu Dhabi Commercial Bank' },
  { id: 'faa', nameAr: 'جهاز الرقابة المالية', nameEn: 'Financial Audit Authority' },
] as const;

// ============================================================================
// LEGISLATION CATEGORIES & GROUPS
// ============================================================================
export const LEGISLATION_GROUPS = {
  entityLegislation: {
    id: 1,
    key: 'entityLegislation',
    titleEn: "Entity's Legislation",
    titleAr: "تشريعات الجهات الخاضعة",
    categories: [
      { id: 1, name: 'Establishment Law', nameEn: 'Establishment Law', nameAr: 'الإنشاء', count: 45 },
      { id: 2, name: 'Financial Legislation', nameEn: 'Financial Legislation', nameAr: 'التشريعات المالية', count: 182 },
      { id: 3, name: 'Governance', nameEn: 'Governance', nameAr: 'الحوكمة', count: 98 },
      { id: 4, name: 'Contracts and Purchasing', nameEn: 'Contracts and Purchasing', nameAr: 'العقود والمشتريات', count: 67 },
      { id: 5, name: 'Human Resources', nameEn: 'Human Resources', nameAr: 'الموارد البشرية', count: 54 },
      { id: 6, name: 'Tasks of the entity', nameEn: 'Tasks of the entity', nameAr: 'مهام الجهة', count: 38 },
    ],
  },
  federalLegislation: {
    id: 2,
    key: 'federalLegislation',
    titleEn: 'Federal Legislation',
    titleAr: 'التشريعات الاتحادية',
    categories: [
      { id: 1, name: 'laws', nameEn: 'Federal Laws', nameAr: 'القوانين الاتحادية', count: 125 },
      { id: 2, name: 'resolutions', nameEn: 'Cabinet Resolutions', nameAr: 'قرارات مجلس الوزراء', count: 89 },
      { id: 3, name: 'decrees', nameEn: 'Presidential Decrees', nameAr: 'المراسيم الرئاسية', count: 56 },
    ],
  },
  localLegislation: {
    id: 3,
    key: 'localLegislation',
    titleEn: 'Local Legislation',
    titleAr: 'التشريعات المحلية',
    categories: [
      { id: 1, name: 'emiratiLaws', nameEn: 'Emirati Laws', nameAr: 'القوانين المحلية', count: 164 },
      { id: 2, name: 'executiveCouncil', nameEn: 'Executive Council Resolutions', nameAr: 'قرارات المجلس التنفيذي', count: 112 },
      { id: 3, name: 'rulerDecrees', nameEn: 'Ruler Decrees', nameAr: 'مراسيم الحاكم', count: 89 },
    ],
  },
  supremeCommittee: {
    id: 4,
    key: 'supremeCommittee',
    titleEn: "Supreme Committee's Legal Opinion",
    titleAr: 'فتاوى اللجنة العليا للتشريعات',
    categories: [],
  },
  faaLegalOpinions: {
    id: 5,
    key: 'faaLegalOpinions',
    titleEn: 'FAA Legal Opinions',
    titleAr: 'الآراء القانونية للجهاز',
    categories: [],
  },
  faaLegislation: {
    id: 6,
    key: 'faaLegislation',
    titleEn: "FAA's Legislation",
    titleAr: "تشريعات الجهاز",
    categories: [
      { id: 1, name: 'regulations', nameEn: 'Regulations', nameAr: 'اللوائح', count: 45 },
      { id: 2, name: 'policies', nameEn: 'Policies', nameAr: 'السياسات', count: 38 },
      { id: 3, name: 'procedures', nameEn: 'Procedures', nameAr: 'الإجراءات', count: 29 },
    ],
  },
} as const;


// ============================================================================
// BASE DOCUMENTS - Core documents used across services
// ============================================================================
export const MOCK_DOCUMENTS = [
  {
    id: 1,
    title: 'Federal Law No. 7 of 2017',
    titleAr: 'القانون الاتحادي رقم 7 لسنة 2017',
    entity: 'Federal Government',
    entityId: 'federal',
    legislation: 'federalLegislation',
    category: 'laws',
    uploadDate: '2024-01-15',
    uploadedBy: 'Ahmed Mohammed',
    classification: 'public' as const,
    fileSize: '2.4 MB',
    fileType: 'PDF',
    pdfUrl: 'https://dlp.dubai.gov.ae/Legislation%20Ar%20Reference/2025/%D9%85%D8%B1%D8%B3%D9%88%D9%85%20%D8%B1%D9%82%D9%85%20(52)%20%D9%84%D8%B3%D9%86%D8%A9%202025%20%D8%A8%D8%B4%D8%A3%D9%86%20%D8%A5%D9%86%D8%B4%D8%A7%D8%A1%20%D9%85%D9%86%D8%B7%D9%82%D8%A9%20%D8%AD%D8%B1%D8%A9%20%D9%81%D9%8A%20%D8%A5%D9%85%D8%A7%D8%B1%D8%A9%20%D8%AF%D8%A8%D9%8A.pdf',
    referenceNumber: 'FED/LAW/2017/007',
    year: 2017,
    issueDate: '2017-09-15',
  },
  {
    id: 2,
    title: 'Cabinet Resolution No. 23 of 2023',
    titleAr: 'قرار مجلس الوزراء رقم 23 لسنة 2023',
    entity: 'Cabinet',
    entityId: 'cabinet',
    legislation: 'federalLegislation',
    category: 'resolutions',
    uploadDate: '2024-02-20',
    uploadedBy: 'Fatima Ali',
    classification: 'secret' as const,
    fileSize: '1.8 MB',
    fileType: 'PDF',
    pdfUrl: 'https://dlp.dubai.gov.ae/Legislation%20Ar%20Reference/2025/%D9%85%D8%B1%D8%B3%D9%88%D9%85%20%D8%B1%D9%82%D9%85%20(52)%20%D9%84%D8%B3%D9%86%D8%A9%202025%20%D8%A8%D8%B4%D8%A3%D9%86%20%D8%A5%D9%86%D8%B4%D8%A7%D8%A1%20%D9%85%D9%86%D8%B7%D9%82%D8%A9%20%D8%AD%D8%B1%D8%A9%20%D9%81%D9%8A%20%D8%A5%D9%85%D8%A7%D8%B1%D8%A9%20%D8%AF%D8%A8%D9%8A.pdf',
    referenceNumber: 'CAB/RES/2023/023',
    year: 2023,
    issueDate: '2023-11-20',
  },
  {
    id: 3,
    title: 'Abu Dhabi Law No. 12 of 2023',
    titleAr: 'قانون أبوظبي رقم 12 لسنة 2023',
    entity: 'Abu Dhabi Government',
    entityId: 'adgov',
    legislation: 'localLegislation',
    category: 'emiratiLaws',
    uploadDate: '2024-03-10',
    uploadedBy: 'Salem Khaled',
    classification: 'public' as const,
    fileSize: '3.2 MB',
    fileType: 'PDF',
    pdfUrl: 'https://dlp.dubai.gov.ae/Legislation%20Ar%20Reference/2025/%D9%85%D8%B1%D8%B3%D9%88%D9%85%20%D8%B1%D9%82%D9%85%20(52)%20%D9%84%D8%B3%D9%86%D8%A9%202025%20%D8%A8%D8%B4%D8%A3%D9%86%20%D8%A5%D9%86%D8%B4%D8%A7%D8%A1%20%D9%85%D9%86%D8%B7%D9%82%D8%A9%20%D8%AD%D8%B1%D8%A9%20%D9%81%D9%8A%20%D8%A5%D9%85%D8%A7%D8%B1%D8%A9%20%D8%AF%D8%A8%D9%8A.pdf',
    referenceNumber: 'AD/LAW/2023/012',
    year: 2023,
    issueDate: '2023-08-10',
  },
  {
    id: 4,
    title: 'Legal Opinion No. 145 of 2024',
    titleAr: 'الرأي القانوني رقم 145 لسنة 2024',
    entity: 'Financial Audit Authority',
    entityId: 'faa',
    legislation: 'supremeCommittee',
    category: 'all',
    uploadDate: '2024-04-05',
    uploadedBy: 'Mariam Saeed',
    classification: 'secret' as const,
    fileSize: '1.5 MB',
    fileType: 'PDF',
    pdfUrl: 'https://dlp.dubai.gov.ae/Legislation%20Ar%20Reference/2025/%D9%85%D8%B1%D8%B3%D9%88%D9%85%20%D8%B1%D9%82%D9%85%20(52)%20%D9%84%D8%B3%D9%86%D8%A9%202025%20%D8%A8%D8%B4%D8%A3%D9%86%20%D8%A5%D9%86%D8%B4%D8%A7%D8%A1%20%D9%85%D9%86%D8%B7%D9%82%D8%A9%20%D8%AD%D8%B1%D8%A9%20%D9%81%D9%8A%20%D8%A5%D9%85%D8%A7%D8%B1%D8%A9%20%D8%AF%D8%A8%D9%8A.pdf',
    referenceNumber: 'SC/OPN/2024/145',
    year: 2024,
    issueDate: '2024-03-05',
  },
  {
    id: 5,
    title: 'Authority Decision No. 8 of 2024',
    titleAr: 'قرار الجهاز رقم 8 لسنة 2024',
    entity: 'Financial Audit Authority',
    entityId: 'faa',
    legislation: 'faaLegislation',
    category: 'regulations',
    uploadDate: '2024-05-12',
    uploadedBy: 'Youssef Hassan',
    classification: 'public' as const,
    fileSize: '2.1 MB',
    fileType: 'PDF',
    pdfUrl: 'https://dlp.dubai.gov.ae/Legislation%20Ar%20Reference/2025/%D9%85%D8%B1%D8%B3%D9%88%D9%85%20%D8%B1%D9%82%D9%85%20(52)%20%D9%84%D8%B3%D9%86%D8%A9%202025%20%D8%A8%D8%B4%D8%A3%D9%86%20%D8%A5%D9%86%D8%B4%D8%A7%D8%A1%20%D9%85%D9%86%D8%B7%D9%82%D8%A9%20%D8%AD%D8%B1%D8%A9%20%D9%81%D9%8A%20%D8%A5%D9%85%D8%A7%D8%B1%D8%A9%20%D8%AF%D8%A8%D9%8A.pdf',
    referenceNumber: 'FAA/DEC/2024/008',
    year: 2024,
    issueDate: '2024-04-12',
  },
  {
    id: 6,
    title: 'Internal Regulation No. 3 of 2024',
    titleAr: 'اللائحة الداخلية رقم 3 لسنة 2024',
    entity: 'Abu Dhabi Commercial Bank',
    entityId: 'adcb',
    legislation: 'entityLegislation',
    category: 'policies',
    uploadDate: '2024-06-01',
    uploadedBy: 'Khaled Ahmed',
    classification: 'secret' as const,
    fileSize: '1.9 MB',
    fileType: 'PDF',
    pdfUrl: 'https://dlp.dubai.gov.ae/Legislation%20Ar%20Reference/2025/%D9%85%D8%B1%D8%B3%D9%88%D9%85%20%D8%B1%D9%82%D9%85%20(52)%20%D9%84%D8%B3%D9%86%D8%A9%202025%20%D8%A8%D8%B4%D8%A3%D9%86%20%D8%A5%D9%86%D8%B4%D8%A7%D8%A1%20%D9%85%D9%86%D8%B7%D9%82%D8%A9%20%D8%AD%D8%B1%D8%A9%20%D9%81%D9%8A%20%D8%A5%D9%85%D8%A7%D8%B1%D8%A9%20%D8%AF%D8%A8%D9%8A.pdf',
    referenceNumber: 'ADCB/REG/2024/003',
    year: 2024,
    issueDate: '2024-05-01',
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function generateMockDocument(
  id: number,
  overrides?: Partial<typeof MOCK_DOCUMENTS[0]>
): typeof MOCK_DOCUMENTS[0] {
  const template = MOCK_DOCUMENTS[id % MOCK_DOCUMENTS.length];
  const entity = MOCK_ENTITIES[id % MOCK_ENTITIES.length];
  const year = 2020 + (id % 5);

  return {
    id,
    title: `${template.title} (${year})`,
    titleAr: `${template.titleAr} (${year})`,
    entity: entity.nameEn,
    entityId: entity.id,
    legislation: 'entityLegislation',
    category: 'policies',
    uploadDate: `${year}-${String((id % 12) + 1).padStart(2, '0')}-15`,
    uploadedBy: 'System Administrator',
    classification: (id % 2 === 0 ? 'public' : 'secret') as 'public' | 'secret',
    fileSize: `${(1.5 + (id % 3)).toFixed(1)} MB`,
    fileType: 'PDF',
    referenceNumber: `${entity.id.toUpperCase()}/${year}/${String(id).padStart(3, '0')}`,
    year,
    issueDate: `${year}-${String((id % 12) + 1).padStart(2, '0')}-15`,
    pdfUrl: 'https://dlp.dubai.gov.ae/Legislation%20Ar%20Reference/2025/%D9%85%D8%B1%D8%B3%D9%88%D9%85%20%D8%B1%D9%82%D9%85%20(52)%20%D9%84%D8%B3%D9%86%D8%A9%202025%20%D8%A8%D8%B4%D8%A3%D9%86%20%D8%A5%D9%86%D8%B4%D8%A7%D8%A1%20%D9%85%D9%86%D8%B7%D9%82%D8%A9%20%D8%AD%D8%B1%D8%A9%20%D9%81%D9%8A%20%D8%A5%D9%85%D8%A7%D8%B1%D8%A9%20%D8%AF%D8%A8%D9%8A.pdf',
    ...overrides,
  };
}

export function findEntity(entityId: string) {
  return MOCK_ENTITIES.find(e => e.id === entityId);
}

export function getLegislationGroup(idOrKey: number | string) {
  if (typeof idOrKey === 'number') {
    return Object.values(LEGISLATION_GROUPS).find(g => g.id === idOrKey);
  }
  return LEGISLATION_GROUPS[idOrKey as keyof typeof LEGISLATION_GROUPS];
}
