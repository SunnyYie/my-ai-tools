'use client'

import { useState, useEffect } from 'react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'

export function ConversionStatus() {
  const [status, setStatus] = useState<'idle' | 'converting' | 'done' | 'error'>('idle')
  const [progress, setProgress] = useState(0)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  useEffect(() => {
    const eventSource = new EventSource('/api/conversion-status')

    eventSource.onmessage = event => {
      const data = JSON.parse(event.data)
      setStatus(data.status)
      setProgress(data.progress)
      if (data.downloadUrl) {
        setDownloadUrl(data.downloadUrl)
      }
    }

    return () => {
      eventSource.close()
    }
  }, [])

  return (
    <div className="mt-8 space-y-4">
      <Progress value={progress} className="w-[300px]" />
      <p>Status: {status}</p>
      {downloadUrl && (
        <Button asChild>
          <a href={downloadUrl} download>
            Download MP4
          </a>
        </Button>
      )}
    </div>
  )
}
