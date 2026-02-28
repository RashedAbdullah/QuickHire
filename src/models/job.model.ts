import { BaseModel } from "./base-model";
import { CategoryModel } from "./category.model";
import { CompanyModel } from "./company.model";
import { LocationModel } from "./location.model";

export interface JobModel extends BaseModel {
  title: string;
  description: string;
  employmentType:
    | "FULL_TIME"
    | "PART_TIME"
    | "CONTRACT"
    | "TEMPORARY"
    | "INTERN";
  isFeatured: boolean;
  isActive: boolean;

  companyId?: string;
  categoryId?: string;
  locationId?: string;

  location?: LocationModel;
  category?: CategoryModel;
  company?: CompanyModel;
}
