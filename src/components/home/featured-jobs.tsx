import { ArrowRight } from "lucide-react";
import Link from "next/link";
import JobCard from "./JobCard";
import { jobService } from "@/services/job.service";

const FeaturedJobsSection = async () => {
  const { data } = await jobService.findFeatured();

  const jobs = data?.data || [];

  return (
    <section className="bg-background py-16">
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-extrabold text-foreground">
            Featured <span className="italic text-primary">jobs</span>
          </h2>
          <Link
            href="/jobs"
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline md:flex"
          >
            Show all jobs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobsSection;
