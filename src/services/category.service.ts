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
}

export const categoryService = new CategoryService();
