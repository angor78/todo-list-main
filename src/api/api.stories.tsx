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
  const createTask= (todolistId:string, title:string) => {
    TodolistsAPI.createTask(todolistId, title)
      .then(data => {
        setState(data.data)
      })
  }
  return <DisplayTasks state={state}
                  setState={setState}
                  name={'createTask'}
                  action={createTask}/>
}

export const DeleteTask = (props: any) => {
  const [state, setState] = useState<any>(null)


  const deleteTask = (todolistId: string, taskId: string) => {
    TodolistsAPI.deleteTask(todolistId, taskId)
      .then(data => {
        setState(data.data)
      })
  }
  return <DisplayTasks state={state}
                  setState={setState}
                  name={'deleteTask'}
                  action={deleteTask}/>
}

export const UpdateTask = (props: any) => {
  const [state, setState] = useState<any>(null)
  const updateTask = (todolistId: string, taskId: string, title: string) => {
    TodolistsAPI.updateTask(todolistId, taskId, title)
      .then(data => {
        setState(data.data)
      })
  }

  return <DisplayTasks state={state}
                  setState={setState}
                  name={'update task'}
                  action={updateTask}/>
}




const DisplayTasks = (props: any) => {
  const [todolistId, setTodolistId] = useState<any>('')
  const [taskId, setTaskId] = useState<any>('')
  const [title, setTitle] = useState<any>('')

  const onClickHandler = () => {
    props.action(todolistId, taskId, title)
  }
  return (
    <Box>
      <Box border={'1px'} borderColor={'red'} borderRadius={'lg'} p={'2'} mb={'2'}>
        <Badge colorScheme={'red'}>Response</Badge>
        {JSON.stringify(props.state)}
      </Box>

      <Box border={'1px'} borderColor={'teal'} borderRadius={'lg'} p={'2'}>
        <Badge colorScheme={'teal'}>Tasks</Badge>
        <GetTasks />
      </Box>

      <Badge colorScheme={'teal'}>todolistId</Badge>
      <Box>
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
               onChange={e => setTitle(e.currentTarget.value)}/>
      </Box>
      <Button onClick={onClickHandler} mt={'3'}>{props.name}</Button>
    </Box>
  )
}





