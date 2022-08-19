import {Dispatch} from 'redux'
import {AppActionsTypes, errorAppAC, setAppStatusAC} from "../reducers/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {TodolistsActionsType} from "../reducers/todolist-reducer";
import {TasksActionsType} from "../reducers/tasks-reducer";

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
  if (data.messages.length) {
    dispatch(errorAppAC({error: data.messages[0]}))
  } else {
    dispatch(errorAppAC({error: 'Some error occurred'}))
  }
  dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
  dispatch(errorAppAC({error: error.message}))
  dispatch(setAppStatusAC({status: 'failed'}))
}

type ErrorUtilsDispatchType = Dispatch<AppActionsTypes | TodolistsActionsType | TasksActionsType>
