// import {v1} from "uuid";
// import {
//   addTaskAC,
//   addTodolistAC,
//   changeFilterAC, changeTaskStatusAC,
//   changeTitleTaskAC,
//   changeTodolistTitleAC,
//   reducer,
//   removeTaskAC, removeTodolistAC
// } from "./reducer";
// import {StateType} from "../App";
//
//
// test('Should be add task', () => {
//  const todolistId1 = v1();
//  const todolistId2 = v1();
//
//   let startState: StateType = {
//     todolists: [
//       {id: todolistId1, title: "What to learn", filter: "all"},
//       {id: todolistId2, title: "What to buy", filter: "all"},
//     ],
//     tasks: {
//       [todolistId1]: [
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS", isDone: true},
//         {id: v1(), title: "React", isDone: false},
//         {id: v1(), title: "Redux", isDone: false},
//       ],
//       [todolistId2]: [
//         {id: v1(), title: "Milk", isDone: true},
//         {id: v1(), title: "React Book", isDone: true},
//       ]
//     }
//   }
//   let endState = reducer(startState, addTaskAC('Title', todolistId1))
//   expect(endState.tasks[todolistId1][0].title).toBe("Title")
//   expect(endState.tasks[todolistId1].length).toBe(5)
// })
// test('Should be remove task', () => {
//   let todolistId1 = v1();
//   let todolistId2 = v1();
//
//   let startState: StateType = {
//     todolists: [
//       {id: todolistId1, title: "What to learn", filter: "all"},
//       {id: todolistId2, title: "What to buy", filter: "all"},
//     ],
//     tasks: {
//       [todolistId1]: [
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS", isDone: true},
//         {id: v1(), title: "React", isDone: false},
//         {id: v1(), title: "Redux", isDone: false},
//       ],
//       [todolistId2]: [
//         {id: v1(), title: "Milk", isDone: true},
//         {id: v1(), title: "React Book", isDone: true},
//       ]
//     }
//   }
//   let endState = reducer(startState, removeTaskAC(startState.tasks[todolistId1][0].id, todolistId1))
//   expect(endState.tasks[todolistId1].length).toBe(3)
//   expect(endState.tasks[todolistId1][0].title).toBe('JS')
// })
// test('Should be change title task', () => {
//   let todolistId1 = v1();
//   let todolistId2 = v1();
//
//   let startState: StateType = {
//     todolists: [
//       {id: todolistId1, title: "What to learn", filter: "all"},
//       {id: todolistId2, title: "What to buy", filter: "all"},
//     ],
//     tasks: {
//       [todolistId1]: [
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS", isDone: true},
//         {id: v1(), title: "React", isDone: false},
//         {id: v1(), title: "Redux", isDone: false},
//       ],
//       [todolistId2]: [
//         {id: v1(), title: "Milk", isDone: true},
//         {id: v1(), title: "React Book", isDone: true},
//       ]
//     }
//   }
//
//   let endState = reducer(startState, changeTitleTaskAC(startState.tasks[todolistId1][0].id, 'New', todolistId1))
//   expect(endState.tasks[todolistId1][0].title).toBe('New')
// })
// test('Should be change filter', () => {
//   let todolistId1 = v1();
//   let todolistId2 = v1();
//
//   let startState: StateType = {
//     todolists: [
//       {id: todolistId1, title: "What to learn", filter: "all"},
//       {id: todolistId2, title: "What to buy", filter: "all"},
//     ],
//     tasks: {
//       [todolistId1]: [
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS", isDone: true},
//         {id: v1(), title: "React", isDone: false},
//         {id: v1(), title: "Redux", isDone: false},
//       ],
//       [todolistId2]: [
//         {id: v1(), title: "Milk", isDone: true},
//         {id: v1(), title: "React Book", isDone: true},
//       ]
//     }
//   }
//   let endState = reducer(startState, changeFilterAC('active', todolistId1))
//   expect(endState.todolists[0].filter).toBe('active')
// })
// test('Should be change todolist title', () => {
//   let todolistId1 = v1();
//   let todolistId2 = v1();
//
//   let startState: StateType = {
//     todolists: [
//       {id: todolistId1, title: "What to learn", filter: "all"},
//       {id: todolistId2, title: "What to buy", filter: "all"},
//     ],
//     tasks: {
//       [todolistId1]: [
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS", isDone: true},
//         {id: v1(), title: "React", isDone: false},
//         {id: v1(), title: "Redux", isDone: false},
//       ],
//       [todolistId2]: [
//         {id: v1(), title: "Milk", isDone: true},
//         {id: v1(), title: "React Book", isDone: true},
//       ]
//     }
//   }
//   let endState = reducer(startState, changeTodolistTitleAC('Active', todolistId1))
//   expect(endState.todolists[0].title).toBe('Active')
// })
// test('Should be add todolist', () => {
//   let todolistId1 = v1();
//   let todolistId2 = v1();
//
//   let startState: StateType = {
//     todolists: [
//       {id: todolistId1, title: "What to learn", filter: "all"},
//       {id: todolistId2, title: "What to buy", filter: "all"},
//     ],
//     tasks: {
//       [todolistId1]: [
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS", isDone: true},
//         {id: v1(), title: "React", isDone: false},
//         {id: v1(), title: "Redux", isDone: false},
//       ],
//       [todolistId2]: [
//         {id: v1(), title: "Milk", isDone: true},
//         {id: v1(), title: "React Book", isDone: true},
//       ]
//     }
//   }
//   let endState = reducer(startState, addTodolistAC('Active'))
//   expect(endState.todolists.length).toBe(3)
// })
// test('Should be remove todolist', () => {
//   let todolistId1 = v1();
//   let todolistId2 = v1();
//
//   let startState: StateType = {
//     todolists: [
//       {id: todolistId1, title: "What to learn", filter: "all"},
//       {id: todolistId2, title: "What to buy", filter: "all"},
//     ],
//     tasks: {
//       [todolistId1]: [
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS", isDone: true},
//         {id: v1(), title: "React", isDone: false},
//         {id: v1(), title: "Redux", isDone: false},
//       ],
//       [todolistId2]: [
//         {id: v1(), title: "Milk", isDone: true},
//         {id: v1(), title: "React Book", isDone: true},
//       ]
//     }
//   }
//   let endState = reducer(startState, removeTodolistAC(todolistId1))
//   expect(endState.todolists.length).toBe(1)
// })
// test('Should be change task status', () => {
//   let todolistId1 = v1();
//   let todolistId2 = v1();
//
//   let startState: StateType = {
//     todolists: [
//       {id: todolistId1, title: "What to learn", filter: "all"},
//       {id: todolistId2, title: "What to buy", filter: "all"},
//     ],
//     tasks: {
//       [todolistId1]: [
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS", isDone: true},
//         {id: v1(), title: "React", isDone: false},
//         {id: v1(), title: "Redux", isDone: false},
//       ],
//       [todolistId2]: [
//         {id: v1(), title: "Milk", isDone: true},
//         {id: v1(), title: "React Book", isDone: true},
//       ]
//     }
//   }
//   let endState = reducer(startState,
//     changeTaskStatusAC(startState.tasks[todolistId1][0].id,
//       false,todolistId1))
//   expect(endState.tasks[todolistId1][0].isDone).toBe(false)
// })
export {}