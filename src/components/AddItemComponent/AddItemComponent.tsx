import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, Flex, Input} from "@chakra-ui/react";

export type addItemComponentPropsType = {
  addItem: (newTitle: string) => void

}
export const AddItemComponent = (props: addItemComponentPropsType) => {
  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null)

  const addItem = () => {
    let newTitle = title.trim();
    if (newTitle !== "") {
      props.addItem(newTitle);
      setTitle("");
    } else {
      setError("Title is required");
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      addItem();
    }
  }

  return (
    <div>
      <Flex alignItems={'center'}>
        <Input size='sm'
               value={title}
               color={"teal.500"}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               placeholder={error ? error : 'Add some...'}
        />
        <Button
          onClick={addItem}
          alignItems={'center'}
          variant={'solid'}
          colorScheme={'teal'}
          size={'sm'}
          mr={4}
          ml={4}
        >Add</Button>
      </Flex>
    </div>
  )
}