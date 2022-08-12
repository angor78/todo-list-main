import {FilterValuesType} from "../AppWithRedux";
import {TodolistsAPI, TodolistsType} from "../api/todolists-api";
import {AppThunk, DispatchType} from "../state/store";
import {errorAppAC, ErrorAppACType, RequestStatusType, setAppStatusAC, SetAppStatusACType} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {fetchTasks} from "./tasks-reducer";

const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
export const ADD_TODOLIST = 'ADD-TODOLIST'
export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const SET_TODOLISTS = 'SET-TODOLISTS'
export const CHANGE_TODOLIST_ENTITY_STATUS = 'CHANGE-TODOLIST-ENTITY-STATUS'
export const CLEAR_DATA = 'CLEAR-DATA'

export type TodolistDomainType = TodolistsType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
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
          filter: 'all',
          entityStatus: 'idle'
        }, ...state]

    case SET_TODOLISTS:
      return action.todolists.map(el => {
        return {...el, filter: 'all', entityStatus: 'idle'}
      })

    case REMOVE_TODOLIST:
      return state.filter(el => el.id !== action.todolistId)
    case CLEAR_DATA:
      return []

    case CHANGE_TODOLIST_TITLE:
      return state.map(el => el.id === action.todolistId ? {...el, title: action.newTitle} : el)
    case CHANGE_TODOLIST_ENTITY_STATUS:
      return state.map(el => el.id === action.todolistId ? {...el, entityStatus: action.status} : el)

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
  SetAppStatusACType |
  ErrorAppACType |
  ChangeTodolistEntityStatusACType|
  ClearDataACType


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

export type ChangeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>
export const changeTodolistEntityStatusAC = (todolistId: string, status: RequestStatusType) => {
  return {type: CHANGE_TODOLIST_ENTITY_STATUS, todolistId, status} as const
}

export type ClearDataACType = ReturnType<typeof clearDataAC>
export const clearDataAC = () => {
  return {type: CLEAR_DATA}as const
}

export enum resultCode {
  SUCCESS,
  // BADCODE = 1,
  // BADCAPTCHA = 10
}

//Thunk
export function fetchTodolists(): AppThunk {
  return async function (dispatch: DispatchType) {

    dispatch(setAppStatusAC('loading'))
    // dispatch(authMe())
    try {
      let res = await TodolistsAPI.getTodolist()
      if (res.data) {
        dispatch(errorAppAC(null))
        dispatch(setTodolistsAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
        res.data.forEach((tl)=>{
          dispatch(fetchTasks(tl.id))
        })
      } else {
        handleServerNetworkError({message: res.statusText}, dispatch)
      }
    } catch (e: any) {
      handleServerNetworkError(e, dispatch)
    }
  }
}

export function createTodolist(title: string) {
  return async function (dispatch: DispatchType) {
    dispatch(errorAppAC(null))
    dispatch(setAppStatusAC('loading'))
    try {
      let res = await TodolistsAPI.createTodolist(title)
      if (res.data.resultCode === resultCode.SUCCESS) {
        dispatch(errorAppAC(null))
        dispatch(addTodolistAC(res.data.data.item))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (e: any) {
      handleServerNetworkError(e, dispatch)
    }
  }
}

export function deleteTodolist(todolistId: string): AppThunk {
  return async function (dispatch: DispatchType) {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    try {
      let res = await TodolistsAPI.deleteTodolist(todolistId)
      if (res.data.resultCode === resultCode.SUCCESS) {
        dispatch(errorAppAC(null))
        dispatch(removeTodolistAC(todolistId))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (e) {
      const error = e as Error | AxiosError
      handleServerNetworkError(error, dispatch)
    }
  }
}

export function updateTodolist(todolistId: string, title: string): AppThunk {
  return async function (dispatch: DispatchType) {
    dispatch(setAppStatusAC('loading'))
    try {
      let res = await TodolistsAPI.updateTodolist(todolistId, title)
      if (res.data.resultCode === resultCode.SUCCESS) {
        dispatch(errorAppAC(null))
        dispatch(changeTodolistTitleAC(todolistId, title))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (e: any) {
      handleServerNetworkError(e, dispatch)
    }
  }
}

