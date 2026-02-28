"use client";

import { JobModel } from "@/models/job.model";
import { jobService } from "@/services/job.service";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useConfirmDialog } from "@/context/confirm-dialog-provider";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import AddEditJobModal from "@/components/modals/add-edit-job.modal";
import { Eye, SquarePen, Trash } from "lucide-react";

const JobsPage = () => {
  const [jobs, setJobs] = useState<JobModel[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState({
    addEdit: false,
    view: false,
  });

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await jobService.findAll();
      if (error) {
        toast.error("Failed to fetch jobs");
        console.error("Error fetching jobs:", error);
        return;
      }

      setJobs(data?.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch jobs");
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleAddJob = () => {
    setSelectedJob(null);
    setOpenModal((prev) => ({ ...prev, addEdit: true }));
  };

  const handleUpdateJob = (job: JobModel) => {
    setSelectedJob(job);
    setOpenModal((prev) => ({ ...prev, addEdit: true }));
  };

  const confirm = useConfirmDialog();

  const handleDelete = async (id: string) => {
    try {
      const ok = await confirm({
        title: "Delete Job",
        description: "Are you sure you want to delete this job?",
        confirmText: "Yes",
        cancelText: "No",
      });

      if (!ok) return;
      await jobService.remove(id);
      await fetchJobs();
      toast.success("Job Deleted Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete job");
    }
  };

  return (
    <Card className="rounded-none p-6">
      <div className="flex justify-between">
        <div className="flex-1">
          <CardHeader className="p-0">
            <CardTitle>Jobs</CardTitle>
            <CardDescription>Manage jobs</CardDescription>
          </CardHeader>
        </div>

        <div>
          <Button onClick={handleAddJob}>Add New Job</Button>
        </div>
      </div>

      <AddEditJobModal
        open={openModal.addEdit}
        onClose={() => setOpenModal((prev) => ({ ...prev, addEdit: false }))}
        defaultValues={selectedJob}
        onSuccess={() => {
          setOpenModal((prev) => ({ ...prev, addEdit: false }));
          setSelectedJob(null);
          fetchJobs();
        }}
      />

      <CardContent className="p-0">
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Index</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-end">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-64">
                    <div>Loading Jobs</div>
                  </TableCell>
                </TableRow>
              ) : jobs.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center h-64 text-muted-foreground"
                  >
                    No jobs found. Please add some jobs.
                  </TableCell>
                </TableRow>
              ) : (
                jobs.map((job, index) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{job.title}</TableCell>
                    <TableCell>{job?.category?.name}</TableCell>
                    <TableCell>{job.category?.name} </TableCell>

                    <TableCell>
                      {job.location?.city}, {job.location?.country}
                    </TableCell>
                    <TableCell className="text-end">
                      <Button
                        onClick={() => {
                          setSelectedJob(job);
                          setOpenModal((prev) => ({
                            ...prev,
                            isView: true,
                          }));
                        }}
                        title="বিস্তারিত দেখুন"
                        size="icon"
                        variant="ghost"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button
                        title="এডিট"
                        onClick={() => {
                          setSelectedJob(job);
                          setOpenModal((prev) => ({
                            ...prev,
                            isEditUpdate: true,
                          }));
                        }}
                        size="icon"
                        variant="ghost"
                      >
                        <SquarePen className="h-4 w-4" />
                      </Button>
                      <Button
                        title="ডিলিট"
                        onClick={() => handleDelete(job.id)}
                        size="icon"
                        variant="ghost"
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobsPage;
