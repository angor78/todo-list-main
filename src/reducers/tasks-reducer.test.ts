import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC, setTodolistsAC, TodolistDomainType, todolistReducer} from "./todolist-reducer";
import {AllTasksType} from "../AppWithRedux";

let todolistId1: string
let todolistId2: string
let startState: AllTasksType

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = {
    [todolistId1]: [
      {
        id: v1(),
        title: "string1",
        description: null,
        todoListId: todolistId1,
        order: 1,
        status: 0,
        priority: 1,
        startDate: null,
        deadline: null,
        addedDate: "string"
      },
      {
        id: v1(),
        title: "string2",
        description: null,
        todoListId: todolistId1,
        order: 1,
        status: 0,
        priority: 1,
        startDate: null,
        deadline: null,
        addedDate: "string"
      }
    ],
    [todolistId2]: [
      {
        id: v1(),
        title: "string3",
        description: null,
        todoListId: todolistId2,
        order: 1,
        status: 0,
        priority: 1,
        startDate: null,
        deadline: null,
        addedDate: "string"
      }
    ]
  }
})


test('Should be ADD_TASK', () => {
  let action = addTaskAC({
    task:
      {
        id: v1(),
        title: "string4",
        description: null,
        todoListId: todolistId1,
        order: 1,
        status: 0,
        priority: 1,
        startDate: null,
        deadline: null,
        addedDate: "string"
      }
  })
  let endState = tasksReducer(startState, action)
  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId1][2].title).toBe('string4')
})

test('Should be REMOVE_TASK', () => {
  let endState =
    tasksReducer
    (startState, removeTaskAC({todolistId: todolistId1, taskId: startState[todolistId1][0].id}))
  expect(endState[todolistId1].length).toBe(1)
  expect(endState[todolistId1][0].title).toBe("string2")
})
test('Should be CHANGE_TASK_STATUS', () => {
  let endState =
    tasksReducer
    (startState, changeTaskStatusAC({
        todolistId: todolistId1,
        taskId: startState[todolistId1][0].id,
        status: 1
      }
    ))
  expect(endState[todolistId1][0].status).toBe(1)
  expect(endState[todolistId2][0].status).toBe(0)
})

test('Should be CHANGE_TASK_TITLE', () => {
  let endState =
    tasksReducer
    (startState, changeTaskTitleAC({
        todolistId: todolistId1,
        taskId: startState[todolistId1][0].id,
        title: '11'
      }
    ))
  expect(endState[todolistId1][0].title).toBe('11')
})

test('new array should be added when new todolist is added', () => {

  const action = addTodolistAC({todolist: {id: "todolistId1", addedDate: "asdas", order: 2, title: "What to learn"}})
  const endState = tasksReducer(startState, action)
  const keys = Object.keys(endState)
  const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2)
  if (!newKey) {
    throw Error('new key should be added')
  }
  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('ids should be equals', () => {
  const startTasksState: AllTasksType = {}
  const startTodolistsState: Array<TodolistDomainType> = []

  const action = addTodolistAC({todolist:{id: 'todolistId1', addedDate: "asdas", order: 2, title: "What to learn"}})

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})

test('property with todolistId should be deleted', () => {
  const action = removeTodolistAC({todolistId:todolistId2})
  const endState = tasksReducer(startState, action)
  const keys = Object.keys(endState)
  expect(keys.length).toBe(1)
  expect(endState[todolistId2]).not.toBeDefined()
})

test('empty arrays should be added when set todolists', () => {

  let action = setTodolistsAC({
    todolists: [
      {id: '1', addedDate: "asdas", order: 2, title: "What to learn"},
      {id: '2', addedDate: "asdas", order: 2, title: "What to buy"},
    ]
  })
  const endState = tasksReducer({}, action)
  const keys = Object.keys(endState)
  expect(keys.length).toBe(2)
  expect(endState['1']).toEqual([])
  expect(endState['2']).toStrictEqual([])
})
