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
  category: number;
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
