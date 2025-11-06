import { RegistryFile, FileTree } from "@/components/block-viewer"

/**
 * Creates a file tree structure from registry item files
 */
export function createFileTreeForRegistryItemFiles(
  files: Array<{ path: string; target?: string }>
): FileTree[] {
  const tree: FileTree[] = []

  for (const file of files) {
    const parts = file.path.split("/")
    let current = tree

    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1
      let node = current.find((n) => n.name === part)

      if (!node) {
        node = {
          name: part,
          path: isFile ? file.target ?? file.path : undefined,
          children: isFile ? undefined : [],
        }
        current.push(node)
      }

      if (!isFile && node.children) {
        current = node.children
      }
    })
  }

  return tree
}

/**
 * Sorts the file tree alphabetically with folders first
 */
export function sortFileTree(tree: FileTree[]): FileTree[] {
  return tree
    .sort((a, b) => {
      // Folders first
      if (a.children && !b.children) return -1
      if (!a.children && b.children) return 1
      // Then alphabetically
      return a.name.localeCompare(b.name)
    })
    .map((node) => ({
      ...node,
      children: node.children ? sortFileTree(node.children) : undefined,
    }))
}