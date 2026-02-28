import { BaseService } from "./base.service";

class CompanyService extends BaseService {
  constructor() {
    super("/companies");
  }

  // GET All Books
  async findAll() {
    return await this.get("");
  }
}

export const companyService = new CompanyService();
