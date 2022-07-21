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
  const createTodolist = (todolistId: string, taskId: string, title: string) => {
    TodolistsAPI.createTodolist(title)
      .then(data => {
        setState(data.data)
      })
  }
  return <Display state={state}
                  setState={setState}
                  name={'createTodolist'}
                  action={createTodolist}/>
}

export const DeleteTodolist = (props: any) => {
  const [state, setState] = useState<any>(null)
  const deleteTodolist = (todolistId: string, taskId: string, title: string) => {
    TodolistsAPI.deleteTodolist(todolistId)
      .then(data => {
        setState(data.data)
      })
  }
  return <Display state={state}
                  setState={setState}
                  name={'deleteTodolist'}
                  action={deleteTodolist}/>
}

export const UpdateTodolist = (props: any) => {
  const [state, setState] = useState<any>(null)
  const updateTodolist = (todolistId: string, taskId: string, title: string) => {
    // const todolistId = 'f7d91822-39c3-4a5d-b50b-fd7f853a0297'
    TodolistsAPI.updateTodolist(todolistId, title).then(data => {
      setState(data.data)
    })
  }
  return <Display state={state}
                  setState={setState}
                  name={'updateTodolist'}
                  action={updateTodolist}/>
}


export const GetTasks = (props: any) => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = 'f7d91822-39c3-4a5d-b50b-fd7f853a0297'
    TodolistsAPI.getTasks(props.todolistId ? props.todolistId : todolistId)
      .then(data => {
        setState(data.data)

      })
  }, [props.todolistId])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = (props: any) => {
  const [state, setState] = useState<any>(null)
  const createTask = (todolistId: string, taskId: string, title: string) => {
    TodolistsAPI.createTask(todolistId, title)
      .then(data => {
        setState(data.data)
      })
  }
  return <Display state={state}
                  setState={setState}
                  name={'createTask'}
                  action={createTask}/>
}

export const DeleteTask = (props: any) => {
  const [state, setState] = useState<any>(null)


  const deleteTask = (todolistId: string, taskId: string, title: string) => {
    TodolistsAPI.deleteTask(todolistId, taskId)
      .then(data => {
        setState(data.data)
      })
  }
  return <Display state={state}
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

  return <Display state={state}
                  setState={setState}
                  name={'update task'}
                  action={updateTask}/>
}


const Display = (props: any) => {
  const [todolistId, setTodolistId] = useState<any>('f7d91822-39c3-4a5d-b50b-fd7f853a0297')
  const [taskId, setTaskId] = useState<any>('taskId')
  const [title, setTitle] = useState<any>('title')

  const onClickHandler = () => {
    props.action(todolistId, taskId, title)
  }
  return (
    <Box>
      <Box border={'1px'} borderColor={'red'} borderRadius={'lg'} p={'2'} mb={'2'}>
        <Badge colorScheme={'red'}>Response</Badge>
        {JSON.stringify(props.state)}
      </Box>
      <Box display={'flex'} flexDirection={'row'} fontSize={'12'}>
        <Box w={'500px'} border={'1px'} borderColor={'teal'} borderRadius={'lg'} p={'2'} mr={'5'}>
          <Badge colorScheme={'teal'}>Todolists</Badge>
          <GetTodolists/>
        </Box>
        <Box w={'500px'}
             border={'1px'}
             borderColor={'teal'}
             borderRadius={'lg'}
             p={'2'}>
          <Badge colorScheme={'teal'}>Tasks</Badge>
          <GetTasks todolistId={todolistId}/>
        </Box>
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





