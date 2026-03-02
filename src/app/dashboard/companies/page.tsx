"use client";

import React, { useCallback, useEffect, useState } from "react";
import { CompanyModel } from "@/models/company.model";
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
import { SquarePen, Trash } from "lucide-react";
import { companyService } from "@/services/company.service";
import AddEditCompanyModal from "@/components/modals/add-edit-company.modal";
import { toast } from "sonner";

const Page = () => {
  const [companies, setCompanies] = useState<CompanyModel[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<CompanyModel | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState({
    addEdit: false,
    view: false,
  });

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const data = (await companyService.findAll()) as {
        data: { data: CompanyModel[] };
      };
      setCompanies(data?.data?.data ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleAddCompany = () => {
    setSelectedCompany(null);
    setOpenModal((prev) => ({ ...prev, addEdit: true }));
  };

  const handleEditCompany = (company: CompanyModel) => {
    setSelectedCompany(company);
    setOpenModal((prev) => ({ ...prev, addEdit: true }));
  };

  const confirm = useConfirmDialog();

  const handleDelete = async (id: string) => {
    const ok = await confirm({
      title: "Delete Company",
      description: "Are you sure you want to delete this company?",
      cancelText: "No",
      confirmText: "Yes",
    });
    if (ok) {
      const { error } = await companyService.remove(id);
      if (error) {
        toast.error("Failed to delete company");
        return;
      }
      toast.success("Company deleted successfully");
      fetchCompanies();
    }
  };
  return (
    <Card className="rounded-none p-6">
      <div className="flex justify-between">
        <div className="flex-1">
          <CardHeader className="p-0">
            <CardTitle>Companies</CardTitle>
            <CardDescription>Manage companies</CardDescription>
          </CardHeader>
        </div>

        <div>
          <Button onClick={handleAddCompany}>Add New Company</Button>
        </div>
      </div>

      <AddEditCompanyModal
        open={openModal.addEdit}
        onClose={() => setOpenModal((prev) => ({ ...prev, addEdit: false }))}
        defaultValues={selectedCompany}
        onSuccess={() => {
          setOpenModal((prev) => ({ ...prev, addEdit: false }));
          setSelectedCompany(null);
          fetchCompanies();
        }}
      />

      <CardContent className="p-0">
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Index</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Logo</TableHead>
                <TableHead className="text-end">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-64">
                    <div>Loading Companies...</div>
                  </TableCell>
                </TableRow>
              ) : companies.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center h-64 text-muted-foreground"
                  >
                    No companies found. Please add some companies.
                  </TableCell>
                </TableRow>
              ) : (
                companies.map((company, index) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-10 h-10 rounded-full"
                      />
                    </TableCell>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company?.industry}</TableCell>
                    <TableCell>
                      <a href={company.website} target="_blank">
                        {company.website}
                      </a>{" "}
                    </TableCell>

                    <TableCell className="text-end">
                      <Button
                        title="Edit"
                        onClick={() => handleEditCompany(company)}
                        size="icon"
                        variant="ghost"
                      >
                        <SquarePen className="h-4 w-4" />
                      </Button>
                      <Button
                        title="Delete"
                        onClick={() => handleDelete(company.id)}
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

export default Page;
