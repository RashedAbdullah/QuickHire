import {
  ArrowRight,
  Palette,
  BarChart3,
  Megaphone,
  Wallet,
  Monitor,
  Code2,
  Briefcase,
  Users,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Palette,
  BarChart3,
  Megaphone,
  Wallet,
  Monitor,
  Code2,
  Briefcase,
  Users,
};

interface CategoryCardProps {
  name: string;
  count: number;
  icon: string;
  highlighted?: boolean;
}

const CategoryCard = ({
  name,
  count,
  icon,
  highlighted,
}: CategoryCardProps) => {
  const Icon = iconMap[icon] || Briefcase;

  return (
    <div
      className={`group flex cursor-pointer flex-col gap-4 rounded border p-6 transition-all hover:shadow-md ${
        highlighted
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground hover:border-primary"
      }`}
    >
      <Icon
        className={`h-8 w-8 ${highlighted ? "text-primary-foreground" : "text-primary"}`}
      />
      <div>
        <h3 className="text-base font-semibold">{name}</h3>
        <div className="mt-1 flex items-center gap-2 text-sm">
          <span
            className={
              highlighted
                ? "text-primary-foreground/80"
                : "text-muted-foreground"
            }
          >
            {count} jobs available
          </span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
