import {authAPI} from "../api/todolists-api";
import {Dispatch} from "redux";
import {errorAppAC, setAppStatusAC, setIsInitializedAC} from "./app-reducer";
import {handleServerNetworkError} from "../utils/error-utils";
import {clearDataAC} from "./todolist-reducer";
import {createSlice} from "@reduxjs/toolkit";


let initialAuth = {
  id: 0,
  email: '',
  login: '',
  isAuth: false
}
const slice = createSlice({
  name: 'auth',
  initialState: initialAuth,
  reducers: {
    setAuthUserData(state, action) {
      state.id = action.payload.id
      state.email = action.payload.email
      state.login = action.payload.login
      state.isAuth = action.payload.isAuth
    }
  }
})
export const authReducer = slice.reducer
export const {setAuthUserData} = slice.actions

//Thunk
export const authMe = () =>
  (dispatch: Dispatch) => {
    return authAPI.me()
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(errorAppAC(null))
          let data = res.data.data
          let payload = {id: data.id, email: data.email, login: data.login, isAuth: true}
          dispatch(setAuthUserData(payload))
          dispatch(setIsInitializedAC(true))
        }
      })
      .finally(() => dispatch(setIsInitializedAC(true)))
  }

export const login = (email: string, password: string, rememberMe: boolean, captcha: boolean) =>
  (dispatch: any) => {
    dispatch(setAppStatusAC('loading'))
    let values = {email, password, rememberMe, captcha}
    authAPI.login(values)
      .then(data => {
        if (data.data.resultCode === 0) {
          dispatch(authMe())
          dispatch(errorAppAC(null))
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
          dispatch(clearDataAC())
          let payload = {id: 0, email: '', login: '', isAuth: false}
          dispatch(setAuthUserData(payload))
          dispatch(setAppStatusAC('succeeded'))
        }
      })
  }
