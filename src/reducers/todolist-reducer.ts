import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../AppWithReducers";

const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
export const ADD_TODOLIST = 'ADD-TODOLIST'
export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'


export const todolistReducer = (state: Array<TodolistType>, action: TodolistActionType): Array<TodolistType> => {
  switch (action.type) {
    case CHANGE_TODOLIST_FILTER:
      return state.map(el => el.id === action.todolistId ? {...el, filter: action.filter} : el)
    case ADD_TODOLIST:
      return [...state, {id: action.todolistId, title: action.newTitle, filter: 'all'}]

    case REMOVE_TODOLIST:
      return state.filter(el => el.id !== action.todolistId)
    case CHANGE_TODOLIST_TITLE:
      return state.map(el => el.id === action.todolistId ? {...el, title: action.newTitle} : el)
    default:
      return state
  }
}
export type TodolistActionType =
  ChangeTodolistFilterACType |
  AddTodolistACType |
  RemoveTodolistACType |
  ChangeTodolistTitleACType

export type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
  return {type: CHANGE_TODOLIST_FILTER, todolistId, filter} as const
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTitle: string) => {
  return {type: ADD_TODOLIST, newTitle, todolistId: v1()} as const
}

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
  return {type: REMOVE_TODOLIST, todolistId} as const
}

export type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => {
  return {type: CHANGE_TODOLIST_TITLE, todolistId, newTitle} as const
}