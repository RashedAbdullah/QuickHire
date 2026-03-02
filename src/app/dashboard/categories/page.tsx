"use client";

import { useCallback, useEffect, useState } from "react";
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
import { toast } from "sonner";
import { CategoryModel } from "@/models/category.model";
import { categoryService } from "@/services/category.service";
import AddEditCategoryModal from "@/components/modals/add-edit-category.model";

const Page = () => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const confirmDialog = useConfirmDialog();

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await categoryService.findAll() as {
        data: { data: CategoryModel[] };
        error: { message: string };
      };
      if (error) {
        toast.error(error.message);
        return;
      }
      setCategories(data?.data ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddCategory = () => {
    setOpen(true);
    setSelectedCategory(null);
  };

  const handleEditCategory = (category: CategoryModel) => {
    setOpen(true);
    setSelectedCategory(category);
  };

  const handleDelete = async (id: string) => {
    const ok = await confirmDialog({
      title: "Delete Category",
      description: "Are you sure you want to delete this category?",
      cancelText: "No",
      confirmText: "Yes",
    });
    if (ok) {
      const { error } = await categoryService.remove(id);
      if (error) {
        toast.error("Failed to delete category");
        return;
      }
      toast.success("Category deleted successfully");
      fetchCategories();
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Card className="rounded-none p-6">
      <div className="flex justify-between">
        <div className="flex-1">
          <CardHeader className="p-0">
            <CardTitle>Categories</CardTitle>
            <CardDescription>Manage categories</CardDescription>
          </CardHeader>
        </div>

        <div>
          <Button onClick={handleAddCategory}>Add New Category</Button>
        </div>
      </div>

      <AddEditCategoryModal
        open={open}
        onClose={() => setOpen(false)}
        defaultValues={selectedCategory}
        onSuccess={() => {
          setOpen(false);
          setSelectedCategory(null);
          fetchCategories();
        }}
      />

      <CardContent className="p-0">
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Index</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-end">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-64">
                    <div>Loading Categories...</div>
                  </TableCell>
                </TableRow>
              ) : categories.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center h-64 text-muted-foreground"
                  >
                    No categories found. Please add some categories.
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category, index) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell className="text-end">
                      <Button
                        title="Edit"
                        onClick={() => handleEditCategory(category)}
                        size="icon"
                        variant="ghost"
                      >
                        <SquarePen className="h-4 w-4" />
                      </Button>
                      <Button
                        title="Delete"
                        onClick={() => handleDelete(category.id)}
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
