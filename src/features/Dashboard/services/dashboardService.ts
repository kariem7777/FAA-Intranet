import { BaseApiService } from '@/shared/api/BaseApiService';
import type { ApiResponse } from '@/shared/api/types';
import type {
  LegislationMetrics,
  EnquiriesMetrics,
  DashboardFilters,
} from '../types';
import { API_ROUTES } from '@/shared/api/routes';



export class DashboardService extends BaseApiService {

  public async getEnquiriesMetrics(_filters?: DashboardFilters): Promise<ApiResponse<EnquiriesMetrics>> {
    let mappedquarter;
    switch (_filters?.quarter) {
      case 'Q1':
        mappedquarter = 0;
        break;
      case 'Q2':
        mappedquarter = 1;
        break;
      case 'Q3':
        mappedquarter = 2;
        break;
      case 'Q4':
        mappedquarter = 3;
        break;
    }
    return this.get<ApiResponse<EnquiriesMetrics>>(API_ROUTES.DASHBOARD.ENQURIES_METRICS, {
      params: {
        quarter: mappedquarter,
        year: _filters?.year,
      },
    });
  }

  public async getLegislationMetrics(_filters?: DashboardFilters): Promise<ApiResponse<LegislationMetrics>> {
    return this.get<ApiResponse<LegislationMetrics>>(API_ROUTES.DASHBOARD.LEGISLATION_METRICS, {
      params: {
        quarter: _filters?.quarter,
        year: _filters?.year,
      },
    });
  }

}

export const dashboardService = new DashboardService();
