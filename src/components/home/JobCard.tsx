import Link from "next/link";
import JobTag from "../JobTag";
import { JobModel } from "@/models/job.model";

const JobCard = ({ job }: { job: JobModel }) => {
  const tags = [job.category?.name, job.company?.industry];

  return (
    <div className="group flex flex-col justify-between rounded border border-border bg-card p-6 transition-shadow hover:shadow-md">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded bg-muted text-sm font-bold text-foreground">
            <img src={job?.company?.logo} alt={job?.company?.name} />
          </div>
          <JobTag label={job?.employmentType} />
        </div>
        <h3 className="mb-1 text-base font-semibold text-foreground">
          {job.title}
        </h3>
        <p className="mb-3 text-sm text-muted-foreground">
          {job.company?.name} · {job.location?.city}, {job.location?.country}
        </p>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {job.description}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <JobTag key={tag} label={tag ?? ""} />
          ))}
        </div>
        <Link
          href={`/jobs/${job.id}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
