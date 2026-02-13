export type DashboardTab = 'cases' | 'documents';

export interface DashboardFilters {
    quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
    year: number;
}
export interface CaseStatusData {
    status: string;
    count: number;
}
export interface DepartmentInquiry {
    departmentId: number;
    departmentName: string;
    count: number;
}
export interface ConversationMetric {
    name: string;
    value: number;
}
export interface RecentCase {
    departmentEn: string;
    departmentAr: string;
    title: string;
    conversationLength: number;
    timeLength: string;
    status: string;
}
export interface EnquiriesMetrics {
    caseStatusMetrics: CaseStatusData[];
    departmentMetrics: DepartmentInquiry[];
    conversationMetrics: ConversationMetric[];
    recentCases: RecentCase[];
}
export interface QuarterUploadData {
    year: number;
    quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
    count: number;
    percentage: number;
}
export interface CategoryDocumentData {
    categoryId: number;
    categoryName: string;
    count: number;
}
export interface EntityDocumentData {
    entityId: number;
    entityName: string;
    count: number;
}
export interface LegislationMetrics {
    totalDocuments: number;
    averageDocsPerCategory: number;
    uploadTrendByQuarter: QuarterUploadData[];
    documentsByCategory: CategoryDocumentData[];
    documentsByEntity: EntityDocumentData[];
}
