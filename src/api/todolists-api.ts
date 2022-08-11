import axios from "axios";

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': 'bd4ae310-899e-41ab-b129-c57668c4e43e'
  }
}
const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  ...settings
})

export type TodolistsType = {
  id: string
  title: string
  addedDate: string
  order: number
}
export type ResponseType<D = {}> = {
  messages: Array<string>
  fieldsErrors: Array<string>
  resultCode: number
  data: D
}
export type TaskType = {
  addedDate: string
  deadline: string | null
  description: string | null
  id: string
  order: number
  priority: number
  startDate: string | null
  status: number
  title: string
  todoListId: string
}


export type GetTasksResponseType = {
  items: Array<TaskType>
  totalCount: number
  error: string | null
}
export type ModelType = {
  title: string
  startDate: string | null
  priority: number
  description: string | null
  deadline: string | null
  status: number
}
export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: boolean
}
export type ResponseLoginType = {
  data: { userId: number }
  messages: Array<string>
  fieldsErrors: Array<string>
  resultCode: number
}
export const authAPI = {
  me() {
    return instance.get(`auth/me`)
  },
  login(values: LoginParamsType) {
    return instance.post<ResponseLoginType>(`auth/login`, values)
  },
  logout() {
    return instance.delete(`/auth/login`)
  }
}
export const TodolistsAPI = {
  //Todolists
  getTodolist() {
    return instance.get<Array<TodolistsType>>('todo-lists')
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistsType }>>('todo-lists', {title})
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
  },

  //Tasks
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType>(`todo-lists/${todolistId}/tasks`, {title})
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
  },

  changeStatus(todolistId: string, taskId: string, model: ModelType) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}