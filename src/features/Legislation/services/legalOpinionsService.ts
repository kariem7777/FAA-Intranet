import { BaseApiService } from '@/shared/api/BaseApiService';
import type { ApiResponse, PaginatedResponse } from '@/shared/api/types';
import type { ApprovedOpinion, LegalOpinionEntity, ConversationMessage } from '../types/legalOpinions.types';

// Mock approved opinions data
const MOCK_APPROVED_OPINIONS: ApprovedOpinion[] = [
  {
    id: 1,
    department: 'rta',
    titleEn: 'Procurement regulations for emergency purchases',
    titleAr: 'لائحة المشتريات للحالات الطارئة',
    enquiryEn: 'We request clarification on the legal procedures for emergency purchases exceeding the allowable limit in the financial regulations.',
    enquiryAr: 'نرجو من الجهاز توضيح الإجراءات القانونية المتبعة في حالة المشتريات الطارئة التي تتجاوز الحد المسموح به في اللائحة المالية.',
    date: '2024-01-15',
    approvedReplyEn: 'According to Article (12) of the Financial Regulations, prior approval from the competent authority must be obtained for emergency purchases exceeding the allowable limit. The entity must submit a detailed justification report explaining the urgency and necessity of the purchase, along with supporting documents. The approval process should be completed within 48 hours for genuine emergency cases.',
    approvedReplyAr: 'بناءً على المادة (12) من اللائحة المالية، يجب الحصول على موافقة مسبقة من الجهة المختصة في حالة المشتريات الطارئة التي تتجاوز الحد المسموح به. يجب على الجهة تقديم تقرير تبرير مفصل يشرح الحالة الطارئة وضرورة الشراء، مع المستندات الداعمة. يجب إكمال عملية الموافقة في غضون 48 ساعة للحالات الطارئة الحقيقية.',
    approvedDate: '2024-02-10',
    approvedBy: 'Ahmed Al Shamsi - Senior Legal Advisor',
  },
  {
    id: 2,
    department: 'dha',
    titleEn: 'IFRS 16 implementation for operating leases',
    titleAr: 'تطبيق معيار IFRS 16 على عقود الإيجار التشغيلية',
    enquiryEn: 'Is it mandatory for the Authority to apply IFRS 16 to operating lease contracts?',
    enquiryAr: 'هل يتوجب على الهيئة تطبيق معيار IFRS 16 على عقود الإيجار التشغيلية؟',
    date: '2024-01-22',
    approvedReplyEn: 'Yes, according to Cabinet Resolution No. (23) of 2023 regarding the adoption of international accounting standards, all government entities must apply IFRS 16 to their operating lease contracts starting from the fiscal year 2024. This includes recognition of lease assets and liabilities on the balance sheet, regardless of the lease classification.',
    approvedReplyAr: 'نعم، وفقاً لقرار مجلس الوزراء رقم (23) لسنة 2023 بشأن اعتماد المعايير المحاسبية الدولية، يجب على جميع الجهات الحكومية تطبيق معيار IFRS 16 على عقود الإيجار التشغيلية اعتباراً من السنة المالية 2024. ويشمل ذلك إثبات أصول والتزامات الإيجار في الميزانية العمومية، بغض النظر عن تصنيف عقد الإيجار.',
    approvedDate: '2024-02-15',
    approvedBy: 'Fatima Al Marzouqi - Legal Advisor',
  },
  {
    id: 3,
    department: 'dewa',
    titleEn: 'Fund transfers between capital projects',
    titleAr: 'تحويل الأموال بين المشاريع الرأسمالية',
    enquiryEn: 'What are the legal requirements for transferring funds between different capital projects?',
    enquiryAr: 'ما هي المتطلبات القانونية لتحويل الأموال بين المشاريع الرأسمالية المختلفة؟',
    date: '2024-01-25',
    approvedReplyEn: 'Based on Financial Circular No. (7) of 2022, fund transfers between capital projects require written approval from the Department of Finance. The requesting entity must submit a formal request including project details, transfer justification, and budget impact analysis. Transfers exceeding AED 5 million require additional approval from the Executive Council.',
    approvedReplyAr: 'بناءً على التعميم المالي رقم (7) لسنة 2022، يتطلب تحويل الأموال بين المشاريع الرأسمالية موافقة خطية من دائرة المالية. يجب على الجهة الطالبة تقديم طلب رسمي يتضمن تفاصيل المشروع، ومبررات التحويل، وتحليل الأثر على الميزانية. التحويلات التي تتجاوز 5 ملايين درهم تتطلب موافقة إضافية من المجلس التنفيذي.',
    approvedDate: '2024-02-20',
    approvedBy: 'Mohammed Al Hashimi - Chief Legal Counsel',
  },
  {
    id: 4,
    department: 'dld',
    titleEn: 'Disbursement controls before contract finalization',
    titleAr: 'ضوابط الصرف قبل إتمام إجراءات التعاقد',
    enquiryEn: 'We would like to enquire about the legal controls for disbursement on projects before finalizing award procedures.',
    enquiryAr: 'نود الاستفسار عن الضوابط القانونية للصرف على المشاريع قبل إتمام إجراءات الترسية النهائية.',
    date: '2024-01-28',
    approvedReplyEn: 'Disbursement on any project is strictly prohibited before completing final award procedures and contract signing as per Article (25) of the Financial Regulations. Any violation may result in personal liability for the authorizing officer. In exceptional emergency cases, temporary advance payments may be approved by the Director General with proper justification and guarantees.',
    approvedReplyAr: 'يُمنع منعاً باتاً الصرف على أي مشروع قبل إتمام إجراءات الترسية النهائية والتوقيع على العقد وفقاً للمادة (25) من اللائحة المالية. أي مخالفة قد تؤدي إلى مسؤولية شخصية للموظف المخول. في حالات الطوارئ الاستثنائية، يمكن الموافقة على دفعات مقدمة مؤقتة من قبل المدير العام مع التبرير والضمانات المناسبة.',
    approvedDate: '2024-02-25',
    approvedBy: 'Sara Al Nuaimi - Legal Consultant',
  },
  {
    id: 5,
    department: 'ded',
    titleEn: 'Annual financial statement audit requirements',
    titleAr: 'متطلبات تدقيق القوائم المالية السنوية',
    enquiryEn: 'What are the mandatory requirements for external audit of annual financial statements?',
    enquiryAr: 'ما هي المتطلبات الإلزامية للتدقيق الخارجي للقوائم المالية السنوية؟',
    date: '2024-02-01',
    approvedReplyEn: 'According to Law No. (8) of 2011 and its amendments, all government entities must have their annual financial statements audited by the State Audit Institution. The audit must be completed within 90 days from the fiscal year end. Entities must provide all requested documents and ensure full cooperation with the audit team throughout the process.',
    approvedReplyAr: 'وفقاً للقانون رقم (8) لسنة 2011 وتعديلاته، يجب على جميع الجهات الحكومية تدقيق قوائمها المالية السنوية من قبل ديوان المحاسبة. يجب إنجاز التدقيق خلال 90 يوماً من نهاية السنة المالية. يجب على الجهات تقديم جميع المستندات المطلوبة وضمان التعاون الكامل مع فريق التدقيق طوال العملية.',
    approvedDate: '2024-03-01',
    approvedBy: 'Khalid Al Mansouri - Director of Legal Affairs',
  },
  
];

