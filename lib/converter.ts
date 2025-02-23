import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

const ffmpeg = createFFmpeg({ log: true })

export async function convertFile(file: File, onProgress: (progress: number) => void): Promise<string> {
  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load()
  }

  ffmpeg.setProgress(({ ratio }) => {
    onProgress(ratio * 100)
  })

  ffmpeg.FS('writeFile', file.name, await fetchFile(file))

  await ffmpeg.run('-i', file.name, 'output.mp4')

  const data = ffmpeg.FS('readFile', 'output.mp4')
  const blob = new Blob([data.buffer as any], { type: 'video/mp4' })
  return URL.createObjectURL(blob)
}
