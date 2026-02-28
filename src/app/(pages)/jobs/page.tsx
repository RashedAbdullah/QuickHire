import JobCard from "@/components/home/JobCard";
import SearchFilterJobs from "@/components/jobs/search-filter-jobs";
import { categoryService } from "@/services/category.service";
import { jobService } from "@/services/job.service";
import { locationService } from "@/services/location.service";

const JobsPage = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsResolved = await searchParams;

  const { data } = await jobService.findAll({
    filters: {
      categoryId: searchParamsResolved.categoryId as string,
      locationId: searchParamsResolved.locationId as string,
    },
    search: searchParamsResolved.search as string,
  });

  const { data: locationData } = (await locationService.findAll()) as {
    data: { data: { id: string; city: string; country: string }[] } | null;
  };

  const { data: categoryData } = (await categoryService.findAll()) as {
    data: { data: { id: string; name: string }[] } | null;
  };

  const locations = locationData?.data || [];
  const categories = categoryData?.data || [];

  const jobs = data?.data.data || [];
  return (
    <div className="bg-background py-20 min-h-screen">
      <div className="container">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          {/* Header */}
          <div className="space-y-1">
            <h2 className="text-4xl font-black tracking-tight text-foreground">
              All <span className="relative text-primary"> jobs</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Discover your next career opportunity
            </p>
          </div>
          <SearchFilterJobs categories={categories} locations={locations} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
