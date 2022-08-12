import React, {useCallback} from 'react';
import {AddItemComponent} from "../AddItemComponent/AddItemComponent";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Box, Button, Heading} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {
  changeTodolistFilterAC, deleteTodolist,
  updateTodolist
} from "../../reducers/todolist-reducer";
import {
  createTask
} from "../../reducers/tasks-reducer";
import {FilterValuesType} from "../../AppWithRedux";
import {Task} from "./Task";
import {TaskType} from "../../api/todolists-api";
import {useAppDispatch} from "../../state/store";
import {RequestStatusType} from "../../reducers/app-reducer";


type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

export const Todolist = React.memo((props: PropsType) => {
  let dispatch = useAppDispatch()

  const removeTodolist = () => dispatch(deleteTodolist(props.id))
  let tasksForTodolist = props.tasks
  if (props.filter === "active") {
    tasksForTodolist = props.tasks.filter((t: TaskType) => t.status === 0);
  }
  if (props.filter === "completed") {
    tasksForTodolist = props.tasks.filter((t: TaskType) => t.status === 1);
  }
  const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(props.id, "all")), [dispatch, props.id]);
  const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(props.id, "active")), [dispatch, props.id])
  const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(props.id, "completed",)), [dispatch, props.id])

  const addTask = useCallback((newTitle: string) => {
    dispatch(createTask(props.id, newTitle))
  }, [dispatch, props.id])

  const onChangeTodolistTitle = useCallback((newTitle: string) => {
    dispatch(updateTodolist(props.id, newTitle))
  }, [dispatch, props.id])


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
          <DeleteIcon onClick={removeTodolist}
                      ml='3'
                      color={props.entityStatus !== 'loading' ? "red.200" : 'gray.300'}
                      float={'right'}
                      mr={'3'}
                      cursor='pointer'
                      focusable={props.entityStatus === 'succeeded'}/>
        </Heading>
      </Box>

      {tasksForTodolist.map(t => {
        return <Task key={t.id}
                     id={props.id}
                     taskId={t.id}
                     status={t.status}
                     title={t.title}
                     entityStatus={props.entityStatus}
        />
      })
      }

      <Box p='3' mt='5' mb='0' bgColor={'gray.100'} color={"teal.500"} borderRadius={5}>
        <AddItemComponent addItem={addTask}/>
      </Box>
    </Box>
  </div>
})