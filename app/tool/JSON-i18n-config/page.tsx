'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, ClipboardCopy, ArrowRightLeft, ArrowLeft } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function TranslatorPage() {
  const [inputJson, setInputJson] = useState('{\n  "name": "mcgdg",\n  "title": "博客"\n}')
  const [outputJson, setOutputJson] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [direction, setDirection] = useState<'zh2en' | 'en2zh'>('zh2en')

  const router = useRouter()

  const handleTranslate = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          json: inputJson,
          from: direction === 'zh2en' ? 'zh' : 'en',
          to: direction === 'zh2en' ? 'en' : 'zh',
        }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setOutputJson(JSON.stringify(data.result, null, 2))
    } catch (error: any) {
      toast.error('翻译失败')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(outputJson)
    toast.success('复制成功')
  }

  const toggleDirection = () => {
    setDirection(prev => (prev === 'zh2en' ? 'en2zh' : 'zh2en'))
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> 返回
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>JSON 国际化转换器</CardTitle>
          <CardDescription>支持中英文 JSON 配置文件的相互转换，自动保留 name 字段不翻译</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <Textarea
              placeholder="请输入要翻译的 JSON"
              value={inputJson}
              onChange={e => setInputJson(e.target.value)}
              className="min-h-[200px] font-mono"
            />
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={toggleDirection} className="gap-2">
                <ArrowRightLeft className="h-4 w-4" />
                {direction === 'zh2en' ? '中文 → 英文' : '英文 → 中文'}
              </Button>
              <Button onClick={handleTranslate} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                翻译
              </Button>
            </div>
            <Textarea placeholder="翻译结果" value={outputJson} readOnly className="min-h-[200px] font-mono" />
            {outputJson && (
              <Button variant="outline" onClick={handleCopy} className="gap-2">
                <ClipboardCopy className="h-4 w-4" />
                复制结果
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
