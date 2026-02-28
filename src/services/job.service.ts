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

  // PUT Update a job by ID
  async update(
    id: string,
    data: Partial<JobModel>,
  ): Promise<ServiceResult<ApiResponse<JobModel>>> {
    return await this.put(`/${id}`, data);
  }

  // Delete a job by ID
  async remove(id: string): Promise<ServiceResult<ApiResponse<null>>> {
    return await this.delete(`/${id}`);
  }
}

export const jobService = new JobService();
