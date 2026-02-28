import { useQueryStates } from "nuqs";
import { parseAsString } from "nuqs/server";
import type { Options } from "nuqs";

export function createSearchState(config?: {
  key?: string;
  defaultValue?: string;
}) {
  const key = config?.key ?? "search";
  const defaultValue = config?.defaultValue ?? "";

  // IMPORTANT: urlKeys maps your internal key -> actual URL param
  const searchParams = {
    search: parseAsString.withDefault(defaultValue),
  } as const;

  const urlKeys = {
    search: key,
  } as const;

  const useSearchState = (options: Options = {}) =>
    useQueryStates(searchParams, {
      ...options,
      shallow: false,
      urlKeys,
    });

  return { useSearchState, urlKeys };
}