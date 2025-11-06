import { getRegistryItem } from "@/lib/registry"
import { BlockViewer, RegistryFile } from "@/components/block-viewer"
import { createFileTreeForRegistryItemFiles } from "@/lib/file-tree-utils"
import { cn } from "@/lib/utils"

export async function BlockDisplay({
  name,
  hideToolbar = false,
}: {
  name: string
  hideToolbar?: boolean
}) {
  const item = getRegistryItem(name)

  if (!item?.files) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">No files found for this component.</p>
      </div>
    )
  }

  // Create file tree from registry files
  const tree = createFileTreeForRegistryItemFiles(
    item.files.map((f) => ({
      path: f.path,
      target: f.target,
    }))
  )

  // Prepare files with content
  const highlightedFiles: RegistryFile[] = item.files.map((file) => ({
    ...file,
    highlightedContent: undefined, // Syntax highlighting can be added here
  }))

  return (
    <BlockViewer
      item={item}
      tree={tree}
      highlightedFiles={highlightedFiles}
      hideToolbar={hideToolbar}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">{item.title}</h2>
          <p className="text-muted-foreground">{item.description}</p>
        </div>
      </div>
    </BlockViewer>
  )
}