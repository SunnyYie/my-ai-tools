import { faker } from '@faker-js/faker'

type SchemaType = {
  [key: string]: string
}

// 解析模式字符串（支持 JSON 和 TypeScript 格式）
export function parseSchema(schemaStr: string): SchemaType {
  try {
    // 移除可能的 interface 或 type 定义
    schemaStr = schemaStr.replace(/^(interface|type)\s+\w+\s*/, '')

    // 移除开头和结尾的花括号，并分割成行
    const cleaned = schemaStr.replace(/^\{|\}$/g, '').trim()
    const lines = cleaned.split(/[,\n]/).filter(line => line.trim())

    // 解析每一行
    const schema: SchemaType = {}
    for (const line of lines) {
      const [key, type] = line.split(':').map(part => part.trim())
      if (!key || !type) {
        throw new Error(`Invalid schema format in line: ${line}`)
      }
      // 移除可选标记和其他 TypeScript 特定语法
      const cleanKey = key.replace('?', '')
      const cleanType = type.replace(/;$/, '').toLowerCase()
      schema[cleanKey] = cleanType
    }

    return schema
  } catch (error) {
    throw new Error('Failed to parse schema: ' + (error instanceof Error ? error.message : 'Invalid format'))
  }
}

// 根据字段类型生成数据
function generateValueForType(type: string): any {
  switch (type.toLowerCase()) {
    case 'string':
      return faker.lorem.word()
    case 'text':
      return faker.lorem.paragraph()
    case 'number':
      return faker.number.int({ min: 0, max: 1000 })
    case 'boolean':
      return faker.datatype.boolean()
    case 'date':
      return faker.date.past().toISOString()
    case 'email':
      return faker.internet.email()
    case 'name':
      return faker.person.fullName()
    case 'phone':
      return faker.phone.number()
    case 'url':
      return faker.internet.url()
    case 'address':
      return faker.location.streetAddress()
    case 'city':
      return faker.location.city()
    case 'country':
      return faker.location.country()
    case 'zipcode':
      return faker.location.zipCode()
    case 'color':
      return faker.internet.color()
    case 'company':
      return faker.company.name()
    case 'id':
      return faker.string.uuid()
    case 'image':
      return faker.image.url()
    case 'title':
      return faker.lorem.sentence()
    case 'description':
      return faker.lorem.paragraph()
    case 'price':
      return faker.commerce.price()
    case 'username':
      return faker.internet.userName()
    case 'password':
      return faker.internet.password()
    case 'avatar':
      return faker.image.avatar()
    default:
      // 对于未知类型，默认生成字符串
      return faker.lorem.word()
  }
}

// 生成数据
export function generateDataFromSchema(schema: SchemaType, quantity = 1): any {
  const generateOne = () => {
    const result: { [key: string]: any } = {}
    for (const [key, type] of Object.entries(schema)) {
      result[key] = generateValueForType(type)
    }
    return result
  }

  return quantity === 1 ? generateOne() : Array.from({ length: quantity }, generateOne)
}
