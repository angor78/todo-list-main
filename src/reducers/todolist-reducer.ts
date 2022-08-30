import {FilterValuesType} from "../AppWithRedux";
import {TodolistsAPI, TodolistsType} from "../api/todolists-api";
import {AppThunk, DispatchType} from "../redux-store/store";
import {errorAppAC, RequestStatusType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {fetchTasksTC} from "./tasks-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TodolistDomainType = TodolistsType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
let initialState: Array<TodolistDomainType> = []

// export const fetchTodolists = createAsyncThunk('todolists/fetchTodolists',({},thunkAPI)=>{
//   thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
//   try {
//     let res = await TodolistsAPI.getTodolist()
//     if (res.data) {
//       thunkAPI.dispatch(errorAppAC({error: null}))
//       thunkAPI.dispatch(setTodolistsAC({todolists: res.data}))
//       thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
//       res.data.forEach((tl) => {
//         thunkAPI.dispatch(fetchTasks(tl.id))
//       })
//     } else {
//       handleServerNetworkError({message: res.statusText}, thunkAPI.dispatch)
//     }
//   } catch (e: any) {
//     handleServerNetworkError(e, thunkAPI.dispatch)
//   }
// })
export function fetchTodolists(): AppThunk {
  return async function (dispatch: DispatchType) {

    dispatch(setAppStatusAC({status: 'loading'}))
    try {
      let res = await TodolistsAPI.getTodolist()
      if (res.data) {
        dispatch(errorAppAC({error: null}))
        dispatch(setTodolistsAC({todolists: res.data}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
        res.data.forEach((tl) => {
          dispatch(fetchTasksTC(tl.id))
        })
      } else {
        handleServerNetworkError({message: res.statusText}, dispatch)
      }
    } catch (e: any) {
      handleServerNetworkError(e, dispatch)
    }
  }
}

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
    setTodolistsAC:(state, action: PayloadAction<{ todolists: Array<TodolistsType> }>) =>{
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

//Thunk


export function createTodolist(title: string) {
  return async function (dispatch: DispatchType) {
    dispatch(errorAppAC({error: null}))
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
      let res = await TodolistsAPI.createTodolist(title)
      if (res.data.resultCode === resultCode.SUCCESS) {
        dispatch(errorAppAC({error: null}))
        dispatch(addTodolistAC({todolist: res.data.data.item}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
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
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({todolistId, status: 'loading'}))
    try {
      let res = await TodolistsAPI.deleteTodolist(todolistId)
      if (res.data.resultCode === resultCode.SUCCESS) {
        dispatch(errorAppAC({error: null}))
        dispatch(removeTodolistAC({todolistId}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
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
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
      let res = await TodolistsAPI.updateTodolist(todolistId, title)
      if (res.data.resultCode === resultCode.SUCCESS) {
        dispatch(errorAppAC({error: null}))
        dispatch(changeTodolistTitleAC({todolistId, newTitle: title}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (e: any) {
      handleServerNetworkError(e, dispatch)
    }
  }
}

