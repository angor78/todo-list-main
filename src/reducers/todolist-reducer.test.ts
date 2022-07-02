import {v1} from "uuid";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistReducer
} from "./todolist-reducer";
import {TodolistType} from "../AppWithReducers";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistType>

beforeEach(() => {
   todolistId1 = v1();
   todolistId2 = v1();
   startState = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"},
  ]
})

test('Should be CHANGE_TODOLIST_FILTER', () => {
  let endState = todolistReducer(startState,
    changeTodolistFilterAC(todolistId1, 'active'))
  expect(endState[0].filter).toBe('active')
})

test('Should be ADD_TODOLIST', () => {
  let endState = todolistReducer(startState, addTodolistAC('111'))
  expect(endState.length).toBe(3)
  console.log(endState)
  expect(endState[2].title).toBe('111')
})
test('Should be REMOVE_TODOLIST', () => {
  let endState = todolistReducer(startState, removeTodolistAC(todolistId1))
  expect(endState.length).toBe(1)
})

test('Should be CHANGE_TODOLIST_TITLE', () => {
  let endState = todolistReducer(startState, changeTodolistTitleAC(todolistId1, 'Yo!'))
  expect(endState[0].title).toBe('Yo!')
  expect(endState.length).toBe(2)
})
