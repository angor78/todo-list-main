import React, {ChangeEvent, useState} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";

export type EditableSpanPropsType = {
  title: string
  onChangeTitle: (newTitle: string) => void
}
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState<boolean>(false)
  let [title, setTitle] = useState<string>('xxxx')
  console.log('EditableSpan called')

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

  let status = useSelector<AppRootStateType, string | null>(state => state.app.status)
  return (
    editMode && status === 'succeeded' ?
      <input value={title} onChange={onChangeHandler} onBlur={updateTitle} autoFocus={true}/> :
      <span onDoubleClick={activateInput}>{props.title}</span>
  )
})