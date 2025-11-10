import { BlockViewer, type RegistryFile } from "@/components/block-viewer";
import { createFileTreeForRegistryItemFiles } from "@/lib/file-tree-utils";
import { highlightCode } from "@/lib/highlight-code";
import { getRegistryItemWithContent } from "@/lib/registry";
import { cn } from "@/lib/utils";
import * as React from "react";

export async function BlockDisplay({
  name,
  hideToolbar = false,
}: {
  name: string;
  hideToolbar?: boolean;
}) {
  const item = await getCachedRegistryItem(name);

  if (!item?.files) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">
          No files found for this component.
        </p>
      </div>
    );
  }

  const [tree, highlightedFiles] = await Promise.all([
    getCachedFileTree(item.files),
    getCachedHighlightedFiles(item.files),
  ]);

  return (
    <BlockViewer
      item={item}
      tree={tree}
      highlightedFiles={highlightedFiles}
      hideToolbar={hideToolbar}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-2xl">{item.title}</h2>
          <p className="text-muted-foreground">{item.description}</p>
        </div>
      </div>
    </BlockViewer>
  );
}

const getCachedRegistryItem = React.cache(async (name: string) => {
  return await getRegistryItemWithContent(name);
});

const getCachedFileTree = React.cache(
  async (files: Array<{ path: string; target?: string }>) => {
    if (!files) {
      return null;
    }

    return createFileTreeForRegistryItemFiles(files);
  },
);

const getCachedHighlightedFiles = React.cache(async (files: RegistryFile[]) => {
  return await Promise.all(
    files.map(async (file) => ({
      ...file,
      highlightedContent: file.content
        ? await highlightCode(file.content)
        : undefined,
    })),
  );
});
