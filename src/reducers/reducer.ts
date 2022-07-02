// import { FilterValuesType, StateType, TodolistType} from "../App";
// import {v1} from "uuid";
//
// export const reducer = (state: StateType, action: ActionType): StateType => {
//   switch (action.type) {
//     case 'REMOVE-TASK':
//       return {...state, tasks:{...state.tasks,[action.todolistId]:state.tasks[action.todolistId].filter(t => t.id !== action.id)}}
//     case 'ADD-TASK':
//       let newTask = {id: v1(), title: action.title, isDone: false}
//       return {...state,
//       tasks:{...state.tasks,[action.todolistId]:[newTask,...state.tasks[action.todolistId]]}}
//     case 'CHANGE-TITLE-TASK':
//       return {...state,
//         tasks:{...state.tasks,
//           [action.todolistId]: state.tasks[action.todolistId].map(el=>el.id===action.id?{...el,title:action.newTitle}:el)}}
//     case 'CHANGE-FILTER':
//       return {...state,
//         todolists:state.todolists.map(el=>el.id===action.todolistId?{...el,filter:action.value}:el)}
//     case 'CHANGE-TDL-TITLE':
//       return {...state,
//       todolists:state.todolists.map(el=>el.id===action.todolistId?{...el,title:action.newTitle}:el)}
//     case 'ADD-TDL':
//       let todolist: TodolistType = {id: v1(), title: action.title, filter: "all"};
//       return {...state,
//         todolists: [todolist, ...state.todolists], tasks: {[todolist.id]: [], ...state.tasks}}
//     case 'REMOVE-TDL':
//       let todolistCopy = (state.todolists.filter(tl => tl.id !== action.id));
//       delete state.tasks[action.id];
//       return {...state, todolists:todolistCopy}
//     case 'CHANGE-TASK-STATUS':
//       return {...state,
//       tasks:{...state.tasks,[action.todolistId]:state.tasks[action.todolistId].map(el=>el.id===action.id?{...el,isDone:action.isDone}:el)}}
//     default:
//       return state
//   }
// }
// export type ActionType =
//   removeTaskACType
//   | addTaskACType
//   | changeTitleTaskACType
//   | changeFilterACType
//   | changeTodolistTitleACType
//   | addTodolistACType
//   | removeTodolistACType
//   | changeTaskStatusACType
//
// export type removeTaskACType = ReturnType<typeof removeTaskAC>
// export const removeTaskAC = (id: string, todolistId: string) => {
//   return {
//     type: 'REMOVE-TASK',
//     id: id,
//     todolistId: todolistId,
//   } as const
// }
//
// export type addTaskACType = ReturnType<typeof addTaskAC>
// export const addTaskAC = (title: string, todolistId: string) => {
//   return {
//     type: 'ADD-TASK',
//     title: title,
//     todolistId: todolistId,
//   } as const
// }
//
// export type changeTitleTaskACType = ReturnType<typeof changeTitleTaskAC>
// export const changeTitleTaskAC = (id: string, newTitle: string, todolistId: string) => {
//   return {
//     type: 'CHANGE-TITLE-TASK',
//     id: id,
//     newTitle: newTitle,
//     todolistId: todolistId,
//   } as const
// }
//
// export type changeFilterACType = ReturnType<typeof changeFilterAC>
// export const changeFilterAC = (value: FilterValuesType, todolistId: string) => {
//   return {
//     type: 'CHANGE-FILTER',
//     value: value,
//     todolistId: todolistId,
//   } as const
// }
//
// export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
// export const changeTodolistTitleAC = (newTitle: string, todolistId: string) => {
//   return {
//     type: 'CHANGE-TDL-TITLE',
//     newTitle: newTitle,
//     todolistId: todolistId,
//   } as const
// }
//
// export type addTodolistACType = ReturnType<typeof addTodolistAC>
// export const addTodolistAC = (title: string) => {
//   return {
//     type: 'ADD-TDL',
//     title: title,
//   } as const
// }
//
// export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
// export const removeTodolistAC = (id: string) => {
//   return {
//     type: 'REMOVE-TDL',
//     id: id,
//   } as const
// }
//
// export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
// export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
//   return {
//     type: 'CHANGE-TASK-STATUS',
//     id: id,
//     isDone: isDone,
//     todolistId: todolistId,
//   } as const
// }
export {}