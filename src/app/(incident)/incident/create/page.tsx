"use client"

import { useReducer, useState } from "react"
import { JSONContent } from "@tiptap/react"

import Editor from "@/components/editor"

enum EditorReducerAction {
  GET_HEADING,
  GET_CONTENT
}

interface EditorAction {
  key: EditorReducerAction
  payload: any
}

interface EditorState {
  heading: string
  contents: JSONContent
}

export default function CreateIncidentPage() {
  const initialState: EditorState = {
    heading: "",
    contents: {}
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  function reducer(state: EditorState, action: EditorAction) {
    switch (action.key) {
      case EditorReducerAction.GET_HEADING:
        return { ...state, heading: action.payload }
      case EditorReducerAction.GET_CONTENT:
        return { ...state, content: action.payload }
      default:
        return state
    }
  }

  return (
    <div>
      <h1>Create Incident Report</h1>

      <button onClick={() => console.log(state)}>upload</button>

      <Editor
        heading={heading =>
          dispatch({ key: EditorReducerAction.GET_HEADING, payload: heading })
        }
        contents={content =>
          dispatch({ key: EditorReducerAction.GET_CONTENT, payload: content })
        }
      />
    </div>
  )
}
