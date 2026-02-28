"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { JobModel } from "@/models/job.model";
import { CategoryModel } from "@/models/category.model";
import { CompanyModel } from "@/models/company.model";
import { LocationModel } from "@/models/location.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "@/components/common/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { jobService } from "@/services/job.service";
import { categoryService } from "@/services/category.service";
import { locationService } from "@/services/location.service";
import { companyService } from "@/services/company.service";

const jobSchema = z.object({
  title: z.string().min(3, "Job title should be at least 3 characters"),
  description: z.string().min(1, "Job description is required"),
  employmentType: z.enum(
    ["FULL_TIME", "PART_TIME", "CONTRACT", "TEMPORARY", "INTERN"],
    {
      message: "Please select a valid employment type",
    },
  ),
  companyId: z.string().min(3, "Company ID is required"),
  categoryId: z.string().min(3, "Category ID is required"),
  locationId: z.string().min(3, "Location ID is required"),
});

type JobSchema = z.infer<typeof jobSchema>;

const AddEditJobModal = ({
  open,
  onClose,
  defaultValues,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  defaultValues?: JobModel | null;
  onSuccess?: () => void;
}) => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [companies, setCompanies] = useState<CompanyModel[]>([]);
  const [locations, setLocations] = useState<LocationModel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesRes, companiesRes, locationsRes] = await Promise.all([
          categoryService.findAll(),
          companyService.findAll(),
          locationService.findAll(),
        ]);

        const categoriesData = (categoriesRes as any)?.data?.data;
        const companiesData = (companiesRes as any)?.data?.data;
        const locationsData = (locationsRes as any)?.data?.data;
        console.log("locationService ", locationsRes?.data);

        setCategories(categoriesData || []);

        setCompanies(companiesData || []);
        setLocations(locationsData || []);
      } catch (error) {
        console.error(
          "Failed to fetch categories, companies, or locations:",
          error,
        );
        toast.error("Failed to load form data");
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open]);

  const form = useForm<JobSchema>({
    resolver: zodResolver(jobSchema) as any,
    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      employmentType: defaultValues?.employmentType ?? "FULL_TIME",
      companyId: defaultValues?.companyId ?? "",
      categoryId: defaultValues?.categoryId ?? "",
      locationId: defaultValues?.locationId ?? "",
    },
  });

  useEffect(() => {
    if (open && defaultValues?.id) {
      form.reset({
        title: defaultValues?.title ?? "",
        description: defaultValues?.description ?? "",
        employmentType: defaultValues?.employmentType ?? "FULL_TIME",
        companyId: defaultValues?.companyId ?? "",
        categoryId: defaultValues?.categoryId ?? "",
        locationId: defaultValues?.locationId ?? "",
      });
    } else if (open && !defaultValues?.id) {
      form.reset({
        title: "",
        description: "",
        employmentType: "FULL_TIME",
        companyId: "",
        categoryId: "",
        locationId: "",
      });
    }
  }, [open]);

  const onSubmit = async (data: JobSchema) => {
    try {
      if (defaultValues?.id) {
        await jobService.update(defaultValues.id, {
          ...data,
        });
        toast.success("Job updated successfully");
      } else {
        await jobService.create({
          ...data,
        });
        toast.success("Job created successfully");
      }

      onClose();
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add/update job");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-[1000px]! w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {defaultValues?.id ? "Update Job" : "Add New Job"}
          </DialogTitle>
          <DialogDescription>
            {defaultValues?.id
              ? "Update existing job details"
              : "Add a new job listing"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full rounded-none">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full rounded-none">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {companies?.map((company) => (
                            <SelectItem key={company.id} value={company.id}>
                              {company.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="locationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full rounded-none">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations?.map((location) => (
                            <SelectItem key={location.id} value={location.id}>
                              {location.city}, {location.country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <div className="flex justify-end gap-2 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={form.formState.isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  loading={form.formState.isSubmitting}
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditJobModal;
