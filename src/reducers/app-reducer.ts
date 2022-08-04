export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


const initialState = {
  status: 'loading' as RequestStatusType,
  error: null
}
type InitialStateType = {
  status: RequestStatusType
  error: string | null
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state, status: action.status}
    case 'APP/SET-ERROR':
      return {...state, status: action.error}
    default:
      return state
  }
}

export type AppActionType = SetAppStatusACType | ErrorAppACType
export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status: RequestStatusType) => {
  return {type: 'APP/SET-STATUS', status} as const
}

export type ErrorAppACType = ReturnType<typeof errorAppAC>
export const errorAppAC = (error: RequestStatusType) => {
  return {type: 'APP/SET-ERROR', error} as const
}