const MOCK_ENTITIES: LegalOpinionEntity[] = [
  { id: 'rta', nameAr: 'هيئة الطرق والمواصلات', nameEn: 'Roads and Transport Authority' },
  { id: 'dha', nameAr: 'هيئة الصحة', nameEn: 'Health Authority' },
  { id: 'dewa', nameAr: 'هيئة كهرباء ومياه دبي', nameEn: 'Dubai Electricity and Water Authority' },
  { id: 'dld', nameAr: 'دائرة الأراضي والأملاك', nameEn: 'Dubai Land Department' },
  { id: 'ded', nameAr: 'دائرة التنمية الاقتصادية', nameEn: 'Department of Economic Development' },
];

export class LegalOpinionsService extends BaseApiService {

  /**
   * Get all approved legal opinions with optional filters and pagination
   */
  public async getApprovedOpinions(params: {
    searchQuery?: string;
    departmentId?: string;
    pageNumber?: number;
    pageSize?: number;
  }): Promise<PaginatedResponse<ApprovedOpinion>> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const pageNumber = params.pageNumber || 1;
    const pageSize = params.pageSize || 10;

    let filtered = [...MOCK_APPROVED_OPINIONS];

    // Apply search filter
    if (params.searchQuery) {
      const query = params.searchQuery.toLowerCase();
      filtered = filtered.filter(opinion =>
        opinion.titleEn.toLowerCase().includes(query) ||
        opinion.titleAr.includes(params.searchQuery!) ||
        opinion.enquiryEn.toLowerCase().includes(query) ||
        opinion.enquiryAr.includes(params.searchQuery!)
      );
    }

    // Apply department filter
    if (params.departmentId) {
      filtered = filtered.filter(opinion => opinion.department === params.departmentId);
    }

    // Calculate pagination
    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = filtered.slice(startIndex, endIndex);

    return {
      data: {
        items: paginatedItems,
        pageNumber,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage: pageNumber < totalPages,
        hasPreviousPage: pageNumber > 1,
      }
    };
  }

  /**
   * Get single opinion details by ID
   */
  public async getOpinionDetails(opinionId: number): Promise<ApiResponse<{
    opinion: ApprovedOpinion;
    conversation: ConversationMessage[];
  }>> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));

    const opinion = MOCK_APPROVED_OPINIONS.find(op => op.id === opinionId);

    if (!opinion) {
      return { message: 'Opinion not found' };
    }

    // Mock conversation for the opinion
    const conversation: ConversationMessage[] = [
      {
        id: 1,
        sender: 'FAA Legal Team',
        date: 'Jan 20, 2024',
        message: 'With reference to your enquiry, after reviewing the relevant laws and regulations, we have prepared the following legal opinion.',
        messageAr: 'بالإشارة إلى استفساركم، وبعد مراجعة القوانين واللوائح ذات الصلة، قمنا بإعداد الرأي القانوني التالي.',
      },
      {
        id: 2,
        sender: 'Legal Review Committee',
        date: 'Jan 25, 2024',
        message: 'The opinion has been reviewed and approved by the Legal Review Committee.',
        messageAr: 'تمت مراجعة الرأي والموافقة عليه من قبل لجنة المراجعة القانونية.',
      },
    ];

    return {
      data: {
        opinion,
        conversation,
      }
    };
  }

  /**
   * Get all entities/departments
   */
  public async getEntities(): Promise<ApiResponse<LegalOpinionEntity[]>> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { data: MOCK_ENTITIES };
  }
}

export const legalOpinionsService = new LegalOpinionsService();
