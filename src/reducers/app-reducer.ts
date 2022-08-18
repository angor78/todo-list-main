import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'succeeded' as RequestStatusType,
  error: null,
  isInitialized: false
}
type InitialStateType = {
  status: RequestStatusType
  error: string | null
  isInitialized: boolean
}
const slice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
    errorAppAC(state: InitialStateType, action: PayloadAction<{ error: null | string }>) {
      state.error = action.payload.error
    },
    setIsInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized
    }
  }
})
export const appReducer = slice.reducer

export const setAppStatusAC = slice.actions.setAppStatusAC
export const errorAppAC = slice.actions.errorAppAC
export const setIsInitializedAC = slice.actions.setIsInitializedAC

export type AppActionsTypes =
  ReturnType<typeof setAppStatusAC> |
  ReturnType<typeof errorAppAC> |
  ReturnType<typeof setIsInitializedAC>

