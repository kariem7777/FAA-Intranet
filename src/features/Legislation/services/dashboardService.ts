import { BaseApiService } from '@/shared/api/BaseApiService';
import type { ApiResponse } from '@/shared/api/types';
import type {
  CaseStatusData,
  SLAMetric,
  ConversationMetric,
  MonthlyTrendData,
  DepartmentInquiry,
  RecentCase,
  DocumentStatistic,
  CategoryDocumentData,
  EntityDocumentData,
  QuarterUploadData,
  DashboardFilters,
} from '../types';
import { MOCK_DOCUMENTS, MOCK_ENTITIES, LEGISLATION_GROUPS } from './mockData';

export interface CasesOverviewResponse {
  caseStatusData: CaseStatusData[];
  slaMetrics: SLAMetric[];
  conversationMetrics: ConversationMetric[];
  monthlyTrendData: MonthlyTrendData[];
}

export interface DocumentsOverviewResponse {
  documentStats: DocumentStatistic[];
  categoryData: CategoryDocumentData[];
  entityData: EntityDocumentData[];
  quarterData: QuarterUploadData[];
}

export class DashboardService extends BaseApiService {

  // Mock Data for Cases
  private getCasesData(): CaseStatusData[] {
    return [
      { name: 'Received', nameAr: 'اجمالي الإستعلامات', value: 856, color: '#2F4F6F', filter: undefined },
      { name: 'New', nameAr: 'الإستعلامات الجديدة', value: 114, color: '#F59E0B', filter: 'new' },
      { name: 'In Progress', nameAr: 'قيد المعالجة', value: 742, color: '#2563EB', filter: 'replied' },
      { name: 'Closed', nameAr: 'الإستعلامات المغلقة', value: 23, color: '#16A34A', filter: 'closed' },
    ];
  }

  private getSLAMetrics(): SLAMetric[] {
    return [
      { label: 'Within SLA', value: 810, percentage: 94.5, color: '#16A34A' },
      { label: 'Breached SLA', value: 46, percentage: 5.5, color: '#DC2626' },
    ];
  }

  private getConversationMetrics(): ConversationMetric[] {
    return [
      { label: 'Avg. Conversation Length', value: '4.2', unit: 'messages', color: '#8B5CF6', bgColor: 'rgba(139, 92, 246, 0.1)', trend: '+0.3' },
      { label: 'Avg. Time to Close', value: '5.8', unit: 'days', color: '#3B82F6', bgColor: 'rgba(59, 130, 246, 0.1)', trend: '-1.2' },
      { label: 'Longest Conversation', value: '12', unit: 'messages', color: '#F59E0B', bgColor: 'rgba(245, 158, 11, 0.1)' },
      { label: 'Shortest Resolution', value: '2', unit: 'days', color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.1)' },
    ];
  }

  private getMonthlyTrend(): MonthlyTrendData[] {
    return [
      { month: 'Oct', monthAr: 'أكتوبر', received: 789, closed: 720, new: 105 },
      { month: 'Nov', monthAr: 'نوفمبر', received: 812, closed: 765, new: 98 },
      { month: 'Dec', monthAr: 'ديسمبر', received: 856, closed: 810, new: 114 },
    ];
  }

  private getDepartments(): DepartmentInquiry[] {
    return [
      { nameEn: 'Roads and Transport Authority', nameAr: 'هيئة النقل والمواصلات', code: 'RTA', inquiries: 142, color: '#971b1e' },
      { nameEn: 'Health Authority', nameAr: 'هيئة الصحة', code: 'DHA', inquiries: 118, color: '#064368' },
      { nameEn: 'Department of Finance', nameAr: 'دائرة المالية', code: 'DOF', inquiries: 105, color: '#01949a' },
      { nameEn: 'Dubai Land Department', nameAr: 'دائرة الأراضي والأملاك', code: 'DLD', inquiries: 89, color: '#908e81' },
      { nameEn: 'Department of Economic Development', nameAr: 'دائرة التنمية الاقتصادية', code: 'DED', inquiries: 76, color: '#513a40' },
      { nameEn: 'Knowledge and Human Development Authority', nameAr: 'هيئة المعرفة والتنمية البشرية', code: 'KHDA', inquiries: 68, color: '#7d5a44' },
      { nameEn: 'Dubai Electricity and Water Authority', nameAr: 'هيئة كهرباء ومياه دبي', code: 'DEWA', inquiries: 54, color: '#2a5c6f' },
      { nameEn: 'Sharjah Municipality', nameAr: 'بلدية الشارقة', code: 'SHJ', inquiries: 42, color: '#b8927d' },
    ];
  }

