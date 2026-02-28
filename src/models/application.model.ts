import { BaseModel } from "./base-model";
import { JobModel } from "./job.model";

export interface ApplicationModel extends BaseModel {
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
  jobId: string;
  job?: JobModel;
}
