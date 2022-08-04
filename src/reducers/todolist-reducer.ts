import {FilterValuesType} from "../AppWithRedux";
import {TodolistsAPI, TodolistsType} from "../api/todolists-api";
import {AppThunk, DispatchType} from "../state/store";
import {setAppStatusAC, SetAppStatusACType} from "./app-reducer";

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
      return [
        {
          id: action.todolist.id,
          addedDate: action.todolist.addedDate,
          order: action.todolist.order,
          title: action.todolist.title,
          filter: 'all'
        }, ...state]

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
  SetTodolistsACType |
  SetAppStatusACType


//Action
export type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
  return {type: CHANGE_TODOLIST_FILTER, todolistId, filter} as const
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolist: TodolistsType) => {
  return {type: ADD_TODOLIST, todolist, filter: 'all'} as const
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
export function fetchTodolists(): AppThunk {
  return async function (dispatch: DispatchType) {
    dispatch(setAppStatusAC('loading'))
    let res = await TodolistsAPI.getTodolist()
    dispatch(setTodolistsAC(res.data))
    dispatch(setAppStatusAC('succeeded'))
  }
}

export function createTodolist(title: string) {
  return async function (dispatch: DispatchType) {
    dispatch(setAppStatusAC('loading'))
    let res = await TodolistsAPI.createTodolist(title)
    if (res.data.resultCode === 0) {
      dispatch(addTodolistAC(res.data.data.item))
      dispatch(setAppStatusAC('succeeded'))
    }else{
      console.warn(res.data.messages)
    }
  }
}

export function deleteTodolist(todolistId: string): AppThunk {
  return async function (dispatch: DispatchType) {
    dispatch(setAppStatusAC('loading'))
    let res = await TodolistsAPI.deleteTodolist(todolistId)
    if (res.data.resultCode === 0) {
      dispatch(removeTodolistAC(todolistId))
      dispatch(setAppStatusAC('succeeded'))
    }else{
      console.warn(res.data.messages)
    }
  }
}

export function updateTodolist(todolistId: string, title: string): AppThunk {
  return async function (dispatch: DispatchType) {
    dispatch(setAppStatusAC('loading'))
    let res = await TodolistsAPI.updateTodolist(todolistId, title)
    if(res.data.resultCode===0){
      dispatch(changeTodolistTitleAC(todolistId,title))
      dispatch(setAppStatusAC('succeeded'))
    }else{
      console.warn(res.data.messages)
    }
  }
}

