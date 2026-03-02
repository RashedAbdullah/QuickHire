"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { CompanyModel } from "@/models/company.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { companyService } from "@/services/company.service";

const companySchema = z.object({
  name: z.string().min(3, "Job title should be at least 3 characters"),
  industry: z.string().min(1, "Job description is required"),
  website: z.string().min(1, "Job description is required"),
  logo: z.string().min(1, "Job description is required"),
});

type CompanySchema = z.infer<typeof companySchema>;

const AddEditCompanyModal = ({
  open,
  onClose,
  defaultValues,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  defaultValues?: CompanyModel | null;
  onSuccess?: () => void;
}) => {
  const form = useForm<CompanySchema>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      industry: "",
      website: "",
      logo: "",
    },
  });

  useEffect(() => {
    if (open && defaultValues?.id) {
      form.reset({
        name: defaultValues?.name ?? "",
        industry: defaultValues?.industry ?? "",
        website: defaultValues?.website ?? "",
        logo: defaultValues?.logo ?? "",
      });
    } else if (open && !defaultValues?.id) {
      form.reset({
        name: "",
        industry: "",
        website: "",
        logo: "",
      });
    }
  }, [open]);

  const onSubmit = async (data: CompanySchema) => {
    try {
      if (defaultValues?.id) {
        const { error } = await companyService.update(defaultValues.id, {
          ...data,
        });
        if (error) {
          toast.error("Failed to update company");
          return;
        }
        toast.success("Company updated successfully");
      } else {
        const { error } = await companyService.create({
          ...data,
        });
        if (error) {
          toast.error("Failed to add company");
          return;
        }
        toast.success("Company created successfully");
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Input placeholder="Industry" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="Website" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Logo URL" {...field} />
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

export default AddEditCompanyModal;
