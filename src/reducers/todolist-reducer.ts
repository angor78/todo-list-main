import {FilterValuesType} from "../AppWithRedux";
import {TodolistsAPI, TodolistsType} from "../api/todolists-api";
import {errorAppAC, RequestStatusType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {fetchTasksTC} from "./tasks-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TodolistDomainType = TodolistsType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
let initialState: Array<TodolistDomainType> = []

//asyncThunk with redux toolkit
export const fetchTodolistsTC = createAsyncThunk('todolists/fetchTodolists',
  async (payload: {}, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
      let res = await TodolistsAPI.getTodolist()
      if (res.data) {
        thunkAPI.dispatch(errorAppAC({error: null}))
        thunkAPI.dispatch(setTodolistsAC({todolists: res.data}))
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        res.data.forEach((tl) => {
          thunkAPI.dispatch(fetchTasksTC(tl.id))
        })
      } else {
        handleServerNetworkError({message: res.statusText}, thunkAPI.dispatch)
      }
    } catch (e: any) {
      handleServerNetworkError(e, thunkAPI.dispatch)
    }
  })
export const createTodolistTC = createAsyncThunk('todolists/createTodolist',
  async (payload: { title: string }, thunkAPI) => {
    thunkAPI.dispatch(errorAppAC({error: null}))
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
      let res = await TodolistsAPI.createTodolist(payload.title)
      if (res.data.resultCode === resultCode.SUCCESS) {
        thunkAPI.dispatch(errorAppAC({error: null}))
        thunkAPI.dispatch(addTodolistAC({todolist: res.data.data.item}))
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch)
      }
    } catch (e: any) {
      handleServerNetworkError(e, thunkAPI.dispatch)
    }
  })
export const deleteTodolistTC = createAsyncThunk('todolists/deleteTodolist',
  async (payload: { todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    thunkAPI.dispatch(changeTodolistEntityStatusAC({todolistId: payload.todolistId, status: 'loading'}))
    try {
      let res = await TodolistsAPI.deleteTodolist(payload.todolistId)
      if (res.data.resultCode === resultCode.SUCCESS) {
        thunkAPI.dispatch(errorAppAC({error: null}))
        thunkAPI.dispatch(removeTodolistAC({todolistId: payload.todolistId}))
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch)
      }
    } catch (e) {
      const error = e as Error | AxiosError
      handleServerNetworkError(error, thunkAPI.dispatch)
    }
  })
export const updateTodolistTC = createAsyncThunk('todolists/updateTodolist',
  async (payload: { todolistId: string, title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
      let res = await TodolistsAPI.updateTodolist(payload.todolistId, payload.title)
      if (res.data.resultCode === resultCode.SUCCESS) {
        thunkAPI.dispatch(errorAppAC({error: null}))
        thunkAPI.dispatch(changeTodolistTitleAC({todolistId: payload.todolistId, newTitle: payload.title}))
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch)
      }
    } catch (e: any) {
      handleServerNetworkError(e, thunkAPI.dispatch)
    }
  })

//actions with redux toolkit
const slice = createSlice({
  name: 'todolists',
  initialState: initialState,
  reducers: {
    changeTodolistFilterAC(state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) {
      return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.filter} : el)
    },
    addTodolistAC(state, action: PayloadAction<{ todolist: TodolistsType, }>) {
      state.push({
        id: action.payload.todolist.id,
        addedDate: action.payload.todolist.addedDate,
        order: action.payload.todolist.order,
        title: action.payload.todolist.title,
        filter: 'all',
        entityStatus: 'idle'
      })
    },

    removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
      return state.filter(el => el.id !== action.payload.todolistId)
    },
    changeTodolistTitleAC(state, action: PayloadAction<{ todolistId: string, newTitle: string }>) {
      return state.map(el => el.id === action.payload.todolistId ? {...el, title: action.payload.newTitle} : el)

    },
    setTodolistsAC: (state, action: PayloadAction<{ todolists: Array<TodolistsType> }>) => {
      return action.payload.todolists.map((item) => {
        return {
          ...item, filter: 'all', entityStatus: 'idle'
        }
      })

    },
    changeTodolistEntityStatusAC(state, action: PayloadAction<{ todolistId: string, status: RequestStatusType }>) {
      return state.map(el => el.id === action.payload.todolistId ? {
        ...el,
        entityStatus: action.payload.status
      } : el)
    },
    clearDataAC(state, action) {
      return []
    },
  }
})
export const todolistReducer = slice.reducer

export const changeTodolistFilterAC = slice.actions.changeTodolistFilterAC
export const addTodolistAC = slice.actions.addTodolistAC
export const removeTodolistAC = slice.actions.removeTodolistAC
export const changeTodolistTitleAC = slice.actions.changeTodolistTitleAC
export const setTodolistsAC = slice.actions.setTodolistsAC
export const changeTodolistEntityStatusAC = slice.actions.changeTodolistEntityStatusAC
export const clearDataAC = slice.actions.clearDataAC

export type TodolistsActionsType =
  ReturnType<typeof changeTodolistFilterAC> |
  ReturnType<typeof addTodolistAC> |
  ReturnType<typeof removeTodolistAC> |
  ReturnType<typeof changeTodolistTitleAC> |
  ReturnType<typeof setTodolistsAC> |
  ReturnType<typeof changeTodolistEntityStatusAC> |
  ReturnType<typeof clearDataAC>


export enum resultCode {
  SUCCESS,
  // BADCODE = 1,
  // BADCAPTCHA = 10
}









