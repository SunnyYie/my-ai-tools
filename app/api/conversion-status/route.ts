import { NextResponse } from 'next/server'

export async function GET() {
  const encoder = new TextEncoder()

  const readable = new ReadableStream({
    async start(controller) {
      for (let i = 0; i <= 100; i += 10) {
        const status = i === 100 ? 'done' : 'converting'
        const data = encoder.encode(`data: ${JSON.stringify({ status, progress: i })}\n\n`)
        controller.enqueue(data)
        await new Promise(resolve => setTimeout(resolve, 500))
      }
      controller.close()
    },
  })

  return new NextResponse(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
