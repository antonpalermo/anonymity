"use client"

import { KeyboardEvent, useEffect } from "react"
import {
  useEditor,
  EditorContent,
  JSONContent,
  Editor as TiptapEditor,
  EditorEvents
} from "@tiptap/react"

import { PreventNewLine } from "@/components/editor/extensions"

import Text from "@tiptap/extension-text"
import Heading from "@tiptap/extension-heading"
import Document from "@tiptap/extension-document"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { Transaction } from "@tiptap/pm/state"

interface EditorProps {
  editable?: boolean
  heading: (heading: string) => void
  contents: (contents: JSONContent) => void
}

export default function Editor({
  heading,
  contents,
  editable = true
}: EditorProps) {
  const headingEditor = useEditor({
    extensions: [
      Text,
      Document.extend({
        content: "heading"
      }),
      PreventNewLine,
      Placeholder.configure({
        placeholder: "Untitled Document"
      }),
      Heading.configure({
        levels: [1]
      })
    ],
    editable,
    onUpdate: onUpdateHeading
  })

  const contentEditor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder: "Write something..."
      }),
      StarterKit.configure({
        heading: { levels: [2] }
      })
    ],
    editable,
    onUpdate: onUpdateContent
  })

  function onUpdateHeading({ editor }: EditorEvents["update"]) {
    if (!headingEditor || !contentEditor) return
    heading(editor.getText())
  }

  function onUpdateContent({ editor }: EditorEvents["update"]) {
    if (!headingEditor || !contentEditor) return
    contents(editor.getJSON())
  }

  function handleHeadingKeydown(event: KeyboardEvent<HTMLDivElement>): void {
    if (!headingEditor || !contentEditor) return

    const selection = headingEditor?.state.selection

    if (event.shiftKey) {
      return
    }

    if (event.key === "Enter" || event.key === "ArrowDown") {
      contentEditor.commands.focus("start")
    }

    if (event.key === "ArrowRight") {
      if (selection.$head.nodeAfter === null) {
        contentEditor.commands.focus("start")
      }
    }
  }

  function handleContentKeydown(event: KeyboardEvent<HTMLDivElement>): void {
    if (!headingEditor || !contentEditor) return
    const selection = contentEditor?.state.selection

    if (event.shiftKey) {
      return
    }

    if (
      event.key === "ArrowUp" ||
      (event.key === "Backspace" && contentEditor.isEmpty)
    ) {
      headingEditor.commands.focus("end")
    }

    if (event.key === "ArrowLeft") {
      if (selection.$head.nodeBefore === null) {
        headingEditor.commands.focus("end")
      }
    }
  }

  useEffect(() => {
    if (!headingEditor || !contentEditor) return

    if (editable) {
      headingEditor.setEditable(editable)
      contentEditor.setEditable(editable)
    }
  }, [editable])

  return (
    <div className="">
      <EditorContent editor={headingEditor} onKeyDown={handleHeadingKeydown} />
      <EditorContent editor={contentEditor} onKeyDown={handleContentKeydown} />
    </div>
  )
}
