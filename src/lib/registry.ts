import registry from "@/registry";

export interface RegistryFile {
  path: string;
  type: string;
  target?: string;
  content?: string;
}

export interface Component {
  name: string;
  type: string;
  title: string;
  icon?: string;
  description?: string;
  files?: RegistryFile[];
  isNew?: boolean;
  meta?: {
    iframeHeight?: number;
    containerClassName?: string;
    mobile?: "component" | "image";
  };
}

export function getRegistryItems(): Component[] {
  // exclude style item as it's not relevant to show in the ui
  const components = registry.items.filter(
    (item) => item.type !== "registry:style",
  );

  return components as Component[];
}

export function getRegistryItem(name: string): Component {
  const components = getRegistryItems();

  const component = components.find(
    (item: { name: string }) => item.name === name,
  );

  if (component == null) {
    throw new Error(`Component "${name}" not found`);
  }

  return component;
}

/**
 * Fetches the full registry item with file contents from the built registry
 * This reads directly from the public/r directory where the built registry files are stored
 */
export async function getRegistryItemWithContent(
  name: string,
): Promise<Component> {
  try {
    // In production/build, read from the public directory
    // Next.js will serve files from public/ at the root
    const fs = await import("node:fs/promises");
    const path = await import("node:path");

    const filePath = path.join(process.cwd(), "public", "r", `${name}.json`);
    const fileContent = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(fileContent);

    return data as Component;
  } catch (error) {
    console.error(
      `Failed to fetch registry item with content for "${name}":`,
      error,
    );
    // Fallback to the basic registry without content
    return getRegistryItem(name);
  }
}

export function getBlocks() {
  return getRegistryItems().filter(
    (component) => component.type === "registry:block",
  );
}

export function getUIPrimitives() {
  return getRegistryItems().filter(
    (component) => component.type === "registry:ui",
  );
}

export function getComponents() {
  return getRegistryItems().filter(
    (component) => component.type === "registry:component",
  );
}

export function getDemos() {
  return getRegistryItems().filter(
    (component) => component.type === "registry:demo",
  );
}
