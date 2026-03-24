import i18n from '@/i18n';

/**
 * Centralized utility to extract user-friendly error messages from various error objects
 * including Axios error responses, standard Error objects, and specific API error structures.
 */
export const getErrorMessage = (error: any): string => {
  if (!error) return i18n.t('common.unknownError');

  // 1. Handling the specific object format: { "code": "Access denied", "status": 401, "args": "[]" }
  if (typeof error === 'object' && error.code && typeof error.code === 'string') {
    return error.code;
  }

  // 2. Handling Axios error responses
  if (error.response?.data) {
    const data = error.response.data;
    if (typeof data === 'string') return data;
    if (typeof data === 'object') {
      if (data.message) return data.message;
      if (data.code) return data.code;
      if (data.error) return data.error;
    }
  }

  // 3. Handling standard Error objects or RTK error objects
  if (error.message) return error.message;

  // 4. Handling string errors
  if (typeof error === 'string') return error;

  // 5. Fallback for unexpected formats
  return i18n.t('common.unexpectedError');
};
