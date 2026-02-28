import { BaseModel } from "./base-model";

export interface LocationModel extends BaseModel {
  country: string;
  city: string;
  isRemote: boolean;
}
