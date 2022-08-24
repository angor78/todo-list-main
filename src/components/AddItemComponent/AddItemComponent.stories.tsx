import React from 'react';
import {AddItemComponent} from "./AddItemComponent";

import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from "../../stories/ReduxStoreProviderDecorator";


export default {
  title: 'Components/AddItemComponent',
  component: AddItemComponent,
  decorators:[ReduxStoreProviderDecorator,BrowserRouterDecorator]
}

export const AddItemBaseExample = (props:any) =><AddItemComponent addItem={(title:string)=>alert(title)}/>


