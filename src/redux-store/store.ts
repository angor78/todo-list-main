import {TasksActionsType, tasksReducer} from '../reducers/tasks-reducer'
import {todolistReducer, TodolistsActionsType} from '../reducers/todolist-reducer'
import {combineReducers} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {AppActionsTypes, appReducer} from "../reducers/app-reducer";
import {authReducer} from "../reducers/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistReducer,
  app: appReducer,
  auth: authReducer
})
 export type RootReducerType = typeof rootReducer
// непосредственно создаём store
// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})


// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AllActionsType = TodolistsActionsType | TasksActionsType | AppActionsTypes
export type DispatchType = ThunkDispatch<AppRootStateType, unknown, AllActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllActionsType>
export const useAppDispatch = () => useDispatch<DispatchType>()


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store


// export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
