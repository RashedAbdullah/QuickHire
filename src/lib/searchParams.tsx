import { parseAsString, createSearchParamsCache } from "nuqs/server";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const searchParams = {
  categoryId: parseAsString.withDefault(""),
  locationId: parseAsString.withDefault(""),
  chapter: parseAsString.withDefault(""),
};

export const loadSearchParams = createSearchParamsCache(searchParams);
