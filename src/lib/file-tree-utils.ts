import { RegistryFile, FileTree } from "@/components/block-viewer"

/**
 * Creates a file tree structure from registry item files
 * Uses the target path if available, otherwise falls back to the source path
 */
export function createFileTreeForRegistryItemFiles(
  files: Array<{ path: string; target?: string }>
): FileTree[] {
  const root: FileTree[] = []

  for (const file of files) {
    // Use target path if available (cleaner paths for display), otherwise use source path
    const displayPath = file.target ?? file.path
    const parts = displayPath.split("/")
    let currentLevel = root

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const isFile = i === parts.length - 1
      const existingNode = currentLevel.find((node) => node.name === part)

      if (existingNode) {
        if (isFile) {
          // Update existing file node with full path
          existingNode.path = displayPath
        } else {
          // Move to next level in the tree
          currentLevel = existingNode.children!
        }
      } else {
        const newNode: FileTree = isFile
          ? { name: part, path: displayPath }
          : { name: part, children: [] }

        currentLevel.push(newNode)

        if (!isFile) {
          currentLevel = newNode.children!
        }
      }
    }
  }

  return root
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