import React, {ChangeEvent, useState} from "react";

export type EditableSpanPropsType = {
  title: string
  onChangeTitle: (newTitle: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState<boolean>(false)
  let [title, setTitle] = useState<string>('xxxx')

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.currentTarget.value)
  }

  function updateTitle() {
    setEditMode(false)
    props.onChangeTitle(title)
  }

  function activateInput() {
    setEditMode(true)
    setTitle(props.title)
  }

  return (
    editMode ?
      <input value={title} onChange={onChangeHandler} onBlur={updateTitle} autoFocus={true}/> :
      <span onDoubleClick={activateInput}>{props.title}</span>
  )
}