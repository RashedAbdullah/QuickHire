"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { CategoryModel } from "@/models/category.model";
import { categoryService } from "@/services/category.service";

const categorySchema = z.object({
  name: z.string().min(3, "Category name should be at least 3 characters"),
});

type CategorySchema = z.infer<typeof categorySchema>;

const AddEditCategoryModal = ({
  open,
  onClose,
  defaultValues,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  defaultValues?: CategoryModel | null;
  onSuccess?: () => void;
}) => {
  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (open && defaultValues?.id) {
      form.reset({
        name: defaultValues?.name ?? "",
      });
    } else if (open && !defaultValues?.id) {
      form.reset({
        name: "",
      });
    }
  }, [open]);

  const onSubmit = async (data: CategorySchema) => {
    try {
      if (defaultValues?.id) {
        const { error } = await categoryService.update(defaultValues.id, {
          ...data,
        });
        if (error) {
          toast.error("Failed to update category");
          return;
        }
        toast.success("Category updated successfully");
      } else {
        const { error } = await categoryService.create({
          ...data,
        });
        if (error) {
          toast.error("Failed to add category");
          return;
        }
        toast.success("Category created successfully");
      }

      onClose();
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add/update category");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-[1000px]! w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {defaultValues?.id ? "Update Category" : "Add New Category"}
          </DialogTitle>
          <DialogDescription>
            {defaultValues?.id
              ? "Update existing category details"
              : "Add a new category"}
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

export default AddEditCategoryModal;
