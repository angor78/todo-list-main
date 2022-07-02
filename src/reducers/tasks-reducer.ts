import {v1} from "uuid";
import {ADD_TODOLIST, AddTodolistACType, REMOVE_TODOLIST, RemoveTodolistACType} from "./todolist-reducer";
import  {AllTasksType, TaskType} from "../AppWithRedux";


const ADD_TASK = "ADD-TASK"
const REMOVE_TASK = 'REMOVE-TASK'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'

export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState = {
  [todolistId1]: [
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "React", isDone: false},
    {id: v1(), title: "Redux", isDone: false},
  ],
  [todolistId2]: [
    {id: v1(), title: "Milk", isDone: true},
    {id: v1(), title: "React Book", isDone: true},
  ]
} as AllTasksType

export const tasksReducer = (state = initialState, action: TasksActionType): AllTasksType => {
  switch (action.type) {
    case ADD_TASK:
      let newTask: TaskType = {id: v1(), title: action.newTitle, isDone: false}
      return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
    case 'REMOVE-TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)
      }
    case CHANGE_TASK_STATUS:
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ?
          {...el, isDone: action.isDone} : el)
      }
    case CHANGE_TASK_TITLE:
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ?
          {...el, title: action.title} : el)
      }
    case ADD_TODOLIST :
      return {...state,[action.todolistId]:[]}

    case REMOVE_TODOLIST :
      let copyState = {...state}
      delete copyState[action.todolistId]
      return copyState
    default:
      return state
  }
}

export type TasksActionType =
  RemoveTaskACType |
  AddTaskACType |
  ChangeTaskStatusACType |
  ChangeTaskTitleACType|
  AddTodolistACType|
  RemoveTodolistACType

export type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, newTitle: string) => {
  return {type: ADD_TASK, todolistId, newTitle} as const
}

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => {
  return {type: REMOVE_TASK, todolistId, taskId} as const
}

export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
  return {type: CHANGE_TASK_STATUS, todolistId, taskId, isDone} as const
}

export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
  return {type: CHANGE_TASK_TITLE, todolistId, taskId, title} as const
}