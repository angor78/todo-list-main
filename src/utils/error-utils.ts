
import { Dispatch } from 'redux'
import {errorAppAC, ErrorAppACType, setAppStatusAC, SetAppStatusACType} from "../reducers/app-reducer";
import {ResponseType} from "../api/todolists-api";

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
  if (data.messages.length) {
    dispatch(errorAppAC(data.messages[0]))
  } else {
    dispatch(errorAppAC('Some error occurred'))
  }
  dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
  dispatch(errorAppAC(error.message))
  dispatch(setAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<ErrorAppACType | SetAppStatusACType>
