import React, {ChangeEvent, useCallback} from 'react';
import {Box, Checkbox} from "@chakra-ui/react";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../reducers/tasks-reducer";
import {ActionTypeForTodolists} from "./Todolist";


type TaskPropsType = {
  id: string
  taskId: string
  isDone: boolean
  title: string
  dispatch: (action: ActionTypeForTodolists) => void
}


export const Task = React.memo((props: TaskPropsType) => {
  const onClickHandler = () => props.dispatch(removeTaskAC(props.id, props.taskId))
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    props.dispatch(changeTaskStatusAC(props.id, props.taskId, newIsDoneValue));
  }
  const onChangeTitleTask = useCallback((newTitle: string) => {
    props.dispatch(changeTaskTitleAC(props.id, props.taskId, newTitle))
  }, [props.taskId, props.dispatch, props.id])

  return <Box p='3' mt='2' mb='2' fontSize='18px' color={'gray.500'} bgColor={'teal.100'}
              borderRadius={5}
              listStyleType={'none'} textAlign={'right'} className={props.isDone ? "is-done" : ""}>

    <Checkbox onChange={onChangeHandler} defaultChecked={props.isDone} colorScheme='teal' float={'left'}
              mr={'5'}
              borderColor={'teal.500'}/>
    <EditableSpan title={props.title} onChangeTitle={onChangeTitleTask}/>...
    <EditIcon mr='10'/>
    <DeleteIcon onClick={onClickHandler} ml='3' color={"red.200"} float={'right'} mr={'3'} cursor='pointer'/>

  </Box>
})
