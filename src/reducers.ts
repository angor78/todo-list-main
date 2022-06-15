import { FilterValuesType, StateType, TodolistType} from "./App";
import {v1} from "uuid";

export const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {...state, tasks:{...state.tasks,[action.todolistId]:state.tasks[action.todolistId].filter(t => t.id !== action.id)}}
    case 'ADD-TASK':
      let newTasks = {
        ...state.tasks,
        [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state.tasks[action.todolistId]]
      }
      return {todolists: [...state.todolists], tasks: newTasks}
    case 'CHANGE-TITLE-TASK':
      return {...state,
        tasks:{...state.tasks,
          [action.todolistId]: state.tasks[action.todolistId].map(el=>el.id===action.id?{...el,title:action.newTitle}:el)}}
    case 'CHANGE-FILTER':
      return {...state,
        todolists:state.todolists.map(el=>el.id===action.todolistId?{...el,filter:action.value}:el)}
    case 'CHANGE-TDL-TITLE':
      let findedTDL = state.todolists.find(tl => tl.id === action.todolistId);
      if (findedTDL) {
        findedTDL.title = action.newTitle;
      }
      return {...state}
    case 'ADD-TDL':
      let todolist: TodolistType = {id: v1(), title: action.title, filter: "all"};
      return {todolists: [todolist, ...state.todolists], tasks: {[todolist.id]: [], ...state.tasks}}
    case 'REMOVE-TDL':
      state.todolists = (state.todolists.filter(tl => tl.id !== action.id));
      delete state.tasks[action.id];
      return {...state}
    case 'CHANGE-TASK-STATUS':
      let task = state.tasks[action.todolistId].find(t => t.id === action.id)
      if (task) {
        task.isDone = action.isDone
      }
      return {...state}
    default:
      return state
  }
}
export type ActionType =
  removeTaskACType
  | addTaskACType
  | changeTitleTaskACType
  | changeFilterACType
  | changeTodolistTitleACType
  | addTodolistACType
  | removeTodolistACType
  | changeTaskStatusACType

export type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todolistId: string) => {
  return {
    type: 'REMOVE-TASK',
    id: id,
    todolistId: todolistId,
  } as const
}

export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
  return {
    type: 'ADD-TASK',
    title: title,
    todolistId: todolistId,
  } as const
}

export type changeTitleTaskACType = ReturnType<typeof changeTitleTaskAC>
export const changeTitleTaskAC = (id: string, newTitle: string, todolistId: string) => {
  return {
    type: 'CHANGE-TITLE-TASK',
    id: id,
    newTitle: newTitle,
    todolistId: todolistId,
  } as const
}

export type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (value: FilterValuesType, todolistId: string) => {
  return {
    type: 'CHANGE-FILTER',
    value: value,
    todolistId: todolistId,
  } as const
}

export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (newTitle: string, todolistId: string) => {
  return {
    type: 'CHANGE-TDL-TITLE',
    newTitle: newTitle,
    todolistId: todolistId,
  } as const
}

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
  return {
    type: 'ADD-TDL',
    title: title,
  } as const
}

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
  return {
    type: 'REMOVE-TDL',
    id: id,
  } as const
}

export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    id: id,
    isDone: isDone,
    todolistId: todolistId,
  } as const
}