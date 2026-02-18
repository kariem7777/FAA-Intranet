export const BASE_URL = 'https://localhost:7155/api';

export const API_ROUTES = {
    LOOKUPS: {
        CATEGORIES: '/LawCategories',
        SUBCATEGORIES: '/LawCategorySubs',
        ENTITIES: '/Lookups/Entities',
        DEPARTMENTS: '/Lookups/Departments',
        ROLES: '/Lookups/Roles',
        JOB_TITLES: '/Lookups/JobTitles',
    },
    DASHBOARD: {
        ENQURIES_METRICS: '/Enquiries/Metrics',
        LEGISLATION_METRICS: '/LawDocuments/metrics',
    },
    ENQURIES: {
        LIST: '/Enquiries/search',
        DETAILS: '/Enquiries',
        CREATE: '/Enquiries',
        REPLY: '/Enquiries/reply',
        CLOSE: (id: number | string) => `/Enquiries/${id}/close`,
        APPROVE_REPLY: (replyId: number | string) => `/Enquiries/replies/${replyId}/approve`,
        GET_BYID: (id: number | string) => `/Enquiries/${id}`,
        GET_APPROVED_REPLIES: '/Enquiries/ApprovedReplies',
    },
}; 