import React, {ChangeEvent, useCallback} from 'react';
import {Box, Checkbox} from "@chakra-ui/react";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {changeStatusTask, removeTask, updateTask} from "../../reducers/tasks-reducer";
import {AppRootStateType, useAppDispatch} from "../../state/store";
import {useSelector} from "react-redux";
import {RequestStatusType} from "../../reducers/app-reducer";


type TaskPropsType = {
  id: string
  taskId: string
  status: number
  title: string
  entityStatus: string | null
}


export const Task = React.memo((props: TaskPropsType) => {
  const dispatch = useAppDispatch()
  const onClickHandler = () => dispatch(removeTask(props.id, props.taskId))
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked ? 1 : 0;
    dispatch(changeStatusTask(props.id, props.taskId, newIsDoneValue));
  }
  const onChangeTitleTask = useCallback((newTitle: string) => {
    dispatch(updateTask(props.id, props.taskId, newTitle))
  }, [props.taskId, dispatch, props.id])

  let status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

  return <Box p='3' mt='2' mb='2' fontSize='18px' color={'gray.500'} bgColor={'teal.100'}
              borderRadius={5}
              listStyleType={'none'} textAlign={'right'} className={props.status === 1 ? "is-done" : ""}>
    <Checkbox onChange={onChangeHandler}
              defaultChecked={props.status !== 0}
              colorScheme='teal'
              float={'left'}
              mr={'5'}
              borderColor={'teal.500'}
              isReadOnly={status !== 'succeeded'}/>

    <EditableSpan title={props.title} onChangeTitle={onChangeTitleTask}/>...
    <EditIcon mr='10'/>
    <DeleteIcon onClick={onClickHandler}
                ml='3'
                color={status === 'succeeded' ? "red.200" : 'gray.300'}
                focusable={status !== 'succeeded'}
                float={'right'}
                mr={'3'}
                cursor='pointer'/>
  </Box>
})
