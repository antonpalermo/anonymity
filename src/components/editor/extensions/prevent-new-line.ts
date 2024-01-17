import { Extension } from "@tiptap/react"
import { Plugin, PluginKey } from "@tiptap/pm/state"

export const PreventNewLine = Extension.create({
  name: "preventNewLine",
  addProseMirrorPlugins: () => {
    return [
      new Plugin({
        key: new PluginKey("preventNewLine"),
        props: {
          handleKeyDown: (_, event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              return true
            }
            return false
          }
        }
      })
    ]
  }
})
