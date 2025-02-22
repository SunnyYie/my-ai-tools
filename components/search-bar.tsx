import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2 mb-8 mx-auto">
      <Input type="text" placeholder="搜索AI工具..." onChange={e => onSearch(e.target.value)} />
      <Button type="submit">
        <Search className="h-4 w-4 mr-2" />
        搜索
      </Button>
    </div>
  )
}
