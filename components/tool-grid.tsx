import { ToolCard } from '@/components/tool-card'
import { tools } from '@/lib/tool'

interface ToolGridProps {
  selectedCategory: string
  searchQuery: string
}

export function ToolGrid({ selectedCategory, searchQuery }: ToolGridProps) {
  const filteredTools = tools.filter(tool => {
    const categoryMatch = selectedCategory === 'all' || tool.category === selectedCategory
    const searchMatch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    return categoryMatch && searchMatch
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTools.map(tool => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  )
}
