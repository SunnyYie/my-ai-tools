import { FileUploader } from '@/components/file-uploader'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">M4S to MP4 Converter</h1>
      <FileUploader />
    </main>
  )
}
