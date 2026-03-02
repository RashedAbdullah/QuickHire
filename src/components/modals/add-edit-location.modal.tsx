"use client";

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
import { LocationModel } from "@/models/location.model";
import { locationService } from "@/services/location.service";
import { Checkbox } from "../ui/checkbox";

const locationSchema = z.object({
  country: z.string().min(3, "Country name should be at least 3 characters"),
  city: z.string().min(3, "City name should be at least 3 characters"),
});

type LocationSchema = z.infer<typeof locationSchema>;

const AddEditLocationModal = ({
  open,
  onClose,
  defaultValues,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  defaultValues?: LocationModel | null;
  onSuccess?: () => void;
}) => {
  const form = useForm<LocationSchema>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      country: "",
      city: "",
    },
  });

  useEffect(() => {
    if (open && defaultValues?.id) {
      form.reset({
        country: defaultValues?.country ?? "",
        city: defaultValues?.city ?? "",
      });
    } else if (open && !defaultValues?.id) {
      form.reset({
        country: "",
        city: "",
      });
    }
  }, [open]);

  const onSubmit = async (data: LocationSchema) => {
    try {
      if (defaultValues?.id) {
        const { error } = await locationService.update(defaultValues.id, data);
        if (error) {
          toast.error("Failed to update location");
          return;
        }
        toast.success("Location updated successfully");
      } else {
        const { error } = await locationService.create(data);
        if (error) {
          toast.error("Failed to add location");
          return;
        }
        toast.success("Location created successfully");
      }

      onClose();
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add/update location");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-[1000px]! w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {defaultValues?.id ? "Update Location" : "Add New Location"}
          </DialogTitle>
          <DialogDescription>
            {defaultValues?.id
              ? "Update existing location details"
              : "Add a new location"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
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

export default AddEditLocationModal;
