import {v1} from "uuid";
import {FilterValuesType} from "../AppWithRedux";
import {TodolistsAPI, TodolistsType} from "../api/todolists-api";
import {Dispatch} from "redux";

const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
export const ADD_TODOLIST = 'ADD-TODOLIST'
export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const SET_TODOLISTS = 'SET-TODOLISTS'

export type TodolistDomainType = TodolistsType & {
  filter: FilterValuesType
}

let initialState: Array<TodolistDomainType> = []

export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistActionType): Array<TodolistDomainType> => {
  switch (action.type) {
    case CHANGE_TODOLIST_FILTER:
      return state.map(el => el.id === action.todolistId ? {...el, filter: action.filter} : el)

    case ADD_TODOLIST:
      return [...state,
        {id: action.todolistId, addedDate: "asdas", order: 4, title: action.newTitle, filter: 'all'}]

    case SET_TODOLISTS:
      return action.todolists.map(el => {
        return {...el, filter: 'all'}
      })

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
  ChangeTodolistTitleACType |
  SetTodolistsACType


//Action
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

export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (todolists: Array<TodolistsType>) => {
  return {type: SET_TODOLISTS, todolists: todolists} as const
}


//Thunk
export const fetchTodolists = () => (dispatch: Dispatch) => {
  TodolistsAPI.getTodolist().then(res => {
    dispatch(setTodolistsAC(res.data))
  })
}
