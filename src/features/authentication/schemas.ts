import { z } from 'zod';

export const addUserSchema = z.object({
  userLogin: z.string().min(1, 'legislation.documentsManagement.validation.required'),
  userNameEn: z.string().min(1, 'legislation.documentsManagement.validation.required'),
  userNameAr: z.string().min(1, 'legislation.documentsManagement.validation.required'),
  emailId: z.string()
    .min(1, 'legislation.documentsManagement.validation.required')
    .email('legislation.documentsManagement.validation.invalidEmail'),
  fkDeptId: z.number().min(1, 'legislation.documentsManagement.validation.required'),
  fkJobTitle: z.number().min(1, 'legislation.documentsManagement.validation.required'),
  roleId: z.number().min(1, 'legislation.documentsManagement.validation.required'),
});

export interface AddUserFormData {
  userLogin: string;
  userNameEn: string;
  userNameAr: string;
  emailId: string;
  fkDeptId: number;
  fkJobTitle: number;
  roleId: number;
}
