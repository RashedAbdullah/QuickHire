"use client";

import { Search, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Searchbar = ({
  locations,
}: {
  locations: { id: string; city: string; country: string }[];
}) => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");

  const onSearchChange = (value: string) => {
    setSearchTerm(value);
  };
  const onLocationChange = (value: string) => {
    setLocation(value);
  };
  const onSearch = () => {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/jobs?search=${encodeURIComponent(searchTerm)}&location=${encodeURIComponent(location)}`,
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded bg-card p-4 md:flex-row md:items-center"
    >
      <div className="flex flex-1 items-center gap-2 border-b border-border pb-3 md:border-b-0 md:border-r md:pb-0 md:pr-4">
        <Search className="h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Job title or keyword"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </div>
      <div className="flex flex-1 items-center gap-2 pb-3 md:pb-0 md:px-4">
        <MapPin className="h-5 w-5 text-muted-foreground" />
        <select
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className="w-full appearance-none bg-transparent text-sm text-foreground focus:outline-none"
        >
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.city}, {loc.country}
            </option>
          ))}
        </select>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </div>
      <Button onClick={onSearch} className="w-full md:w-auto">
        Search my job
      </Button>
    </form>
  );
};

export default Searchbar;
