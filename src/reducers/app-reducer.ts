export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const INITIALIZED = 'INITIALIZED'
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

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state, status: action.status}
    case 'APP/SET-ERROR':
      return {...state, status: 'failed', error: action.error}
    case INITIALIZED:
      return {...state,  isInitialized: action.isInitialized}
    default:
      return state
  }
}

export type AppActionType = SetAppStatusACType | ErrorAppACType |SetIsInitializedACType
export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status: RequestStatusType) => {
  return {type: 'APP/SET-STATUS', status} as const
}

export type ErrorAppACType = ReturnType<typeof errorAppAC>
export const errorAppAC = (error: string | null) => {
  return {type: 'APP/SET-ERROR', error} as const
}

export type SetIsInitializedACType = ReturnType<typeof setIsInitializedAC>
export const setIsInitializedAC = (isInitialized:boolean) => {
  return {type: INITIALIZED,isInitialized} as const
}