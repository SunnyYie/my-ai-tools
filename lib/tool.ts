export type Tool = {
  id: number
  name: string
  description: string
  category: string
  url?: string
}

export const tools: Tool[] = [
  {
    id: 0,
    name: 'JSON-i18n-config',
    description: 'JSON 国际化转换器',
    category: '文本工具',
    url: '/tool/JSON-i18n-config',
  },
  { id: 1, name: 'ChatGPT', description: 'OpenAI的强大语言模型，用于对话和文本生成。', category: '对话聊天' },
  { id: 2, name: 'FileChange', description: '文件切换器', category: '文本工具', url: '/tool/file-change' },
]

export const categories = Array.from(new Set(tools.map(tool => tool.category)))
