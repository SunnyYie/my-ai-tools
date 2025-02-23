'use server'

import { writeFile } from 'fs/promises'
import { join } from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function convertFile(formData: FormData) {
  const file = formData.get('file') as File
  if (!file) {
    throw new Error('No file uploaded')
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const inputPath = join(process.cwd(), 'public', 'uploads', file.name)
  const outputPath = join(process.cwd(), 'public', 'uploads', `${file.name.replace('.m4s', '')}.mp4`)

  await writeFile(inputPath, buffer)

  try {
    await execAsync(`ffmpeg -i ${inputPath} -c copy ${outputPath}`)
    return { success: true, outputPath }
  } catch (error) {
    console.error('Conversion error:', error)
    return { success: false, error: 'Conversion failed' }
  }
}
