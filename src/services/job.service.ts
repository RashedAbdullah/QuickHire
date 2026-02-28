import { JobModel } from "@/models/job.model";
import {
  ApiResponse,
  BaseService,
  PaginatedResponse,
  PaginationQuery,
  ServiceResult,
} from "./base.service";

export interface JobPaginationQuery extends PaginationQuery {
  title?: string;
  companyId?: string;
  filters?: {
    categoryId?: string;
    locationId?: string;
  };
}

class JobService extends BaseService {
  constructor() {
    super("/jobs");
  }

  // GET All Books
  async findAll(
    params?: JobPaginationQuery,
  ): Promise<ServiceResult<ApiResponse<PaginatedResponse<JobModel>>>> {
    return await this.get("", params);
  }

  // GET Single job by ID
  async findById(id: string): Promise<ServiceResult<ApiResponse<JobModel>>> {
    return await this.get(`/${id}`);
  }

  // Latest jobs
  async findLatest(): Promise<ServiceResult<ApiResponse<JobModel[]>>> {
    return await this.get("/latest");
  }

  // GET Featured jobs
  async findFeatured(): Promise<ServiceResult<ApiResponse<JobModel[]>>> {
    return await this.get("/featured");
  }

  // POST Create a new job
  async create(
    data: Partial<JobModel>,
  ): Promise<ServiceResult<ApiResponse<JobModel>>> {
    return await this.post("", data);
  }
}

export const jobService = new JobService();
