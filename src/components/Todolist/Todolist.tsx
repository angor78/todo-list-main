import React, {ChangeEvent} from 'react';
import {AddItemComponent} from "../AddItemComponent/AddItemComponent";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {FilterValuesType} from "../../App";
import {Box, Button, Checkbox, Heading} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  removeTodolist: (id: string) => void
  filter: FilterValuesType
  onChangeTitleTask: (taskId: string, newTitle: string, todolistId: string) => void
  onChangeTodolistTitle: (newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {


  const removeTodolist = () => props.removeTodolist(props.id)

  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

  function addTask(newTitle: string) {
    props.addTask(newTitle, props.id)
  }

  function onChangeTodolistTitle(newTitle: string) {
    props.onChangeTodolistTitle(newTitle, props.id)
  }

  return <div>
    <Box  minW='200' >
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
          <EditableSpan title={props.title} onChangeTitle={onChangeTodolistTitle} />
          <DeleteIcon onClick={removeTodolist} ml='3' color={"red.200"} float={'right'} mr={'3'} cursor='pointer'/>
        </Heading>
      </Box>

      <ul>
        {props.tasks.map(t => {
          const onClickHandler = () => props.removeTask(t.id, props.id)
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
          }

          function onChangeTitleTask(newTitle: string) {
            props.onChangeTitleTask(t.id, newTitle, props.id)
          }

          return <Box p='3' mt='2' mb='2' fontSize='18px' color={'gray.500'}  bg={"blackAlpha.100"} borderRadius={5} listStyleType={'none'} textAlign={'right'}>
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              {/*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*/}
              <Checkbox onChange={onChangeHandler} defaultChecked={t.isDone} colorScheme='teal' float={'left'} mr={'5'}/>
              <EditableSpan title={t.title} onChangeTitle={onChangeTitleTask} />...
              <EditIcon mr='10'/>
              <DeleteIcon onClick={onClickHandler} ml='3' color={"red.200"} float={'right'} mr={'3'} cursor='pointer'/>
            </li>
          </Box>
        })
        }
      </ul>
      <Box p='3' mt='5' mb='0' bgColor={'gray.100'} color={"teal.500"} borderRadius={5}>
        <AddItemComponent addItem={addTask}/>
      </Box>
    </Box>
  </div>
}