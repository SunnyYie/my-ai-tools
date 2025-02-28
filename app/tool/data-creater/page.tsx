'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { Copy, Download, RefreshCw } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { generateDataFromSchema, parseSchema } from '@/lib/data-creater'

const DEFAULT_SCHEMA = `{
  name: string,
  age: number,
  email: string,
  isActive: boolean,
  birthDate: date,
  subject: string,
  message: string
}`

export default function SchemaDataGenerator() {
  const [schema, setSchema] = useState(DEFAULT_SCHEMA)
  const [quantity, setQuantity] = useState(1)
  const [generatedData, setGeneratedData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [format, setFormat] = useState<'json' | 'csv'>('json')

  const handleGenerate = () => {
    try {
      const parsedSchema = parseSchema(schema)
      const data = generateDataFromSchema(parsedSchema, quantity)
      setGeneratedData(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate data')
      setGeneratedData(null)
    }
  }

  const copyToClipboard = () => {
    if (!generatedData) return

    let textToCopy = ''
    if (format === 'json') {
      textToCopy = JSON.stringify(generatedData, null, 2)
    } else {
      if (Array.isArray(generatedData)) {
        const headers = Object.keys(generatedData[0])
        textToCopy = headers.join(',') + '\n'
        generatedData.forEach(item => {
          textToCopy += headers.map(header => item[header]).join(',') + '\n'
        })
      } else {
        const headers = Object.keys(generatedData)
        textToCopy = headers.join(',') + '\n'
        textToCopy += headers.map(header => generatedData[header]).join(',') + '\n'
      }
    }

    navigator.clipboard.writeText(textToCopy)
  }

  const downloadData = () => {
    if (!generatedData) return

    let content = ''
    let fileExtension = ''

    if (format === 'json') {
      content = JSON.stringify(generatedData, null, 2)
      fileExtension = 'json'
    } else {
      if (Array.isArray(generatedData)) {
        const headers = Object.keys(generatedData[0])
        content = headers.join(',') + '\n'
        generatedData.forEach(item => {
          content += headers.map(header => item[header]).join(',') + '\n'
        })
      } else {
        const headers = Object.keys(generatedData)
        content = headers.join(',') + '\n'
        content += headers.map(header => generatedData[header]).join(',') + '\n'
      }
      fileExtension = 'csv'
    }

    const blob = new Blob([content], { type: format === 'json' ? 'application/json' : 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `generated-data.${fileExtension}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatDataForDisplay = () => {
    if (!generatedData) return ''

    if (format === 'json') {
      return JSON.stringify(generatedData, null, 2)
    } else {
      if (Array.isArray(generatedData)) {
        const headers = Object.keys(generatedData[0])
        let csvContent = headers.join(',') + '\n'
        generatedData.forEach(item => {
          csvContent += headers.map(header => item[header]).join(',') + '\n'
        })
        return csvContent
      } else {
        const headers = Object.keys(generatedData)
        let csvContent = headers.join(',') + '\n'
        csvContent += headers.map(header => generatedData[header]).join(',') + '\n'
        return csvContent
      }
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Schema Data Generator</CardTitle>
        <CardDescription>
          Enter your schema definition (JSON or TypeScript format) and generate sample data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="space-y-2">
            <Label htmlFor="schema">Schema Definition</Label>
            <Textarea
              id="schema"
              placeholder="Enter your schema..."
              value={schema}
              onChange={e => setSchema(e.target.value)}
              className="font-mono min-h-[150px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity ({quantity})</Label>
            <Slider
              id="quantity"
              min={1}
              max={100}
              step={1}
              value={[quantity]}
              onValueChange={values => setQuantity(values[0])}
              className="py-4"
            />
          </div>

          <div className="flex justify-between items-center gap-4">
            <Button onClick={handleGenerate} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Generate Data
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {generatedData && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Generated Data</Label>
                <div className="flex gap-2">
                  <Tabs value={format} onValueChange={v => setFormat(v as 'json' | 'csv')}>
                    <TabsList>
                      <TabsTrigger value="json">JSON</TabsTrigger>
                      <TabsTrigger value="csv">CSV</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              <Textarea readOnly value={formatDataForDisplay()} className="font-mono min-h-[200px]" />
            </div>
          )}
        </div>
      </CardContent>
      {generatedData && (
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" size="icon" onClick={copyToClipboard}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={downloadData}>
            <Download className="h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
