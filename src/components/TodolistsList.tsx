import React from 'react';
import {Box} from "@chakra-ui/react";
import {Todolist} from "./Todolist/Todolist";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TodolistDomainType} from "../reducers/todolist-reducer";
import {AllTasksType} from "../AppWithRedux";


export const TodolistsList = () => {
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, AllTasksType>(state => state.tasks)
  return (
    <Box alignItems={'top'} display={"flex"} flexWrap={'wrap'} justifyContent={'center'} minHeight={800}>
      {todolists.map(tl => {

        return <Box key={tl.id}
                    minWidth={'350'}
                    display={"flex"}
                    overflow='hidden'
                    padding={10}>
          <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasks[tl.id]}
            filter={tl.filter}
            entityStatus={tl.entityStatus}
          />
        </Box>
      })
      }
    </Box>
  )
}