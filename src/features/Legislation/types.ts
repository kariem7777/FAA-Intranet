export interface LawCategory {
  id: number;
  lawCategoryEn: string;
  lawCategoryAr: string;
  descriptionEn: string;
  descriptionAr: string;
  color: string;
  imagePath: string;
  isActive: boolean;
}

export interface LawSubCategory {
  id: number;
  lawSubCategoryEn: string;
  lawSubCategoryAr: string;
  isActive: boolean;
  documentsCount: number;
}

export interface Entities {
  id: number;
  entityNameAr: string;
  entityNameEn: string;
  isActive: boolean;
}
