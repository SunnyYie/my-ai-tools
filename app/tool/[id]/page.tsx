'use client'

import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { tools } from '@/lib/tool'

export default function ToolPage() {
  const params = useParams()
  const router = useRouter()
  const tool = tools.find(t => t.id === Number(params.id))

  if (!tool) {
    return <div>Tool not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> 返回
      </Button>
      <h1 className="text-4xl font-bold mb-4">{tool.name}</h1>
      <p className="text-xl mb-4">{tool.description}</p>
      <p className="text-lg">类别: {tool.category}</p>
    </div>
  )
}
