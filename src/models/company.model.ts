import { BaseModel } from "./base-model";

export interface CompanyModel extends BaseModel {
  name: string;
  industry: string;
  website: string;
  logo: string;
}
