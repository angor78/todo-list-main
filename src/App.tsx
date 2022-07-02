// import React, {useReducer} from 'react';
// import './App.css';
// import {Todolist} from './components/Todolist/Todolist';
// import {v1} from 'uuid';
// import {Box, ChakraProvider} from "@chakra-ui/react"
// import HeaderWithAction from "./components/HeaderWithAction/HeaderWithAction";
// import {addTodolistAC, reducer} from "./reducers/reducer";
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
// export type StateType = {
//   todolists: Array<TodolistType>
//   tasks: AllTasksType
// }
//
// function App() {
//
//   let todolistId1 = v1();
//   let todolistId2 = v1();
//
//   let [state, dispatch] = useReducer(reducer, {
//     todolists: [
//       {id: todolistId1, title: "What to learn", filter: "all"},
//       {id: todolistId2, title: "What to buy", filter: "all"},
//     ],
//     tasks: {
//       [todolistId1]: [
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS", isDone: true},
//         {id: v1(), title: "React", isDone: false},
//         {id: v1(), title: "Redux", isDone: false},
//       ],
//       [todolistId2]: [
//         {id: v1(), title: "Milk", isDone: true},
//         {id: v1(), title: "React Book", isDone: true},
//       ]
//     }
//
//   });
//
//   function addTodolist(title: string) {
//     dispatch(addTodolistAC(title))
//   }
//
//   return (
//     <ChakraProvider>
//       <div className="App">
//         <HeaderWithAction addTodolist={addTodolist}/>
//         <Box alignItems={'top'} display={"flex"} flexWrap={'wrap'} justifyContent={'center'} minHeight={800}>
//           {state.todolists.map(tl => {
//             let allTodolistTasks = state.tasks[tl.id];
//             let tasksForTodolist = allTodolistTasks;
//
//             if (tl.filter === "active") {
//               tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
//             }
//             if (tl.filter === "completed") {
//               tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
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
//               dispatch={dispatch}
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
// export default App;
export default {}