  private getRecentCasesData(): RecentCase[] {
    return [
      { id: 1, opinionId: 1, department: 'Roads and Transport Authority', departmentAr: 'هيئة النقل والمواصلات', title: 'Enquiry regarding procurement regulations', titleAr: 'استفسار بخصوص لائحة المشتريات', status: 'replied', daysOpen: 2, priority: 'high', conversationLength: 5, totalDays: 10 },
      { id: 2, opinionId: 2, department: 'Health Authority', departmentAr: 'هيئة الصحة', title: 'Enquiry on IFRS implementation', titleAr: 'استفسار حول تطبيق معايير المحاسبة الدولية', status: 'new', daysOpen: 1, priority: 'medium', conversationLength: 1, totalDays: 3 },
      { id: 3, opinionId: 3, department: 'Dubai Electricity and Water Authority', departmentAr: 'هيئة كهرباء ومياه دبي', title: 'Enquiry on capital project financial procedures', titleAr: 'استفسار عن الإجراءات المالية للمشاريع الرأسمالية', status: 'new', daysOpen: 5, priority: 'high', conversationLength: 1, totalDays: 5 },
      { id: 4, opinionId: 4, department: 'Dubai Land Department', departmentAr: 'دائرة الأراضي والأملاك', title: 'Enquiry on disbursement controls', titleAr: 'استفسار حول ضوابط الصرف', status: 'closed', daysOpen: 3, priority: 'low', conversationLength: 2, totalDays: 5 },
    ];
  }

  // Calculate document statistics from actual mock data
  private getDocumentStats(): DocumentStatistic[] {
    const totalDocs = MOCK_DOCUMENTS.length;
    const categoriesCount = Object.values(LEGISLATION_GROUPS).reduce((sum, group) => sum + group.categories.length, 0);
    const avgDocsPerCategory = categoriesCount > 0 ? Math.round(totalDocs / categoriesCount) : 0;

    return [
      { label: 'Total Documents', labelAr: 'إجمالي الوثائق', value: totalDocs.toString(), change: '+12%', color: '#8B272D', bgColor: 'rgba(139, 39, 45, 0.1)' },
      { label: 'Avg. Docs per Category', labelAr: 'متوسط الوثائق لكل فئة', value: avgDocsPerCategory.toString(), change: '+15%', color: '#16A34A', bgColor: 'rgba(22, 163, 74, 0.1)' },
    ];
  }

  // Calculate category data from actual mock documents
  private getCategoryData(): CategoryDocumentData[] {
    const colors = ['#971b1e', '#064368', '#01949a', '#908e81', '#513a40', '#7d5a44'];
    
    return Object.values(LEGISLATION_GROUPS).map((group, index) => {
      const count = MOCK_DOCUMENTS.filter(doc => doc.legislation === group.key).length;
      return {
        nameEn: group.titleEn,
        nameAr: group.titleAr,
        count: count > 0 ? count : Math.floor(Math.random() * 200) + 50, // Use real count or generate if no docs
        color: colors[index % colors.length],
      };
    });
  }

  // Calculate entity data from actual mock entities and documents
  private getEntityData(): EntityDocumentData[] {
    const colors = ['#971b1e', '#064368', '#01949a', '#908e81', '#513a40', '#7d5a44', '#2a5c6f', '#b8927d', '#6d4c56', '#3d7680'];
    
    return MOCK_ENTITIES.map((entity, index) => {
      const count = MOCK_DOCUMENTS.filter(doc => doc.entityId === entity.id).length;
      return {
        nameEn: entity.nameEn,
        nameAr: entity.nameAr,
        count: count > 0 ? count : Math.floor(Math.random() * 150) + 50, // Use real count or generate if no docs
        color: colors[index % colors.length],
      };
    });
  }

  // Calculate quarter data from actual document upload dates
  private getQuarterData(): QuarterUploadData[] {
    const quarters = [
      { quarter: 'Q1', quarterAr: 'الربع 1', value: 0, color: '#DC2626' },
      { quarter: 'Q2', quarterAr: 'الربع 2', value: 0, color: '#2563EB' },
      { quarter: 'Q3', quarterAr: 'الربع 3', value: 0, color: '#16A34A' },
      { quarter: 'Q4', quarterAr: 'الربع 4', value: 0, color: '#F59E0B' },
    ];

    // Count documents by quarter based on upload date
    MOCK_DOCUMENTS.forEach(doc => {
      const month = parseInt(doc.uploadDate.split('-')[1]);
      const quarterIndex = Math.floor((month - 1) / 3);
      if (quarterIndex >= 0 && quarterIndex < 4) {
        quarters[quarterIndex].value++;
      }
    });

    // If no real data, generate some reasonable values
    if (quarters.every(q => q.value === 0)) {
      quarters[0].value = 245;
      quarters[1].value = 312;
      quarters[2].value = 289;
      quarters[3].value = 402;
    }

    return quarters;
  }

  // API Methods
  public async getCasesOverview(_filters?: DashboardFilters): Promise<ApiResponse<CasesOverviewResponse>> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      data: {
        caseStatusData: this.getCasesData(),
        slaMetrics: this.getSLAMetrics(),
        conversationMetrics: this.getConversationMetrics(),
        monthlyTrendData: this.getMonthlyTrend(),
      }
    };
  }

  public async getDepartmentInquiries(_filters?: DashboardFilters): Promise<ApiResponse<DepartmentInquiry[]>> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return { data: this.getDepartments() };
  }

  public async getRecentCases(_filters?: DashboardFilters): Promise<ApiResponse<RecentCase[]>> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { data: this.getRecentCasesData() };
  }

  public async getDocumentsOverview(_filters?: DashboardFilters): Promise<ApiResponse<DocumentsOverviewResponse>> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      data: {
        documentStats: this.getDocumentStats(),
        categoryData: this.getCategoryData(),
        entityData: this.getEntityData(),
        quarterData: this.getQuarterData(),
      }
    };
  }
}

export const dashboardService = new DashboardService();
