import React, {useCallback, useEffect} from 'react';
import './App.css';
import {ChakraProvider} from "@chakra-ui/react"
import HeaderWithAction from "./components/HeaderWithAction/HeaderWithAction";
import {createTodolist, fetchTodolists} from "./reducers/todolist-reducer";
import {useDispatch} from "react-redux";
import {TaskType} from "./api/todolists-api";
import {Login} from "./components/Login/Login";
import {Route, Routes} from "react-router-dom";
import {TodolistsList} from "./components/TodolistsList";

export type FilterValuesType = "all" | "active" | "completed";
export type AllTasksType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {


  const dispatch = useDispatch<any>()

  const addTodolist = useCallback((newTitle: string) => {
    let action = createTodolist(newTitle)
    dispatch(action)
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchTodolists())
  }, [dispatch])


  return (
    <ChakraProvider>
      <div className="App">
        <HeaderWithAction addTodolist={addTodolist}/>


        <Routes>
          <Route path='*' element={<h1>404: PAGE NOT FOUND</h1>}/>
          <Route path='/' element={<TodolistsList/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
    </ChakraProvider>
  )
}

export default AppWithRedux;
