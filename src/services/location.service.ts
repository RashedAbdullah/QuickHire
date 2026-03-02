import { LocationModel } from "@/models/location.model";
import { BaseService, PaginationQuery } from "./base.service";

export interface JobPaginationQuery extends PaginationQuery {
  title?: string;
  companyId?: string;
  categoryId?: string;
  locationId?: string;
}

class LocationService extends BaseService {
  constructor() {
    super("/locations");
  }

  // GET All Books
  async findAll() {
    return await this.get("");
  }

  // GET Single Book
  async findById(id: string) {
    return await this.get(`/${id}`);
  }

  // POST Book
  async create(data: any) {
    return await this.post("", data);
  }

  // PUT Book
  async update(id: string, data: any) {
    return await this.put(`/${id}`, data);
  }

  // DELETE Book
  async remove(id: string) {
    return await this.delete(`/${id}`);
  }
}

export const locationService = new LocationService();
