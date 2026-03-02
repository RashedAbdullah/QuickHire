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
import { LocationModel } from "@/models/location.model";
import { locationService } from "@/services/location.service";
import AddEditLocationModal from "@/components/modals/add-edit-location.modal";

const Page = () => {
  const [locations, setLocations] = useState<LocationModel[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<LocationModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const confirmDialog = useConfirmDialog();

  const fetchLocations = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await locationService.findAll() as {
        data: { data: LocationModel[] };
        error: { message: string };
      };
      if (error) {
        toast.error(error.message);
        return;
      }
      setLocations(data?.data ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddLocation = () => {
    setOpen(true);
    setSelectedLocation(null);
  };

  const handleEditLocation = (location: LocationModel) => {
    setOpen(true);
    setSelectedLocation(location);
  };

  const handleDelete = async (id: string) => {
    const ok = await confirmDialog({
      title: "Delete Location",
      description: "Are you sure you want to delete this location?",
      cancelText: "No",
      confirmText: "Yes",
    });
    if (ok) {
      const { error } = await locationService.remove(id);
      if (error) {
        toast.error("Failed to delete location");
        return;
      }
      toast.success("Location deleted successfully");
      fetchLocations();
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <Card className="rounded-none p-6">
      <div className="flex justify-between">
        <div className="flex-1">
          <CardHeader className="p-0">
            <CardTitle>Locations</CardTitle>
            <CardDescription>Manage locations</CardDescription>
          </CardHeader>
        </div>

        <div>
          <Button onClick={handleAddLocation}>Add New Location</Button>
        </div>
      </div>

      <AddEditLocationModal
        open={open}
        onClose={() => setOpen(false)}
        defaultValues={selectedLocation}
        onSuccess={() => {
          setOpen(false);
          setSelectedLocation(null);
          fetchLocations();
        }}
      />

      <CardContent className="p-0">
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Index</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Is Remote</TableHead>
                <TableHead className="text-end">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-64">
                    <div>Loading Locations...</div>
                  </TableCell>
                </TableRow>
              ) : locations.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center h-64 text-muted-foreground"
                  >
                    No locations found. Please add some locations.
                  </TableCell>
                </TableRow>
              ) : (
                locations.map((location, index) => (
                  <TableRow key={location.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{location.country}</TableCell>
                    <TableCell>{location.city}</TableCell>
                    <TableCell>{location.isRemote ? "Yes" : "No"}</TableCell>
                    <TableCell className="text-end">
                      <Button
                        title="Edit"
                        onClick={() => handleEditLocation(location)}
                        size="icon"
                        variant="ghost"
                      >
                        <SquarePen className="h-4 w-4" />
                      </Button>
                      <Button
                        title="Delete"
                        onClick={() => handleDelete(location.id)}
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
