import Link from "next/link";
import JobTag from "../JobTag";
import { JobModel } from "@/models/job.model";

const LatestJobRow = ({ job }: { job: JobModel }) => {
  const tags = [job.category?.name, job.company?.industry];
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="flex items-start gap-4 rounded border border-border bg-card p-5 transition-shadow hover:shadow-md"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-muted text-sm font-bold text-foreground">
        <img src={job?.company?.logo} alt={job?.company?.name} />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold text-foreground">{job.title}</h3>
        <p className="mb-2 text-sm text-muted-foreground">
          {job.company?.name} · {job.location?.city}, {job.location?.country}
        </p>
        <div className="flex flex-wrap gap-2">
          <JobTag label={job.employmentType} />
          {tags.map((tag) => (
            <JobTag key={tag} label={tag ?? ""} />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default LatestJobRow;
