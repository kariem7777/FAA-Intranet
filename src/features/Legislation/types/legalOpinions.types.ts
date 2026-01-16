export interface ApprovedOpinion {
  id: number;
  department: string;
  titleEn: string;
  titleAr: string;
  enquiryEn: string;
  enquiryAr: string;
  date: string;
  approvedReplyEn: string;
  approvedReplyAr: string;
  approvedDate: string;
  approvedBy: string;
}

export interface LegalOpinionEntity {
  id: string;
  nameAr: string;
  nameEn: string;
}

export interface ConversationMessage {
  id: number;
  sender: string;
  date: string;
  message: string;
  messageAr?: string;
}

export interface LegalOpinionsFilters {
  searchQuery: string;
  selectedDepartment: string;
}

export interface PaginationInfo {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface LegalOpinionsState {
  opinions: {
    items: ApprovedOpinion[];
    loading: boolean;
    error: string | null;
    pagination: PaginationInfo;
  };
  selectedOpinion: {
    data: ApprovedOpinion | null;
    loading: boolean;
    error: string | null;
    conversation: ConversationMessage[];
  };
  entities: {
    items: LegalOpinionEntity[];
    loading: boolean;
    error: string | null;
  };
  filters: LegalOpinionsFilters;
}
