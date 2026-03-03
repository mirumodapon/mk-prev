import { useState, useMemo } from 'react'
import { Markdown } from './markdown'

function App() {
  const [content, setContent] = useState<string>('')

  const parser = useMemo(() => new Markdown(), [])
  const markdown = useMemo(() => parser.safeRender(content), [parser, content])

  return (
    <div className="w-full h-full grid grid-cols-2">
      <div className="h-full p-5 border-r">
        <textarea
          className="w-full h-full resize-none p-2 overflow-y-auto"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: markdown }}
        className="h-full prose max-w-none p-5 overflow-y-auto" />
    </div>
  )
}

export default App
