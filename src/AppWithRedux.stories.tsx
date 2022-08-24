import { ComponentStory} from "@storybook/react";
import AppWithRedux from "./AppWithRedux";
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";

export default {
  title: 'Components/AppWithRedux',
  component: AppWithRedux,
  decorators:[ReduxStoreProviderDecorator,BrowserRouterDecorator]

}

export const Template: ComponentStory<typeof AppWithRedux> = (args) =><AppWithRedux/>


