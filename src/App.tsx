import { useState, useMemo, useEffect } from 'react'
import { Markdown } from './markdown'

function App() {
  const [content, setContent] = useState<string>(window.localStorage.getItem('mk.mirumo.net') ?? defaultValue)

  const parser = useMemo(() => new Markdown(), [])
  const markdown = useMemo(() => parser.safeRender(content), [parser, content])

  useEffect(() => {

    if (content === '') {
      window.localStorage.removeItem('mk.mirumo.net')
    } else {
      window.localStorage.setItem('mk.mirumo.net', content)
    }
  }, [content])

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

const defaultValue = `
# Title 1
## Title 2
### Title 3
#### Title 4
##### Title 5
###### Title 6

<!-- 這是註解 -->

---

==這是標記==  
*這是斜體*   
**這是粗體**  

~下~標  
^上^標

[這是連結](https://seminar.nptucsai.org)

<details>
 <summary>也是可以 HTML</summary>
  <span id="test">
red word
</span>
<style>
#test { color: tomato; }
</style>
</details>

---

各種框框

:::info
Hello world
:::

:::error
Hello world
:::

:::warning
Hello world
:::

:::success
Hello world
:::

\`\`\`
框框
\`\`\`

> 引用框框
> > 框框裡的框框

---

- 這裡有清單
- 第二條



---

| A | B | C |
| - | - | - |
| table | BBBBB | test |
| table | CCCC | test |
| table | DDDD | test |

---

<script>
alert("這應該會被禁止")
</script>

---
`
