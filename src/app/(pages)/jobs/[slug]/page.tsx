import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import JobTag from "@/components/JobTag";
import ApplyForm from "@/components/jobs/apply-form";
import { jobService } from "@/services/job.service";

const JobDetail = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const { data } = await jobService.findById(slug);

  const job = data?.data;

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center items-center text-center">
        <div className="container">
          <h1 className="text-2xl font-bold text-foreground">Job not found</h1>
          <Link
            href="/"
            className="mt-4 inline-block text-primary hover:underline"
          >
            ← Back to jobs
          </Link>
        </div>
      </div>
    );
  }

  const tags = [job.category?.name, job.company?.industry];

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-10 md:py-26">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to jobs
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Job Info */}
          <div className="lg:col-span-2">
            <div className="rounded border border-border bg-card p-6 md:p-8">
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center">
                  <img src={job?.company?.logo} alt={job?.company?.name} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    {job.title}
                  </h1>
                  <p className="text-muted-foreground">
                    {job.company?.name} · {job.location?.city},{" "}
                    {job.location?.country}
                  </p>
                </div>
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                <JobTag label={job.employmentType} />
                {tags.map((t, index) => (
                  <JobTag key={index} label={t ?? ""} />
                ))}
              </div>

              <div className="mb-4 text-sm text-muted-foreground">
                Posted {job.createdAt}
              </div>

              <h2 className="mb-2 text-lg font-semibold text-foreground">
                About the role
              </h2>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                {job.description}
              </p>

              <h2 className="mb-2 text-lg font-semibold text-foreground">
                Category
              </h2>
              <p className="text-muted-foreground">{job.category?.name}</p>
            </div>
          </div>

          <ApplyForm job={job} />
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
