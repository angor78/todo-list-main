import {authAPI} from "../api/todolists-api";
import {Dispatch} from "redux";
import {errorAppAC, setAppStatusAC, setIsInitializedAC} from "./app-reducer";
import {handleServerNetworkError} from "../utils/error-utils";

const SET_USERS_DATA = 'SET_USERS_DATA'

export type initialAuthType = {
  id: number
  email: string
  login: string
  isAuth: boolean
}


let initialAuth = {
  id: 0,
  email: '',
  login: '',
  isAuth: false
}

export const authReducer = (state: initialAuthType = initialAuth, action: SetUsersDataType): initialAuthType => {
  switch (action.type) {
    case SET_USERS_DATA:
      return {
        ...state,
        id: action.id,
        email: action.email,
        login: action.login,
        isAuth: action.isAuth
      }

    default:
      return state

  }
}


export type SetUsersDataType = ReturnType<typeof setAuthUserData>
export const setAuthUserData = (id: number, email: string, login: string, isAuth: boolean) => {
  return {
    type: SET_USERS_DATA, id, email, login, isAuth
  } as const
}

//Thunk
export const authMe = () =>
  (dispatch: Dispatch) => {
    return authAPI.me().then(res => {
      if (res.data.resultCode === 0) {
        dispatch(errorAppAC(null))
        dispatch(setIsInitializedAC(true))
        let data = res.data.data
        dispatch(setAuthUserData(data.id, data.email, data.login, true))
      }
    })
  }

export const login = (email: string, password: string, rememberMe: boolean, captcha: boolean) =>
  (dispatch:any) => {
    dispatch(setAppStatusAC('loading'))
    let values = {email, password, rememberMe, captcha}
    authAPI.login(values)
      .then(data => {
        if (data.data.resultCode === 0) {
          dispatch(authMe())
          dispatch(errorAppAC(null))
          dispatch(setAppStatusAC('succeeded'))
          // window.location.replace(`/`)
        } else {
          handleServerNetworkError({message: data.data.messages[0]}, dispatch)
        }
      })
      .catch(e => handleServerNetworkError(e, dispatch))
  }
export const logout = () =>
  (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
      .then(data => {
        if (data.data.resultCode === 0) {
          dispatch(setAuthUserData(0, '', '', false))
          dispatch(setAppStatusAC('succeeded'))
        }
      })
  }
