import {
  ADD_TODOLIST,
  AddTodolistACType,
  REMOVE_TODOLIST,
  RemoveTodolistACType,
  SET_TODOLISTS,
  SetTodolistsACType
} from "./todolist-reducer";
import {AllTasksType} from "../AppWithRedux";
import {TaskType, TodolistsAPI} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../state/store";


const ADD_TASK = "ADD-TASK"
const REMOVE_TASK = 'REMOVE-TASK'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'
const SET_TASKS = 'SET-TASKS'

const initialState: AllTasksType = {}

export const tasksReducer = (state = initialState, action: TasksActionType): AllTasksType => {
  switch (action.type) {
    case ADD_TASK:
      // let newTask: TaskType = {
      //   id: '1',
      //   title: action.newTitle,
      //   description: null,
      //   todoListId: action.todolistId,
      //   order: 1,
      //   status: 0,
      //   priority: 1,
      //   startDate: null,
      //   deadline: null,
      //   addedDate: 'null'
      // }
      return {...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
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
      return {...state, [action.todolistId]: []}

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
export const addTaskAC = (task:TaskType) => {
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

export const fetchTasks = (todolistId: string) => (dispatch: Dispatch) => {
  TodolistsAPI.getTasks(todolistId).then(res => {
    dispatch(setTaskAC(todolistId, res.data.items))
  })
}

export const removeTask = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
  TodolistsAPI.deleteTask(todolistId, taskId).then(res => {
    if (res.data.resultCode === 0) {
      dispatch(removeTaskAC(todolistId, taskId))
    }
  })
}

export const createTask = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  TodolistsAPI.createTask(todolistId, title).then(res => {
    if (res.data.resultCode === 0) {
      // @ts-ignore
      let task = {...res.data.data.item}
      console.log(task)
      dispatch(addTaskAC(task))

    }

  })

}

export const updateTask = (todolistId: string, taskId: string, title: string) => (dispatch: Dispatch) => {
  TodolistsAPI.updateTask(todolistId, taskId, title).then(res => {
    if (res.data.resultCode === 0) {
      dispatch(changeTaskTitleAC(todolistId, taskId, title))
    }
  })
}

export const changeStatusTask = (todolistId: string, taskId: string, status: number) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
      TodolistsAPI.changeStatus(todolistId, taskId, model).then(res => {
        if (res.data.resultCode === 0) {
          dispatch(changeTaskStatusAC(todolistId, taskId, model.status))
        }
      })
    }
}