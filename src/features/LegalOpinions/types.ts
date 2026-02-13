export interface Enquiry {
  id: number;
  title: string;
  departmentEn: string;
  departmentAr: string;
  createdOnUtc: string;
  status: number;
  enquirer?: Enquirer;
  replies?: EnquiryReply[];
  reply?: EnquiryReply;
}

export interface Person {
  id: number;
  nameEn: string;
  nameAr: string;
}

export type Replier = Person;
export type Enquirer = Person;

export interface EnquiryReply {
  id: number;
  content: string;
  pureContent?: string;
  approved: boolean;
  isAdminResponse: boolean;
  replier?: Replier;
  createdOnUtc: string;
}
