import { combineReducers} from "redux";
import {tasksReducer} from "../reducers/tasks-reducer";
import {todolistReducer} from "../reducers/todolist-reducer";
import {appReducer} from "../reducers/app-reducer";
import {AppRootStateType, RootReducerType} from "../redux-store/store";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {authReducer} from "../reducers/auth-reducer";
import {v1} from "uuid";
import {configureStore} from "@reduxjs/toolkit";
import {HashRouter} from "react-router-dom";
let todolistId1 = v1();
let todolistId2 = v1();

const rootReducer:RootReducerType = combineReducers({
  tasks:tasksReducer,
  todolists:todolistReducer,
  app:appReducer,
  auth:authReducer
})
const initialGlobalState:AppRootStateType = {
    app: {error: null, isInitialized: true, status: 'succeeded'},
    auth: {email: 'undefined', id: 1, isAuth: true, login: 'undefined'},
    todolists:[
    {id: todolistId1,addedDate: "asdas", order: 2, title: "What to learn", filter: "all", entityStatus:'loading'},
    {id: todolistId2,addedDate: "asdas", order: 2, title: "What to buy", filter: "all", entityStatus:'loading'},
  ],
  tasks:{
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
}
export const storyBookStore = configureStore({
  reducer: rootReducer,
  preloadedState:initialGlobalState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

export const ReduxStoreProviderDecorator =(storyFn:any)=>(
    <Provider store={storyBookStore}>
      {storyFn()}
    </Provider>
  )
export const BrowserRouterDecorator =(storyFn:any)=>(
  <HashRouter>
    {storyFn()}
  </HashRouter>
)
