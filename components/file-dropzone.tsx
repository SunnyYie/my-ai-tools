'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, File } from 'lucide-react'
import { motion } from 'framer-motion'

interface FileDropzoneProps {
  onFileSelect: (file: File) => void
}

export function FileDropzone({ onFileSelect }: FileDropzoneProps) {
  const [isDragActive, setIsDragActive] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0])
      }
    },
    [onFileSelect],
  )

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    accept: { 'video/mp4': ['.m4s'] },
    multiple: false,
  })

  return (
    <motion.div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'
      } ${isDragReject ? 'border-red-500 bg-red-100' : ''}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <input {...getInputProps()} />
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {isDragReject ? (
          <File className="mx-auto h-12 w-12 text-red-500" />
        ) : (
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
        )}
        <p className="mt-2 text-sm text-gray-600">
          {isDragReject ? 'This file type is not supported' : 'Drag and drop your .m4s file here, or click to select'}
        </p>
      </motion.div>
    </motion.div>
  )
}
