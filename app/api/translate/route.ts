import crypto from 'crypto'

const appid = process.env.BAIDU_APP_ID!
const key = process.env.BAIDU_SECRET_KEY!
const endpoint = 'https://fanyi-api.baidu.com/api/trans/vip/translate'

function generateSign(query: string, salt: string, appid: string, key: string) {
  const str = appid + query + salt + key
  return crypto.createHash('md5').update(str).digest('hex')
}

async function translate(query: string, from: string, to: string) {
  const salt = Date.now().toString()
  const sign = generateSign(query, salt, appid, key)

  const url = new URL(endpoint)
  url.searchParams.append('q', query)
  url.searchParams.append('from', from)
  url.searchParams.append('to', to)
  url.searchParams.append('appid', appid)
  url.searchParams.append('salt', salt)
  url.searchParams.append('sign', sign)

  const response = await fetch(url)
  const data = await response.json()

  if (data.error_code) {
    throw new Error(`Translation error: ${data.error_msg}`)
  }

  return data.trans_result[0].dst
}

async function translateJson(jsonObj: Record<string, any>, from: string, to: string) {
  const result: Record<string, any> = {}

  for (const [key, value] of Object.entries(jsonObj)) {
    if (typeof value === 'string' && value !== '') {
      if (key === 'name') {
        result[key] = value
      } else {
        result[key] = await translate(value, from, to)
      }
    } else {
      result[key] = value
    }
  }

  return result
}

export async function POST(request: Request) {
  try {
    const { json, from, to } = await request.json()

    // 验证输入的JSON格式
    let parsedJson
    try {
      parsedJson = typeof json === 'string' ? JSON.parse(json) : json
    } catch (e) {
      return Response.json({ error: 'Invalid JSON format' }, { status: 400 })
    }

    const result = await translateJson(parsedJson, from, to)
    return Response.json({ result })
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
