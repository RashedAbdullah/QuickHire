import { BaseService } from "./base.service";

class CompanyService extends BaseService {
  constructor() {
    super("/companies");
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

export const companyService = new CompanyService();
