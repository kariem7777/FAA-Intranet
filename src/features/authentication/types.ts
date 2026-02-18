export interface User {
    id: string;
    displayName: string;
    email: string;
    role: string;
    departmentId: number;
}
export interface CreateUserRequest {
    userLogin: string;
    userNameEn: string;
    userNameAr: string;
    emailId: string;
    fkDeptId: number;
    fkJobTitle: number;
    roleId: number;
}

export interface Role {
    id: string,
    roleNameEn: string,
    roleNameAr: string,
}

export interface JobTitle {
    id: string,
    titleEn: string,
    titleAr: string
}