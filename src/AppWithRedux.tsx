import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './components/Todolist/Todolist';
import {Box, ChakraProvider, Progress} from "@chakra-ui/react"
import HeaderWithAction from "./components/HeaderWithAction/HeaderWithAction";
import {createTodolist, fetchTodolists, TodolistDomainType} from "./reducers/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./api/todolists-api";
import {RequestStatusType} from "./reducers/app-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type AllTasksType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {

  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, AllTasksType>(state => state.tasks)
  const dispatch = useDispatch<any>()

  const addTodolist = useCallback((newTitle: string) => {
    let action = createTodolist(newTitle)
    dispatch(action)
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchTodolists())
  }, [dispatch])

  const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

  return (
    <ChakraProvider>
      <div className="App">
        <HeaderWithAction addTodolist={addTodolist}/>
        {status === 'loading' && <Progress size='xs' isIndeterminate colorScheme={'teal'} mb='30'/>
        }

        <Box alignItems={'top'} display={"flex"} flexWrap={'wrap'} justifyContent={'center'} minHeight={800}>
          {todolists.map(tl => {

            return <Box key={tl.id}
                        minWidth={'350'}
                        display={"flex"}
                        overflow='hidden'
                        padding={10}>
              <Todolist
                key={tl.id}
                id={tl.id}
                title={tl.title}
                tasks={tasks[tl.id]}
                filter={tl.filter}
              />
            </Box>
          })
          }
        </Box>
      </div>
    </ChakraProvider>
  )
}

export default AppWithRedux;
