import React, {useCallback} from 'react';
import {AddItemComponent} from "../AddItemComponent/AddItemComponent";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Box, Button, Heading} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  TodolistActionType
} from "../../reducers/todolist-reducer";
import {
  addTaskAC,
  TasksActionType
} from "../../reducers/tasks-reducer";
import {FilterValuesType, TaskType} from "../../AppWithRedux";
import {Task} from "./Task";

export type ActionTypeForTodolists = TodolistActionType | TasksActionType

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  dispatch: (action: ActionTypeForTodolists) => void
}

export const Todolist = React.memo((props: PropsType) => {
  console.log("Todolist called")

  const removeTodolist = () => props.dispatch(removeTodolistAC(props.id))
  let tasksForTodolist = props.tasks
  if (props.filter === "active") {
    tasksForTodolist = props.tasks.filter((t: TaskType) => !t.isDone);
  }
  if (props.filter === "completed") {
    tasksForTodolist = props.tasks.filter((t: TaskType) => t.isDone);
  }
  const onAllClickHandler = useCallback(() => props.dispatch(changeTodolistFilterAC(props.id, "all")), [changeTodolistFilterAC, props.id]);
  const onActiveClickHandler = useCallback(() => props.dispatch(changeTodolistFilterAC(props.id, "active")), [changeTodolistFilterAC, props.id])
  const onCompletedClickHandler = useCallback(() => props.dispatch(changeTodolistFilterAC(props.id, "completed",)), [changeTodolistFilterAC, props.id])

  const addTask = useCallback((newTitle: string) => {
    props.dispatch(addTaskAC(props.id, newTitle))
  }, [props.dispatch, props.id])

  const onChangeTodolistTitle = useCallback((newTitle: string) => {
    props.dispatch(changeTodolistTitleAC(props.id, newTitle))
  }, [props.dispatch, props.id])


  return <div>
    <Box minW='200'>
      <Box display={'inline-block'} color={'gray.500'}>
        <Button onClick={onAllClickHandler}
                backgroundColor={props.filter === 'all' ? "teal.100" : undefined}>All</Button>
        <Button onClick={onActiveClickHandler}
                backgroundColor={props.filter === 'active' ? "teal.100" : undefined}>Active</Button>
        <Button onClick={onCompletedClickHandler}
                backgroundColor={props.filter === 'completed' ? "teal.100" : undefined}>Completed</Button>
      </Box>
      <Box p='3' mt='5' mb='5' bgColor={'gray.100'} color={"teal.500"} borderRadius={5}>
        <Heading size='lg' fontSize='18px'>
          <EditIcon mr='3'/>...
          <EditableSpan title={props.title} onChangeTitle={onChangeTodolistTitle}/>
          <DeleteIcon onClick={removeTodolist} ml='3' color={"red.200"} float={'right'} mr={'3'} cursor='pointer'/>
        </Heading>
      </Box>

      {tasksForTodolist.map(t => {
        return <Task key={t.id}
                     id={props.id}
                     taskId={t.id}
                     isDone={t.isDone}
                     title={t.title}
                     dispatch={props.dispatch}/>
      })
      }

      <Box p='3' mt='5' mb='0' bgColor={'gray.100'} color={"teal.500"} borderRadius={5}>
        <AddItemComponent addItem={addTask}/>
      </Box>
    </Box>
  </div>
})