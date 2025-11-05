import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cn } from "@/lib/utils";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";

type ComponentPreviewProps = {
  path: string;
  className?: string;
};

export const Preview = async ({ path, className }: ComponentPreviewProps) => {
  let code: string;
  let Component: React.ComponentType;

  // Try AI path first
  try {
    code = await readFile(
      join(
        process.cwd(),
        "registry",
        "new-york-v4",
        "examples",
        "ai",
        `${path}.tsx`
      ),
      "utf-8"
    );
    const module = await import(`@/registry/new-york-v4/examples/ai/${path}.tsx`);
    Component = module.default;
  } catch {
    // Fall back to examples path
    code = await readFile(
      join(
        process.cwd(),
        "registry",
        "new-york-v4",
        "examples",
        `${path}.tsx`
      ),
      "utf-8"
    );
    const module = await import(`@/registry/new-york-v4/examples/${path}.tsx`);
    Component = module.default;
  }

  const parsedCode = code
    .replace(/@repo\/shadcn-ui\//g, "@/")
    .replace(/@repo\//g, "@/components/ai-elements/");

  const sourceComponentNames =
    parsedCode
      .match(/@\/components\/ai-elements\/([^'"`]+)/g)
      ?.map((match) => match.replace("@/components/ai-elements/", "")) || [];

  const sourceComponents: { name: string; source: string }[] = [];

  for (const component of sourceComponentNames) {
    const fileName = component.includes("/")
      ? `${component}.tsx`
      : `${component}/index.tsx`;

    try {
      const source = await readFile(
        join(process.cwd(), "..", "..", "packages", fileName),
        "utf-8"
      );

      if (sourceComponents.some((s) => s.name === component)) {
        continue;
      }

      sourceComponents.push({ name: component, source });
    } catch {
      // skip packages that fail
    }
  }

  return (
    <Tabs items={["Preview", "Code"]}>
      <Tab className={cn("not-prose h-fit", className)}>
        <Component />
      </Tab>
      <Tab className="p-0">
        <div className="h-[600px] [&_.fd-scroll-container]:h-full [&_.fd-scroll-container]:max-h-none">
          <DynamicCodeBlock
            code={parsedCode}
            codeblock={{
              className: "bg-background size-full overflow-hidden border-none",
            }}
            lang="tsx"
          />
        </div>
      </Tab>
    </Tabs>
  );
};