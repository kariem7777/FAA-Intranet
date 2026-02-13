export interface Document {
    id: number,
    categoryId: number,
    subCategoryId: number,
    entityId: number,
    documentNameEn: string,
    documentNameAr: string,
    documentPhysicalPath: string,
    fileType: string,
    lawNumber: string,
    lawNameAr: string,
    lawNameEn: string,
    documentContent: string,
    classification: number,
    isActive: boolean,
    createdOn: string,
    updatedOn: string,
    categoryNameEn: string,
    categoryNameAr: string,
    subCategoryNameEn: string,
    subCategoryNameAr: string,
    entityNameEn: string,
    entityNameAr: string
}

export interface CreateDocument {
    categoryId: number,
    subCategoryId: number,
    entityId: number,
    documentNameEn: string,
    documentNameAr: string,
    lawNumber: string,
    lawNameAr: string,
    lawNameEn: string,
    classification: number,
    file: File
}