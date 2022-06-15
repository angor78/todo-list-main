import {v1} from "uuid";
import {addTaskAC, changeTitleTaskAC, reducer, removeTaskAC} from "./reducers";
import {StateType} from "./App";


test('Should be add task', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let startState: StateType = {
    todolists: [
      {id: todolistId1, title: "What to learn", filter: "all"},
      {id: todolistId2, title: "What to buy", filter: "all"},
    ],
    tasks: {
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
  }
  let endState = reducer(startState, addTaskAC('Title', todolistId1))
  expect(endState.tasks[todolistId1][0].title).toBe("Title")
  expect(endState.tasks[todolistId1].length).toBe(5)
})
test('Should be remove task', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let startState: StateType = {
    todolists: [
      {id: todolistId1, title: "What to learn", filter: "all"},
      {id: todolistId2, title: "What to buy", filter: "all"},
    ],
    tasks: {
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
  }
  let endState = reducer(startState, removeTaskAC(startState.tasks[todolistId1][0].id, todolistId1))
  expect(endState.tasks[todolistId1].length).toBe(3)
  expect(endState.tasks[todolistId1][0].title).toBe('JS')
})
test('Should be change title task',()=>{
  let todolistId1 = v1();
  let todolistId2 = v1();

  let startState: StateType = {
    todolists: [
      {id: todolistId1, title: "What to learn", filter: "all"},
      {id: todolistId2, title: "What to buy", filter: "all"},
    ],
    tasks: {
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
  }

  let endState = reducer(startState,changeTitleTaskAC(startState.tasks[todolistId1][0].id,'New',todolistId1))
  expect(endState.tasks[todolistId1][0].title).toBe('New')
})