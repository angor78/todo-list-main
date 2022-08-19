import {authAPI} from "../api/todolists-api";
import {Dispatch} from "redux";
import {errorAppAC, setAppStatusAC, setIsInitializedAC} from "./app-reducer";
import {handleServerNetworkError} from "../utils/error-utils";
import {clearDataAC} from "./todolist-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


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
    setAuthUserData(state, action: PayloadAction<{ id: number, email: string, login: string, isAuth: boolean }>) {
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
          dispatch(errorAppAC({error: null}))
          let data = res.data.data
          let payload = {id: data.id, email: data.email, login: data.login, isAuth: true}
          dispatch(setAuthUserData(payload))
          dispatch(setIsInitializedAC({isInitialized: true}))
        }
      })
      .finally(() => dispatch(setIsInitializedAC({isInitialized: true})))
  }

export const login = (email: string, password: string, rememberMe: boolean, captcha: boolean) =>
  (dispatch: any) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    let values = {email, password, rememberMe, captcha}
    authAPI.login(values)
      .then(data => {
        if (data.data.resultCode === 0) {
          dispatch(authMe())
          dispatch(errorAppAC({error: null}))
        } else {
          handleServerNetworkError({message: data.data.messages[0]}, dispatch)
        }
      })
      .catch(e => handleServerNetworkError(e, dispatch))
  }
export const logout = () =>
  (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
      .then(data => {
        if (data.data.resultCode === 0) {
          dispatch(clearDataAC({}))
          let payload = {id: 0, email: '', login: '', isAuth: false}
          dispatch(setAuthUserData(payload))
          dispatch(setAppStatusAC({status: 'succeeded'}))
        }
      })
  }
