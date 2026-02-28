"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { JobModel } from "@/models/job.model";
import { applicationService } from "@/services/application.service";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  resumeLink: z
    .string()
    .min(1, "Resume URL is required")
    .url("Invalid URL format"),
  coverNote: z.string().min(1, "Cover note is required"),
});

type FormValues = z.infer<typeof formSchema>;

const ApplyForm = ({ job }: { job: JobModel }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      resumeLink: "",
      coverNote: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const { error } = await applicationService.create({
        ...data,
        jobId: job?.id,
      });

      if (error) {
        toast.error("Application failed");
      } else {
        toast.success("Application submitted!", {
          description: `Thank you ${data.name}, your application for ${job.title} at ${job.company} has been received.`,
        });

        form.reset();
      }
    } catch (error) {
      console.error(error);

      toast.error("Application Failed");
    }
  };

  return (
    <div>
      <div className="sticky top-20 border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-bold text-foreground">Apply Now</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="resumeLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume URL *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://your-resume.com/resume.pdf"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverNote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Note</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Why are you a great fit?"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              {form.formState.isSubmitting
                ? "Submitting..."
                : "Submit Application"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ApplyForm;
