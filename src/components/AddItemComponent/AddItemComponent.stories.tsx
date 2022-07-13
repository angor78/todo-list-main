import React from 'react';
import {AddItemComponent} from "./AddItemComponent";


export default {
  title: 'Components/AddItemComponent',
  component: AddItemComponent,
}

export const AddItemBaseExample = (props:any) => {
  return <AddItemComponent addItem={(title:string)=>alert(title)}/>
}

