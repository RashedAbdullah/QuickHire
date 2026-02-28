import { cn } from "@/lib/utils";

const tagStyles: Record<string, string> = {
  "Full Time": "bg-tag-fulltime-bg text-tag-fulltime-fg",
  "Full-Time": "bg-tag-fulltime-bg text-tag-fulltime-fg",
  Marketing: "bg-tag-marketing-bg text-tag-marketing-fg",
  Design: "bg-tag-design-bg text-tag-design-fg",
  Business: "bg-tag-business-bg text-tag-business-fg",
  Technology: "bg-tag-technology-bg text-tag-technology-fg",
  Engineering: "bg-tag-technology-bg text-tag-technology-fg",
};

const JobTag = ({
  label,
  className,
}: {
  label: string;
  className?: string;
}) => (
  <span
    className={cn(
      "inline-block rounded px-3 py-1 text-xs font-medium",
      tagStyles[label] || "bg-muted text-muted-foreground",
      className,
    )}
  >
    {label}
  </span>
);

export default JobTag;
