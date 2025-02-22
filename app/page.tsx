'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { ToolGrid } from '@/components/tool-grid'
import { SearchBar } from '@/components/search-bar'
import { Sidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 flex">
        <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
          <Sidebar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        </div>
        <main className="flex-1 md:ml-8">
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <h1 className="text-4xl font-bold text-center flex-grow">AI工具库</h1>
          </div>
          <SearchBar onSearch={setSearchQuery} />
          <ToolGrid selectedCategory={selectedCategory} searchQuery={searchQuery} />
        </main>
      </div>
    </div>
  )
}
