import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, Flex, Input} from "@chakra-ui/react";
import {RequestStatusType} from "../../reducers/app-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";

export type addItemComponentPropsType = {
  addItem: (newTitle: string) => void
}
export const AddItemComponent = React.memo((props: addItemComponentPropsType) => {
  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null)

  const addItem = () => {
    let newTitle = title.trim();
    if (newTitle !== "") {
      props.addItem(newTitle);
      setTitle("");
    }
    if (newTitle === "") {
      setError("Title is required");
    }

  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e) {
      setTitle(e.currentTarget.value)
    }
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.charCode === 13) {
      addItem();
    }
  }
  let status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

  return (
    <div>
      <Flex alignItems={'center'}>
        <Input size='sm'
               focusBorderColor={'teal.500'}
               value={title}
               color={"teal.500"}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               placeholder={error ? error : 'Add some...'}
               disabled={status!=='succeeded'}
        />
        <Button
          onClick={addItem}
          alignItems={'center'}
          variant={'solid'}
          colorScheme={'teal'}
          size={'sm'}
          mr={4}
          ml={4}
          disabled={status!=='succeeded'}
        >Add</Button>
      </Flex>
    </div>
  )
})