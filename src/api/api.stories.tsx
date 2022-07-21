import React, {useEffect, useState} from 'react';
import {TodolistsAPI} from "./todolists-api";
import {Badge, Box, Button, Input} from "@chakra-ui/react";


export default {
  title: 'Components/API',

}

export const GetTodolists = (props: any) => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    TodolistsAPI.getTodolist()
      .then(data => {
        setState(data.data)
      })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = (props: any) => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    TodolistsAPI.createTodolist('Yo')
      .then(data => {
        setState(data.data)
      })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = (props: any) => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '02f3484a-1da9-43fa-af5d-ba20b9033214'
    TodolistsAPI.deleteTodolist(todolistId)
      .then(data => {
        setState(data.data)
      })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolist = (props: any) => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = 'f7d91822-39c3-4a5d-b50b-fd7f853a0297'
    TodolistsAPI.updateTodolist(todolistId, '1111').then(data => {
      setState(data.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}


export const GetTasks = (props: any) => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = 'f7d91822-39c3-4a5d-b50b-fd7f853a0297'
    TodolistsAPI.getTasks(todolistId)
      .then(data => {
        setState(data.data)
      })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = (props: any) => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = 'f7d91822-39c3-4a5d-b50b-fd7f853a0297'
    TodolistsAPI.createTask(todolistId, '2222')
      .then(data => {
        setState(data.data)
      })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = (props: any) => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = 'f7d91822-39c3-4a5d-b50b-fd7f853a0297'
    const taskId = '5c09dbc9-caaf-4ecb-b32c-622633f6d888'
    TodolistsAPI.deleteTask(todolistId, taskId)
      .then(data => {
        setState(data.data)
      })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = (props: any) => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<any>('')
  const [taskId, setTaskId] = useState<any>('')
  const [title, setTitle] = useState<any>('')


  const updateTask = () => {
    TodolistsAPI.updateTask(todolistId, taskId, title)
      .then(data => {
        setState(data.data)
      })
  }


  return <div>
    <Box border={'1px'} borderColor={'red'} borderRadius={'lg'} p={'2'} mb={'2'}>
      <Badge colorScheme={'red'}>Response</Badge>
      {JSON.stringify(state)}
    </Box>
    <Box  border={'1px'} borderColor={'teal'} borderRadius={'lg'} p={'2'}>
      <Badge colorScheme={'teal'}>Tasks</Badge>
      <GetTasks/>
    </Box>
    <Badge colorScheme={'teal'}>todolistId</Badge>
    <Box >
      <Input type="text"
             value={todolistId}
             placeholder={'todolistId'}
             onChange={(e) => {
               setTodolistId(e.currentTarget.value)
             }}/>
      <Badge colorScheme={'teal'}>taskId</Badge>
      <Input type="text"
             placeholder={'taskId'}
             value={taskId}
             onChange={(e) => {
               setTaskId(e.currentTarget.value)
             }}/>
      <Badge colorScheme={'teal'}>title</Badge>
      <Input type="text"
             placeholder={'title'}
             value={title}
             onChange={e=>setTitle(e.currentTarget.value)}/>
    </Box>

    <Button onClick={updateTask} mt={'3'}>update task</Button>
  </div>
}





