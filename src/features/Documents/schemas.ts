import { z } from 'zod';
import type { Resolver } from 'react-hook-form';

export const documentSchema = z.object({
  documentNameEn: z.string().min(1, 'legislation.documentsManagement.validation.required'),
  documentNameAr: z.string().min(1, 'legislation.documentsManagement.validation.required'),
  categoryId: z.number().min(1, 'legislation.documentsManagement.validation.required'),
  subCategoryId: z.number().min(1, 'legislation.documentsManagement.validation.required'),
  entityId: z.number().optional(),
  lawNumber: z.string().optional(),
  lawNameAr: z.string().optional(),
  lawNameEn: z.string().optional(),
  classification: z.number().min(1).max(2),
  file: z.any().optional(),
});

export type DocumentFormData = z.infer<typeof documentSchema>;

export const zodResolver = <T extends z.ZodObject<any>>(schema: T): Resolver<z.infer<T>> => async (values) => {
  try {
    const data = await schema.parseAsync(values);
    return {
      values: data,
      errors: {},
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        values: {},
        errors: (error as z.ZodError).issues.reduce((acc: any, curr) => {
          const path = curr.path.join('.');
          acc[path] = {
            message: curr.message,
            type: curr.code,
          };
          return acc;
        }, {}),
      };
    }
    throw error;
  }
};
