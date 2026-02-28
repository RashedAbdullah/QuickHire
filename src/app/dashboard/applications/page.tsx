"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { applicationService } from "@/services/application.service";
import { ApplicationModel } from "@/models/application.model";

const Page = () => {
  const [applications, setApplications] = useState<ApplicationModel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      const { data } = (await applicationService.findAll()) as {
        data: { data: ApplicationModel[] };
      };
      console.log(data?.data);
      setApplications(data?.data);
    };

    fetchApplications();
  }, []);

  console.log(applications);
  return (
    <Card className="rounded-none p-6">
      <div className="flex justify-between">
        <div className="flex-1">
          <CardHeader className="p-0">
            <CardTitle>All Applications</CardTitle>
            <CardDescription>Manage Applications</CardDescription>
          </CardHeader>
        </div>
      </div>

      <CardContent className="p-0">
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Index</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Cover note</TableHead>
                <TableHead>Job / Company</TableHead>
                <TableHead className="text-end">Resmue Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-64">
                    <div>Loading Jobs</div>
                  </TableCell>
                </TableRow>
              ) : applications.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center h-64 text-muted-foreground"
                  >
                    No Application found.
                  </TableCell>
                </TableRow>
              ) : (
                applications.map((application, index) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{application.name}</TableCell>
                    <TableCell>{application?.email}</TableCell>
                    <TableCell>{application?.coverNote} </TableCell>
                    <TableCell>{application.job?.title}</TableCell>
                    <TableCell className="text-end">
                      <a
                        className="underline text-blue-600"
                        href={application.resumeLink}
                      >
                        Follow Resume link
                      </a>
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

export default Page;
