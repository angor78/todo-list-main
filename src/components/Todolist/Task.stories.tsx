import React from 'react';
import {Task} from "./Task";
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from "../../stories/ReduxStoreProviderDecorator";

export default {
  title: 'Components/Task',
  component: Task,
  decorators:[ReduxStoreProviderDecorator,BrowserRouterDecorator]
}

export const AddItemBaseExample = (props:any) =><Task {...props}/>

