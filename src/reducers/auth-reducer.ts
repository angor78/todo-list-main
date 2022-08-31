import {authAPI} from "../api/todolists-api";
import {errorAppAC, setAppStatusAC, setIsInitializedAC} from "./app-reducer";
import {handleServerNetworkError} from "../utils/error-utils";
import {clearDataAC} from "./todolist-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


let initialAuth = {
  id: 0,
  email: '',
  login: '',
  isAuth: false
}
//asyncThunk with redux toolkit
export const authMeTC = createAsyncThunk('auth/authMe',
  async (payload: {}, thunkAPI) => {
    const res = await authAPI.me()
    try {
      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(errorAppAC({error: null}))
        let data = res.data.data
        let payload = {id: data.id, email: data.email, login: data.login, isAuth: true}
        thunkAPI.dispatch(setAuthUserData(payload))
        thunkAPI.dispatch(setIsInitializedAC({isInitialized: true}))
      }
    } finally {
      thunkAPI.dispatch(setIsInitializedAC({isInitialized: true}))
    }
  })
export const loginTC = createAsyncThunk('auth/login',
  async (payload: { email: string, password: string, rememberMe: boolean, captcha: boolean }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    let values = {
      email: payload.email,
      password: payload.password,
      rememberMe: payload.rememberMe,
      captcha: payload.captcha
    }
    const data = await authAPI.login(values)
    try {
      if (data.data.resultCode === 0) {
        thunkAPI.dispatch(authMeTC({}))
        thunkAPI.dispatch(errorAppAC({error: null}))
      } else {
        handleServerNetworkError({message: data.data.messages[0]}, thunkAPI.dispatch)
      }
    } catch (e: any) {
      handleServerNetworkError(e, thunkAPI.dispatch)
    }
  })
export const logoutTC = createAsyncThunk('auth/logout',
  async (payload: {}, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const data = await authAPI.logout()
    try {
      if (data.data.resultCode === 0) {
        thunkAPI.dispatch(clearDataAC({}))
        let payload = {id: 0, email: '', login: '', isAuth: false}
        thunkAPI.dispatch(setAuthUserData(payload))
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
      }
    } catch (e: any) {
      handleServerNetworkError(e, thunkAPI.dispatch)
    }
  })


//actions with redux toolkit
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


