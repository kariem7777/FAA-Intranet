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