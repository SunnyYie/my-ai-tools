'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { convertFile } from '../lib/converter'
import { FileDropzone } from './file-dropzone'
import { Progress } from '@/components/ui/progress'
import { motion, AnimatePresence } from 'framer-motion'

export function FileUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'converting' | 'done' | 'error'>('idle')
  const [progress, setProgress] = useState(0)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile)
    setStatus('idle')
    setProgress(0)
    setDownloadUrl(null)
  }

  const handleConvert = async () => {
    if (file) {
      setStatus('converting')
      try {
        const result = await convertFile(file, p => setProgress(p))
        setDownloadUrl(result)
        setStatus('done')
      } catch (error) {
        console.error('Conversion error:', error)
        setStatus('error')
      }
    }
  }

  return (
    <div className="space-y-6 w-full max-w-md">
      <FileDropzone onFileSelect={handleFileSelect} />
      <AnimatePresence>
        {file && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <p className="text-sm text-gray-600">Selected file: {file.name}</p>
            <Button onClick={handleConvert} disabled={status === 'converting'} className="w-full">
              {status === 'converting' ? 'Converting...' : 'Convert to MP4'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {status !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <p className="text-sm font-medium text-gray-700">Status: {status}</p>
            <Progress value={progress} className="w-full" />
            {downloadUrl && (
              <Button asChild className="w-full">
                <a href={downloadUrl} download="converted.mp4">
                  Download MP4
                </a>
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
