'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { categories } from '@/lib/tool'
import { useState } from 'react'

interface SidebarProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export function Sidebar({ selectedCategory, onSelectCategory }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={`pb-12 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className={`px-4 text-lg font-semibold tracking-tight ${isCollapsed ? 'hidden' : 'block'}`}>类别</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8">
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
          <div className="space-y-1">
            <Button
              variant={selectedCategory === 'all' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-4'}`}
              onClick={() => onSelectCategory('all')}
            >
              {isCollapsed ? '全部' : '所有工具'}
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'secondary' : 'ghost'}
                className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-4'}`}
                onClick={() => onSelectCategory(category)}
              >
                {isCollapsed ? category.slice(0, 2) : category}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
