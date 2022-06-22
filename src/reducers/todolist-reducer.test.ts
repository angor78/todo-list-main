import {v1} from "uuid";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistReducer
} from "./todolist-reducer";
import {TodolistType} from "../App";



test('Should be CHANGE_TODOLIST_FILTER',()=>{
  const todolistId1 = v1();
  const todolistId2 = v1();
  let startState:Array<TodolistType>  = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"},
  ]
  let endState = todolistReducer(startState,
    changeTodolistFilterAC(todolistId1,'active'))

  expect(endState[0].filter).toBe('active')
})

test('Should be ADD_TODOLIST',()=>{
  const todolistId1 = v1();
  const todolistId2 = v1();
  let startState:Array<TodolistType>  = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"},
  ]
  let endState = todolistReducer(startState,addTodolistAC('111'))
  expect(endState.length).toBe(3)
})
test('Should be REMOVE_TODOLIST',()=>{
  const todolistId1 = v1();
  const todolistId2 = v1();
  let startState:Array<TodolistType>  = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"},
  ]
  let endState = todolistReducer(startState,removeTodolistAC(todolistId1))

  expect(endState.length).toBe(1)
})

test('Should be CHANGE_TODOLIST_TITLE',()=>{
  const todolistId1 = v1();
  const todolistId2 = v1();
  let startState:Array<TodolistType>  = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"},
  ]
  let endState = todolistReducer(startState,changeTodolistTitleAC(todolistId1,'Yo!'))

  expect(endState[0].title).toBe('Yo!')
  expect(endState.length).toBe(2)
})
