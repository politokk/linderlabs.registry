import { cn } from "@/lib/utils";

interface SimpleColorBlockProps {
  name: string;
  className: string;
}

export function ColorBlock({ name, className }: SimpleColorBlockProps) {
  return (
    <div className="flex items-center gap-4">
      <div className={cn("size-24 rounded-lg border", className)} />
      <div>
        <div className="font-medium">{name}</div>
        <code className="font-mono text-muted-foreground text-sm">
          --{className.slice(3)}
        </code>
      </div>
    </div>
  );
}
