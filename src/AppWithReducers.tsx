// import React, {useReducer} from 'react';
// import './App.css';
// import {Todolist} from './components/Todolist/Todolist';
// import {v1} from 'uuid';
// import {Box, ChakraProvider} from "@chakra-ui/react"
// import HeaderWithAction from "./components/HeaderWithAction/HeaderWithAction";
// import {tasksReducer} from "./reducers/tasks-reducer";
// import {addTodolistAC, todolistReducer} from "./reducers/todolist-reducer";
//
//
// export type FilterValuesType = "all" | "active" | "completed";
// export type TodolistType = {
//   id: string
//   title: string
//   filter: FilterValuesType
// }
// export type TaskType = {
//   id: string
//   title: string
//   isDone: boolean
// }
// export type AllTasksType = {
//   [key: string]: Array<TaskType>
// }
//
// function AppWithReducers() {
//
//   let todolistId1 = v1();
//   let todolistId2 = v1();
//
//   let [todolists, dispatchTodolist] = useReducer(todolistReducer,
//     [
//       {id: v1(), title: "What to learn", filter: "all"},
//       {id: v1(), title: "What to buy", filter: "all"},
//     ])
//
//   let [tasks, dispatchTasks] = useReducer(tasksReducer, {
//     [todolists[0].id]:
//       [
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS", isDone: true},
//         {id: v1(), title: "React", isDone: false},
//         {id: v1(), title: "Redux", isDone: false},
//       ],
//     [todolists[1].id]:
//       [
//         {id: v1(), title: "Milk", isDone: true},
//         {id: v1(), title: "React Book", isDone: true},
//       ]
//   }as AllTasksType)
//
//
//   function addTodolist(newTitle: string) {
//     let action = addTodolistAC(newTitle)
//     dispatchTasks(action)
//     dispatchTodolist(action)
//   }
//
//   return (
//     <ChakraProvider>
//       <div className="App">
//         <HeaderWithAction addTodolist={addTodolist}/>
//         <Box alignItems={'top'} display={"flex"} flexWrap={'wrap'} justifyContent={'center'} minHeight={800}>
//           {todolists.map(tl => {
//             let allTodolistTasks = tasks[tl.id];
//             let tasksForTodolist = allTodolistTasks;
//
//             if (tl.filter === "active") {
//               tasksForTodolist = allTodolistTasks.filter((t:TaskType) => !t.isDone);
//             }
//             if (tl.filter === "completed") {
//               tasksForTodolist = allTodolistTasks.filter((t:TaskType) => t.isDone);
//             }
//
//             return <Box minWidth={'350'}
//                         display={"flex"}
//                         overflow='hidden'
//                         padding={10}
//             ><Todolist
//               key={tl.id}
//               id={tl.id}
//               title={tl.title}
//               tasks={tasksForTodolist}
//               filter={tl.filter}
//               dispatchTodolist={dispatchTodolist}
//               dispatchTasks={dispatchTasks}
//             />
//             </Box>
//           })
//           }
//         </Box>
//       </div>
//     </ChakraProvider>
//   )
//
// }
//
// export default AppWithReducers;
export{}