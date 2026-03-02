import { BaseService, PaginationQuery } from "./base.service";

export interface JobPaginationQuery extends PaginationQuery {
  title?: string;
  companyId?: string;
  categoryId?: string;
  locationId?: string;
}

class CategoryService extends BaseService {
  constructor() {
    super("/categories");
  }

  // GET All Books
  async findAll() {
    return await this.get("");
  }

  async create(data: any) {
    return await this.post("", data);
  }

  async update(id: string, data: any) {
    return await this.put(`/${id}`, data);
  }

  async remove(id: string) {
    return await this.delete(`/${id}`);
  }
}

export const categoryService = new CategoryService();
