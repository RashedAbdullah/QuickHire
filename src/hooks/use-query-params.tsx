"use client";

import { useMemo } from "react";

/**
 * useQueryParams
 *
 * Filters an object to remove empty or nullish values
 * and stringifies nested objects for safe URL use.
 *
 * @param options The raw options object to transform
 * @returns A memoized object of valid query parameters
 */
export function useQueryParams<T extends Record<string, any>>(
  options: T,
): Record<string, any> {
  const queryParams = useMemo(() => {
    return Object.fromEntries(
      Object.entries(options)
        .filter(([, v]) => v !== "" && v !== undefined && v !== null)
        .map(([k, v]) => [k, typeof v === "object" && v !== null ? v : v]),
    );
  }, [options]);

  return queryParams;
}
