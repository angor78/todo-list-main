import {
  addTodolistAC, removeTodolistAC,
  resultCode, setTodolistsAC,
} from "./todolist-reducer";
import {TaskType, TodolistsAPI} from "../api/todolists-api";
import {AppRootStateType, AppThunk, DispatchType} from "../redux-store/store";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {errorAppAC, setAppStatusAC} from "./app-reducer";
import {AllTasksType} from "../AppWithRedux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: AllTasksType = {}
const slice = createSlice({
  name: 'task',
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
      if(index>-1){
        tasks.splice(index,1)
      }
    },
    changeTaskStatusAC(state, action: PayloadAction<{ todolistId: string, taskId: string, status: number }>) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(el => el.id === action.payload.taskId)
      if(index>-1){
        tasks[index].status=action.payload.status
      }
    },
    changeTaskTitleAC(state, action: PayloadAction<{ todolistId: string, taskId: string, title: string }>) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(el => el.id === action.payload.taskId)
      if(index>-1){
        tasks[index].title=action.payload.title
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
  }


})
export const tasksReducer = slice.reducer

export const setTaskAC = slice.actions.setTaskAC
export const addTaskAC = slice.actions.addTaskAC
export const removeTaskAC = slice.actions.removeTaskAC
export const changeTaskStatusAC = slice.actions.changeTaskStatusAC
export const changeTaskTitleAC = slice.actions.changeTaskTitleAC


// export type AddTaskACType = ReturnType<typeof addTaskAC>
// export const addTaskAC = (task: TaskType) => {
//   return {type: ADD_TASK, task} as const
// }
//
// export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
// export const removeTaskAC = (todolistId: string, taskId: string) => {
//   return {type: REMOVE_TASK, todolistId, taskId} as const
// }
//
// export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
// export const changeTaskStatusAC = (todolistId: string, taskId: string, status: number) => {
//   return {type: CHANGE_TASK_STATUS, todolistId, taskId, status} as const
// }
//
// export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
// export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
//   return {type: CHANGE_TASK_TITLE, todolistId, taskId, title} as const
// }
//
//
// export type SetTaskType = ReturnType<typeof setTaskAC>
// export const setTaskAC = (todolistId: string, tasks: Array<TaskType>) => {
//   return {type: SET_TASKS, todolistId, tasks} as const
// }

export type TasksActionsType =
  ReturnType<typeof setTaskAC> |
  ReturnType<typeof addTaskAC> |
  ReturnType<typeof removeTaskAC> |
  ReturnType<typeof changeTaskStatusAC> |
  ReturnType<typeof changeTaskTitleAC> |
  ReturnType<typeof addTodolistAC> |
  ReturnType<typeof removeTodolistAC> |
  ReturnType<typeof setTodolistsAC>


//Thunk

export function fetchTasks(todolistId: string): AppThunk {
  return async function (dispatch: DispatchType) {
    try {
      const response = await TodolistsAPI.getTasks(todolistId)
      if (!response.data.error) {
        dispatch(setTaskAC({todolistId, tasks: response.data.items}))
      } else {
        handleServerNetworkError({message: response.data.error}, dispatch)
      }
    } catch (error: any) {
      handleServerNetworkError(error, dispatch)
    }

  }
}

export function removeTask(todolistId: string, taskId: string): AppThunk {
  return async function (dispatch: DispatchType) {
    dispatch(setAppStatusAC({status: 'loading'}))
    let res = await TodolistsAPI.deleteTask(todolistId, taskId)
    try {
      if (res.data.resultCode === resultCode.SUCCESS) {
        dispatch(errorAppAC({error: null}))
        dispatch(removeTaskAC({todolistId, taskId}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (error: any) {
      handleServerNetworkError(error, dispatch)
    }
  }
}

export function createTask(todolistId: string, title: string): AppThunk {
  return async function (dispatch: DispatchType) {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
      //fix any?
      let res: any = await TodolistsAPI.createTask(todolistId, title)
      let item: TaskType = res.data.data.item
      if (res.data.resultCode === resultCode.SUCCESS) {
        dispatch(errorAppAC({error: null}))
        dispatch(addTaskAC({task: item}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (error: any) {
      handleServerNetworkError(error, dispatch)
    }
  }
}

export function updateTask(todolistId: string, taskId: string, title: string): AppThunk {
  return async function (dispatch: DispatchType) {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
      let res = await TodolistsAPI.updateTask(todolistId, taskId, title)
      if (res.data.resultCode === resultCode.SUCCESS) {
        dispatch(errorAppAC({error: null}))
        dispatch(changeTaskTitleAC({todolistId, taskId, title}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (error: any) {
      handleServerNetworkError(error, dispatch)
    }
  }
}

export function changeStatusTask(todolistId: string, taskId: string, status: number): AppThunk {
  return async function (dispatch: DispatchType, getState: () => AppRootStateType) {
    dispatch(setAppStatusAC({status: 'loading'}))
    const allTasksFromState = getState().tasks
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => {
      return t.id === taskId
    })
    if (task) {
      const model = {
        title: task.title,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        status: status
      }
      try {
        let res = await TodolistsAPI.changeStatus(todolistId, taskId, model)
        if (res.data.resultCode === resultCode.SUCCESS) {
          dispatch(errorAppAC({error: null}))
          dispatch(changeTaskStatusAC({todolistId, taskId, status: model.status}))
          dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      } catch (error: any) {
        handleServerNetworkError(error, dispatch)
      }
    }
  }
}