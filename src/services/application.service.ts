import { ApplicationModel } from "@/models/application.model";
import { BaseService } from "./base.service";

class ApplicationService extends BaseService {
  constructor() {
    super("/applications");
  }

  // GET All Books
  async findAll() {
    return await this.get("");
  }

  async create(data: Partial<ApplicationModel>) {
    return await this.post("", data);
  }
}

export const applicationService = new ApplicationService();
