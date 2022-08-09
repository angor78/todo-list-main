import {
  ADD_TODOLIST,
  AddTodolistACType,
  REMOVE_TODOLIST,
  RemoveTodolistACType, resultCode,
  SET_TODOLISTS,
  SetTodolistsACType
} from "./todolist-reducer";
import {AllTasksType} from "../AppWithRedux";
import {TaskType, TodolistsAPI} from "../api/todolists-api";
import {AppRootStateType, AppThunk, DispatchType} from "../state/store";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {errorAppAC, setAppStatusAC} from "./app-reducer";


const ADD_TASK = "ADD-TASK"
const REMOVE_TASK = 'REMOVE-TASK'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'
const SET_TASKS = 'SET-TASKS'

const initialState: AllTasksType = {}

export const tasksReducer = (state = initialState, action: TasksActionType): AllTasksType => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
      }
    case REMOVE_TASK:
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)
      }
    case CHANGE_TASK_STATUS:
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ?
          {...el, status: action.status} : el)
      }
    case CHANGE_TASK_TITLE:
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ?
          {...el, title: action.title} : el)
      }
    case ADD_TODOLIST :
      return {...state, [action.todolist.id]: []}

    case REMOVE_TODOLIST :
      let copyState = {...state}
      delete copyState[action.todolistId]
      return copyState

    case SET_TASKS: {
      let copyState = {...state}
      copyState[action.todolistId] = action.tasks
      return copyState
    }
    case SET_TODOLISTS: {
      let copyState = {...state}
      action.todolists.forEach(tl => {
        copyState[tl.id] = []
      })
      return copyState
    }
    default:
      return state
  }
}

export type TasksActionType =
  RemoveTaskACType |
  AddTaskACType |
  ChangeTaskStatusACType |
  ChangeTaskTitleACType |
  AddTodolistACType |
  RemoveTodolistACType |
  SetTodolistsACType |
  SetTaskType

export type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (task: TaskType) => {
  return {type: ADD_TASK, task} as const
}

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => {
  return {type: REMOVE_TASK, todolistId, taskId} as const
}

export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: number) => {
  return {type: CHANGE_TASK_STATUS, todolistId, taskId, status} as const
}

export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
  return {type: CHANGE_TASK_TITLE, todolistId, taskId, title} as const
}


export type SetTaskType = ReturnType<typeof setTaskAC>
export const setTaskAC = (todolistId: string, tasks: Array<TaskType>) => {
  return {type: SET_TASKS, todolistId, tasks} as const
}

//Thunk

export function fetchTasks(todolistId: string): AppThunk {
  return async function (dispatch: DispatchType) {
    try {
      const response = await TodolistsAPI.getTasks(todolistId)
      if (!response.data.error) {
        dispatch(setTaskAC(todolistId, response.data.items))
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
    dispatch(setAppStatusAC('loading'))
    let res = await TodolistsAPI.deleteTask(todolistId, taskId)
    try {
      if (res.data.resultCode === resultCode.SUCCESS) {
        dispatch(errorAppAC(null))
        dispatch(removeTaskAC(todolistId, taskId))
        dispatch(setAppStatusAC('succeeded'))
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
    dispatch(setAppStatusAC('loading'))
    try {
      //fix any?
      let res: any = await TodolistsAPI.createTask(todolistId, title)
      let item: TaskType = res.data.data.item
      if (res.data.resultCode === resultCode.SUCCESS) {
        dispatch(errorAppAC(null))
        dispatch(addTaskAC(item))
        dispatch(setAppStatusAC('succeeded'))
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
    dispatch(setAppStatusAC('loading'))
    try {
      let res = await TodolistsAPI.updateTask(todolistId, taskId, title)
      if (res.data.resultCode === resultCode.SUCCESS) {
        dispatch(errorAppAC(null))
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
        dispatch(setAppStatusAC('succeeded'))
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
    dispatch(setAppStatusAC('loading'))
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
          dispatch(errorAppAC(null))
          dispatch(changeTaskStatusAC(todolistId, taskId, model.status))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      } catch (error: any) {
        handleServerNetworkError(error, dispatch)
      }
    }
  }
}