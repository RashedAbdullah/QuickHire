"use client";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { createSearchState } from "@/hooks/search-params";
import { SearchIcon } from "lucide-react";
import { Suspense, useTransition } from "react";

type SearchProps = {
  label?: string;
  description?: string;
  placeholder?: string;

  // make it reusable per page
  paramKey?: string; // default "search"
  defaultValue?: string; // default ""
  throttleMs?: number; // default 1000

  // optional: reset page when user types search
  resetPageKey?: string; // e.g. "page"
};

const SearchInput = ({
  label,
  description,
  placeholder,
  paramKey = "search",
  defaultValue = "",
  throttleMs = 1000,
  resetPageKey = "page",
}: SearchProps) => {
  const [isPending, startTransition] = useTransition();

  const { useSearchState } = createSearchState({
    key: paramKey,
    defaultValue,
  });

  const [{ search }, setParams] = useSearchState({ startTransition });
  return (
    <Field className="">
      {label && <FieldLabel htmlFor="search-input">{label}</FieldLabel>}

      <InputGroup>
        <InputGroupInput
          id="search-input"
          placeholder={placeholder || "Search..."}
          value={search}
          onChange={(e) => {
            const value = e.target.value;

            // reset page to 1 when searching (super useful for pagination)
            setParams(
              {
                search: value,
                ...(resetPageKey ? ({ [resetPageKey]: 1 } as any) : {}),
              },
              { throttleMs: value ? throttleMs : 0 },
            );
          }}
        />
        <InputGroupAddon align="inline-start">
          <SearchIcon className="text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>

      {description && <FieldDescription>{description}</FieldDescription>}
    </Field>
  );
};

const Search = ({
  label,
  description,
  placeholder,
  paramKey = "search",
  defaultValue = "",
  throttleMs = 1000,
  resetPageKey = "page",
}: SearchProps) => {
  return (
    <Suspense>
      <SearchInput
        label={label}
        description={description}
        placeholder={placeholder}
        paramKey={paramKey}
        defaultValue={defaultValue}
        throttleMs={throttleMs}
        resetPageKey={resetPageKey}
      />
    </Suspense>
  );
};

export default Search;
