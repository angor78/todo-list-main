import React from 'react';
import './App.css';
import {Todolist} from './components/Todolist/Todolist';
import {Box, ChakraProvider} from "@chakra-ui/react"
import HeaderWithAction from "./components/HeaderWithAction/HeaderWithAction";
import {addTodolistAC} from "./reducers/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type AllTasksType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {

  const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
  const tasks = useSelector<AppRootStateType,AllTasksType>(state => state.tasks)
  const dispatch = useDispatch()

  function addTodolist(newTitle: string) {
    let action = addTodolistAC(newTitle)
    dispatch(action)
  }

  return (
    <ChakraProvider>
      <div className="App">
        <HeaderWithAction addTodolist={addTodolist}/>
        <Box alignItems={'top'} display={"flex"} flexWrap={'wrap'} justifyContent={'center'} minHeight={800}>
          {todolists.map(tl => {
            let allTodolistTasks = tasks[tl.id];
            let tasksForTodolist = allTodolistTasks;

            if (tl.filter === "active") {
              tasksForTodolist = allTodolistTasks.filter((t: TaskType) => !t.isDone);
            }
            if (tl.filter === "completed") {
              tasksForTodolist = allTodolistTasks.filter((t: TaskType) => t.isDone);
            }

            return <Box key={tl.id}
                        minWidth={'350'}
                        display={"flex"}
                        overflow='hidden'
                        padding={10}
            ><Todolist
              key={tl.id}
              id={tl.id}
              title={tl.title}
              tasks={tasksForTodolist}
              filter={tl.filter}
              dispatch={dispatch}
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
