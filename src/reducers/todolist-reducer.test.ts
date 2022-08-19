import {v1} from "uuid";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC, setTodolistsAC, TodolistDomainType,
  todolistReducer
} from "./todolist-reducer";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>

beforeEach(() => {
   todolistId1 = v1();
   todolistId2 = v1();
   startState = [
    {id: todolistId1,addedDate: "asdas", order: 2, title: "What to learn", filter: "all", entityStatus:'loading'},
    {id: todolistId2,addedDate: "asdas", order: 2, title: "What to buy", filter: "all", entityStatus:'loading'},
  ]
})

test('Should be CHANGE_TODOLIST_FILTER', () => {
  let endState = todolistReducer(startState,
    changeTodolistFilterAC({todolistId:todolistId1,filter:'active'}))
  expect(endState[0].filter).toBe('active')
})

test('Should be ADD_TODOLIST', () => {
  let endState = todolistReducer(startState, addTodolistAC({todolist:startState[0]}))
  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe('What to learn')
})
test('Should be REMOVE_TODOLIST', () => {
  let endState = todolistReducer(startState, removeTodolistAC({todolistId:todolistId1}))
  expect(endState.length).toBe(1)
})

test('Should be CHANGE_TODOLIST_TITLE', () => {
  let endState = todolistReducer(startState, changeTodolistTitleAC({todolistId:todolistId1,newTitle: 'Yo!'}))
  expect(endState[0].title).toBe('Yo!')
  expect(endState.length).toBe(2)
})

test('Todolists should be added to redux-store', () => {
  let endState = todolistReducer([], setTodolistsAC({todolists:startState}))
  expect(endState.length).toBe(2)
})
