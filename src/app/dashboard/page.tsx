"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useJobs } from "@/context/JobContext";
import { locations } from "@/data/jobs";
import JobTag from "@/components/JobTag";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const categoryOptions = [
  "Design",
  "Sales",
  "Marketing",
  "Finance",
  "Technology",
  "Engineering",
  "Business",
  "Human Resource",
];

const Admin = () => {
  const { jobs, addJob, deleteJob } = useJobs();
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "San Francisco, USA",
    category: "Design",
    type: "Full Time",
    description: "",
    fullDescription: "",
    tags: "",
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.company.trim()) {
      toast.error("Missing fields", {
        description: "Title and Company are required.",
      });
      return;
    }
    addJob({
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
    toast.success("Job added!");
    setForm({
      title: "",
      company: "",
      location: "San Francisco, USA",
      category: "Design",
      type: "Full Time",
      description: "",
      fullDescription: "",
      tags: "",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 md:py-12">
        <h1 className="mb-8 text-3xl font-extrabold text-foreground">
          Admin Panel
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Add Job Form */}
          <div className="lg:col-span-1">
            <div className="rounded border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-bold text-foreground">
                Add New Job
              </h2>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    Title *
                  </label>
                  <Input
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder="Job title"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    Company *
                  </label>
                  <Input
                    value={form.company}
                    onChange={(e) =>
                      setForm({ ...form, company: e.target.value })
                    }
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    Location
                  </label>
                  <select
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground"
                  >
                    {locations
                      .filter((l) => l !== "All Locations")
                      .map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground"
                  >
                    {categoryOptions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    Type
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground"
                  >
                    {["Full Time", "Part Time", "Contract", "Internship"].map(
                      (t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ),
                    )}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    Short Description
                  </label>
                  <Textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Brief description"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    Full Description
                  </label>
                  <Textarea
                    value={form.fullDescription}
                    onChange={(e) =>
                      setForm({ ...form, fullDescription: e.target.value })
                    }
                    placeholder="Detailed description"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    Tags (comma separated)
                  </label>
                  <Input
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    placeholder="Design, Marketing"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Add Job
                </Button>
              </form>
            </div>
          </div>

          {/* Job List */}
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-lg font-bold text-foreground">
              All Jobs ({jobs.length})
            </h2>
            <div className="space-y-3">
              {jobs.map((job: any) => (
                <div
                  key={job.id}
                  className="flex items-center gap-4 rounded border border-border bg-card p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-muted text-xs font-bold text-foreground">
                    {job.company.slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-foreground">
                      {job.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {job.company} · {job.location}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      <JobTag label={job.type} />
                      <JobTag label={job.category} />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      deleteJob(job.id);
                      toast.success("Job deleted");
                    }}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
