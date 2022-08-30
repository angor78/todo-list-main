import {addTodolistAC, removeTodolistAC, resultCode, setTodolistsAC,} from "./todolist-reducer";
import {TaskType, TodolistsAPI} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {errorAppAC, setAppStatusAC} from "./app-reducer";
import {AllTasksType} from "../AppWithRedux";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppRootStateType} from "../redux-store/store";


const initialState: AllTasksType = {}

//asyncThunk with redux toolkit
export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks',
  async (todolistId: string, thunkAPI) => {
    try {
      const response = await TodolistsAPI.getTasks(todolistId)
      if (!response.data.error) {
        thunkAPI.dispatch(setTaskAC({todolistId, tasks: response.data.items}))
        // return {todolistId, tasks: response.data.items}
      } else {
        handleServerNetworkError({message: response.data.error}, thunkAPI.dispatch)
      }
    } catch (error: any) {
      handleServerNetworkError(error, thunkAPI.dispatch)
    }
  })
export const removeTaskTC = createAsyncThunk('tasks/removeTask',
  async (payload: { todolistId: string, taskId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    let res = await TodolistsAPI.deleteTask(payload.todolistId, payload.taskId)
    try {
      if (res.data.resultCode === resultCode.SUCCESS) {
        thunkAPI.dispatch(errorAppAC({error: null}))
        thunkAPI.dispatch(removeTaskAC({...payload}))
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch)
      }
    } catch (error: any) {
      handleServerNetworkError(error, thunkAPI.dispatch)
    }
  })
export const createTaskTC = createAsyncThunk('tasks/createTask',
  async (payload: { todolistId: string, title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
      //fix any?
      let res: any = await TodolistsAPI.createTask(payload.todolistId, payload.title)
      let item: TaskType = res.data.data.item
      if (res.data.resultCode === resultCode.SUCCESS) {
        thunkAPI.dispatch(errorAppAC({error: null}))
        thunkAPI.dispatch(addTaskAC({task: item}))
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch)
      }
    } catch (error: any) {
      handleServerNetworkError(error, thunkAPI.dispatch)
    }
  })
export const updateTaskTC = createAsyncThunk('tasks/updateTask',
  async (payload: { todolistId: string, taskId: string, title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
      let res = await TodolistsAPI.updateTask(payload.todolistId, payload.taskId, payload.title)
      if (res.data.resultCode === resultCode.SUCCESS) {
        thunkAPI.dispatch(errorAppAC({error: null}))
        thunkAPI.dispatch(changeTaskTitleAC({...payload}))
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch)
      }
    } catch (error: any) {
      handleServerNetworkError(error, thunkAPI.dispatch)
    }
  })
export const changeStatusTaskTC = createAsyncThunk('tasks/changeStatusTask',
  async (payload: { todolistId: string, taskId: string, status: number }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const state = thunkAPI.getState() as AppRootStateType
    const allTasksFromState = state.tasks
    const tasksForCurrentTodolist = allTasksFromState[payload.todolistId]
    const task = tasksForCurrentTodolist.find((t: any) => {
      return t.id === payload.taskId
    })
    if (task) {
      const model = {
        title: task.title,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        status: payload.status
      }
      try {
        let res = await TodolistsAPI.changeStatus(payload.todolistId, payload.taskId, model)
        if (res.data.resultCode === resultCode.SUCCESS) {
          thunkAPI.dispatch(errorAppAC({error: null}))
          thunkAPI.dispatch(changeTaskStatusAC({
            todolistId: payload.todolistId,
            taskId: payload.taskId,
            status: model.status
          }))
          thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
          handleServerAppError(res.data, thunkAPI.dispatch)
        }
      } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
      }
    }
  })


//actions with redux toolkit
const slice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    setTaskAC(state, action: PayloadAction<{ todolistId: string, tasks: Array<TaskType> }>) {
      state[action.payload.todolistId] = action.payload.tasks
    },
    addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].push(action.payload.task)
    },
    removeTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string }>) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(el => el.id === action.payload.taskId)
      if (index > -1) {
        tasks.splice(index, 1)
      }
    },
    changeTaskStatusAC(state, action: PayloadAction<{ todolistId: string, taskId: string, status: number }>) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(el => el.id === action.payload.taskId)
      if (index > -1) {
        tasks[index].status = action.payload.status
      }
    },
    changeTaskTitleAC(state, action: PayloadAction<{ todolistId: string, taskId: string, title: string }>) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(el => el.id === action.payload.taskId)
      if (index > -1) {
        tasks[index].title = action.payload.title
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodolistAC, (state, action) => {
      state[action.payload.todolist.id] = []
    })
    builder.addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.todolistId]

    })
    builder.addCase(setTodolistsAC, (state, action) => {
      action.payload.todolists.forEach((tl: any) => {
        state[tl.id] = []
      })
    })
    // builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
    //   state[action.payload.todolistId] = action.payload.tasks
    // })
  }


})
export const tasksReducer = slice.reducer

export const setTaskAC = slice.actions.setTaskAC
export const addTaskAC = slice.actions.addTaskAC
export const removeTaskAC = slice.actions.removeTaskAC
export const changeTaskStatusAC = slice.actions.changeTaskStatusAC
export const changeTaskTitleAC = slice.actions.changeTaskTitleAC

export type TasksActionsType =
  ReturnType<typeof setTaskAC> |
  ReturnType<typeof addTaskAC> |
  ReturnType<typeof removeTaskAC> |
  ReturnType<typeof changeTaskStatusAC> |
  ReturnType<typeof changeTaskTitleAC> |
  ReturnType<typeof addTodolistAC> |
  ReturnType<typeof removeTodolistAC> |
  ReturnType<typeof setTodolistsAC>
