import React, {useCallback, useEffect} from 'react';
import './App.css';
import {ChakraProvider, Container, Progress} from "@chakra-ui/react"
import HeaderWithAction from "./components/HeaderWithAction/HeaderWithAction";
import {createTodolist} from "./reducers/todolist-reducer";
import {TaskType} from "./api/todolists-api";
import {Login} from "./components/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {TodolistsList} from "./components/TodolistsList";
import {authMe} from "./reducers/auth-reducer";
import {AppRootStateType, useAppDispatch} from "./state/store";
import {useSelector} from "react-redux";


export type FilterValuesType = "all" | "active" | "completed";
export type AllTasksType = {
  [key: string]: Array<TaskType>
}


function AppWithRedux() {
  let dispatch = useAppDispatch()


  const addTodolist = useCallback((newTitle: string) => {
    let action = createTodolist(newTitle)
    dispatch(action)
  }, [dispatch])

  useEffect(() => {
    dispatch(authMe())
  }, [dispatch])

  const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
  if (!isInitialized) {
    return (<h1>2222222222222222...........</h1>
      // <Progress size='xs' isIndeterminate colorScheme={'teal'} mb='30'/>
    )
  }


  return (
    <ChakraProvider>
      <div className="App">
        <HeaderWithAction addTodolist={addTodolist}/>
        <Routes>
          <Route path='/404' element={<Container color={'red'}><h1>404: PAGE NOT FOUND</h1></Container>}/>
          <Route path='*' element={<Navigate to={'/404'}/>}/>
          <Route path='/' element={<TodolistsList/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
    </ChakraProvider>
  )
}

export default AppWithRedux;
