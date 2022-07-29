import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {Task} from "./Task";
import {Provider, useSelector} from "react-redux";
import {AppRootStateType, store} from "../../state/store";
import {TaskType} from "../../api/todolists-api";

export default {
  title: 'Components/Task',
  component: Task,

} as ComponentMeta<typeof Task>;

const UsingReduxComponent = () => {
  const task:TaskType = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
  return <Task
    id={'todolistId1'}
    taskId={task.id}
    status={task.status}
    title={task.title}
  />
}

const Template: ComponentStory<typeof UsingReduxComponent> = (args) =><Provider store={store}> <UsingReduxComponent /></Provider>

export const Task1Story = Template.bind({});
Task1Story.args = {}
