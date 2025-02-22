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
  { id: 2, name: 'DALL-E', description: 'AI系统，可根据自然语言描述创建逼真的图像和艺术作品。', category: 'AI绘画' },
  { id: 3, name: 'Midjourney', description: 'AI驱动的工具，可根据文本描述生成图像。', category: 'AI绘画' },
  { id: 4, name: 'Jasper', description: 'AI写作助手，用于创建营销文案、社交媒体帖子等。', category: '文本工具' },
  { id: 5, name: 'Synthesia', description: 'AI视频生成平台，用于创建带有虚拟主持人的视频。', category: '视频工具' },
  { id: 6, name: 'Lumen5', description: '视频创作平台，可将博客文章转换为视频内容。', category: '视频工具' },
  { id: 7, name: 'GitHub Copilot', description: 'AI驱动的编程助手，提供代码建议和自动完成。', category: '编程工具' },
  { id: 8, name: 'Tabnine', description: '基于AI的代码完成工具，支持多种编程语言。', category: '编程工具' },
  { id: 9, name: 'Grammarly', description: 'AI驱动的写作助手，用于语法检查和风格改进。', category: '文本工具' },
  { id: 10, name: 'Replika', description: 'AI驱动的个人聊天机器人，提供情感支持和对话。', category: '对话聊天' },
]

export const categories = Array.from(new Set(tools.map(tool => tool.category)))
