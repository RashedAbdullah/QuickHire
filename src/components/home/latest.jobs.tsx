import { ArrowRight } from "lucide-react";
import Link from "next/link";
import LatestJobRow from "./LatestJobRow";
import { jobService } from "@/services/job.service";

const LatestJobsSection = async () => {
  const { data } = await jobService.findLatest();

  const jobs = data?.data || [];
  return (
    <section className="bg-muted/50 py-16">
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-extrabold text-foreground">
            Latest <span className="italic text-primary">jobs open</span>
          </h2>
          <Link
            href="/jobs"
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline md:flex"
          >
            Show all jobs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {jobs.slice(0, 8).map((job) => (
            <LatestJobRow key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestJobsSection;
