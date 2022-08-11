import React from 'react';
import {Box, Button, FormControl, FormLabel, Input} from "@chakra-ui/react";

export const Login = () => {

  return (
    <Box display={'flex'} justifyContent={'center'} >
      <FormControl w={'500px'} h={'250px'}  borderRadius='lg' p={'3'}  bgColor={'rgba(49, 151, 149,0.2)'}>
        <FormLabel>Email address</FormLabel>
        <Input type='email'/>
        <FormLabel>Password</FormLabel>
        <Input type='password'/>
        <Button
          alignItems={'center'}
          variant={'solid'}
          colorScheme={'teal'}
          size={'sm'}
          mt={8}
          mr={4}
          ml={4}>Submit</Button>
      </FormControl>
    </Box>

  )
}