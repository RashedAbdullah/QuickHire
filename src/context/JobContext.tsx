"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Job, defaultJobs } from "@/data/jobs";

interface JobContextType {
  jobs: Job[];
  addJob: (job: Omit<Job, "id" | "postedAt">) => void;
  deleteJob: (id: string) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>(defaultJobs);

  const addJob = (job: Omit<Job, "id" | "postedAt">) => {
    const newJob: Job = {
      ...job,
      id: Date.now().toString(),
      postedAt: "Just now",
    };
    setJobs((prev) => [newJob, ...prev]);
  };

  const deleteJob = (id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, deleteJob }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const ctx = useContext(JobContext);
  if (!ctx) throw new Error("useJobs must be used within JobProvider");
  return ctx;
};
