"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ApplyForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    resume: "",
    cover: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email format";
    if (!form.resume.trim()) e.resume = "Resume URL is required";
    else {
      try {
        new URL(form.resume);
      } catch {
        e.resume = "Invalid URL format";
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (validate()) {
      // toast.success("Application submitted!", {
      //   description: `Thank you ${form.name}, your application for ${job.title} at ${job.company} has been received.`,
      // });
      setForm({ name: "", email: "", resume: "", cover: "" });
      setErrors({});
    }
  };

  return (
    <div>
      <div className="sticky top-20 rounded border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-bold text-foreground">Apply Now</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Name *
            </label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-destructive">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Email *
            </label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-destructive">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Resume URL *
            </label>
            <Input
              value={form.resume}
              onChange={(e) => setForm({ ...form, resume: e.target.value })}
              placeholder="https://your-resume.com/resume.pdf"
            />
            {errors.resume && (
              <p className="mt-1 text-xs text-destructive">{errors.resume}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Cover Note
            </label>
            <Textarea
              value={form.cover}
              onChange={(e) => setForm({ ...form, cover: e.target.value })}
              placeholder="Why are you a great fit?"
              rows={4}
            />
          </div>
          <Button type="submit" className="w-full">
            Submit Application
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;
