import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC, todolistReducer} from "./todolist-reducer";
import {AllTasksType, TodolistType} from "../App";

let todolistId1: string
let todolistId2: string
let startState: AllTasksType

beforeEach(() => {
   todolistId1 = v1();
   todolistId2 = v1();
   startState = {
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
  }
})


test('Should be ADD_TASK', () => {
  let endState = tasksReducer(startState, addTaskAC(todolistId1, 'New'))
  expect(endState[todolistId1].length).toBe(5)
  expect(endState[todolistId1][0].title).toBe('New')
})

test('Should be REMOVE_TASK', () => {
  let endState =
    tasksReducer
    (startState, removeTaskAC(todolistId1, startState[todolistId1][0].id))
  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId1][0].title).toBe("JS")
})
test('Should be CHANGE_TASK_STATUS', () => {
  let endState =
    tasksReducer
    (startState, changeTaskStatusAC(todolistId1,
      startState[todolistId1][0].id,
      !startState[todolistId1][0].isDone
    ))
  expect(endState[todolistId1][0].isDone).toBe(false)
  expect(endState[todolistId2][0].isDone).toBe(true)
})

test('Should be CHANGE_TASK_TITLE', () => {
  let endState =
    tasksReducer
    (startState, changeTaskTitleAC(todolistId1,
      startState[todolistId1][0].id,
      '11'
    ))
  expect(endState[todolistId1][0].title).toBe('11')
  expect(endState[todolistId2][0].title).toBe("Milk")
})


test('new array should be added when new todolist is added', () => {
  const startState = {
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }
  const action = addTodolistAC('new todolist')
  const endState = tasksReducer(startState, action)
  const keys = Object.keys(endState)
  const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }
  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})
test('ids should be equals', () => {
  const startTasksState: AllTasksType = {}
  const startTodolistsState: Array<TodolistType> = []

  const action = addTodolistAC('new todolist')

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.todolistId)
  expect(idFromTodolists).toBe(action.todolistId)
})

test('property with todolistId should be deleted', () => {
  const startState: AllTasksType = {
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }

  const action = removeTodolistAC('todolistId2')
  const endState = tasksReducer(startState, action)
  const keys = Object.keys(endState)
  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
})

