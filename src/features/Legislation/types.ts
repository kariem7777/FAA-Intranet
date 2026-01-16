export interface LegislationDocument {
  id: number;
  title: string;
  titleAr: string;
  referenceNumber: string;
  year: number;
  classification: 'public' | 'secret';
  entityId: string;
  entityName: string;
  entityNameAr: string;
  category: string;
  issueDate: string;
  pdfUrl: string;
}

export interface LegislationCategory {
  id: number;
  name: string; // The base name, might need handling for localization in the component
  nameEn?: string; // If we want explicit split
  nameAr?: string;
  count: number;
}

export interface LegislationCategoryGroup {
  id: number; // The top level group ID (e.g., 1, 2, 3...)
  titleEn: string;
  titleAr: string;
  categories: LegislationCategory[];
}

export interface LegislationEntity {
  id: string;
  nameAr: string;
  nameEn: string;
}

export interface LegislationFiltersState {
    searchQuery: string;
    selectedEntity: string;
    selectedCategory: number | null; // ID of the sub-category
    entitySearchQuery: string;
}

export type DashboardTab = 'overview' | 'cases' | 'documents';

export interface DashboardFilters {
    quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
    year: number;
}

// Re-export legal opinions types
export * from './types/legalOpinions.types';

export interface CaseStatusData {
    name: string;
    nameAr: string;
    value: number;
    color: string;
    filter?: 'new' | 'replied' | 'closed';
}

export interface SLAMetric {
    label: string;
    value: number;
    percentage: number;
    color: string;
}

export interface ConversationMetric {
    label: string;
    value: string;
    unit: string;
    color: string;
    bgColor: string;
    trend?: string;
}

export interface MonthlyTrendData {
    month: string;
    monthAr: string;
    received: number;
    closed: number;
    new: number;
}

export interface DepartmentInquiry {
    nameEn: string;
    nameAr: string;
    code: string;
    inquiries: number;
    color: string;
}

export interface RecentCase {
    id: number;
    opinionId: number;
    department: string;
    departmentAr: string;
    title: string;
    titleAr: string;
    status: 'new' | 'replied' | 'closed';
    daysOpen: number;
    priority: 'high' | 'medium' | 'low';
    conversationLength: number;
    totalDays: number;
}

export interface DocumentStatistic {
    label: string;
    labelAr: string;
    value: string;
    change: string;
    color: string;
    bgColor: string;
}

export interface CategoryDocumentData {
    nameEn: string;
    nameAr: string;
    count: number;
    color: string;
}

export interface EntityDocumentData {
    nameEn: string;
    nameAr: string;
    count: number;
    color: string;
}

export interface QuarterUploadData {
    quarter: string;
    quarterAr: string;
    value: number;
    color: string;
}
