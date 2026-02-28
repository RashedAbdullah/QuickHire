"use client";

import { createSearchState } from "@/hooks/search-params";
import Search from "../common/search";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { startTransition } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";

const SearchFilterJobs = ({
  locations,
  categories,
}: {
  locations: { id: string; city: string; country: string }[];
  categories: { id: string; name: string }[];
}) => {
  const searchParams = useSearchParams();

  const { useSearchState: useSelectCategoryState } = createSearchState({
    key: "categoryId",
    defaultValue: "",
  });

  const { useSearchState: useSelectLocationState } = createSearchState({
    key: "locationId",
    defaultValue: "",
  });

  const [{}, setCategoryParams] = useSelectCategoryState({ startTransition });
  const [{}, setLocationParams] = useSelectLocationState({ startTransition });

  const hasQueryParams = searchParams.toString().length > 0;

  return (
    <div className="w-full flex justify-center items-center sm:w-auto gap-2">
      <div className="flex justify-center items-center gap-2">
        {hasQueryParams && (
          <Button
            variant={"outline"}
            onClick={() => {
              setCategoryParams({ search: "" });
              setLocationParams({ search: "" });
            }}
          >
            <X />
          </Button>
        )}
        <div className="">
          <Select
            onValueChange={(value) => {
              setCategoryParams({ search: value });
            }}
          >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select
            onValueChange={(value) => {
              setLocationParams({ search: value });
            }}
          >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Location</SelectLabel>
                {locations.map((loc) => (
                  <SelectItem key={loc.id} value={loc.id}>
                    {loc.city}, {loc.country}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Search />
    </div>
  );
};

export default SearchFilterJobs;
