import React from 'react';
import {Box, Button, Checkbox, Container, FormControl, FormLabel, Input} from "@chakra-ui/react";
import {useFormik} from "formik";
import {useSelector} from "react-redux";
import {loginTC} from "../../reducers/auth-reducer";
import {AppRootStateType, useAppDispatch} from "../../redux-store/store";
import {Navigate} from "react-router-dom";

export const Login = () => {
  let dispatch = useAppDispatch()
  type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },

    validate: (values) => {
      const errors: FormikErrorType = {}
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 3) {
        errors.password = 'Password must be more than 3 characters long'
      }
      if (!values.email) {
        errors.email = 'Required'

      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      return errors
    },
    onSubmit: values => {
      // alert(JSON.stringify(values))

      dispatch(loginTC({email: values.email, password: values.password, rememberMe: values.rememberMe, captcha: true}))
      formik.resetForm()
    },
  })
  const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)
  if (isAuth) {
    return <Navigate to={'/'}/>
  }

  return (
    <Box display={'flex'} justifyContent={'center'} color={'gray'}>

      <form onSubmit={formik.handleSubmit}>
        <Container color={'teal'}>
          For example:
          Email: free@samuraijs.com
          Password: free
        </Container>
        <FormControl w={'500px'} borderRadius='lg' p={'3'} bgColor={'rgba(49, 151, 149,0.2)'}>
          <FormLabel>Email address</FormLabel>
          <Input  {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email ? <Box color={'red'}>{formik.errors.email}</Box> :
            <Box h={'6'}></Box>}

          <FormLabel>Password</FormLabel>
          <Input type="password" {...formik.getFieldProps('password')}/>
          {formik.touched.password && formik.errors.password ? <Box color={'red'}>{formik.errors.password}</Box> :
            <Box h={'6'}></Box>}
          <Box mt={5} mb={7} display={'flex'} justifyContent={'center'}>
            <Checkbox name='rememberMe'
                      borderColor={'teal.500'}
                      colorScheme={'teal'}
                      checked={formik.values.rememberMe}
                      onChange={formik.handleChange}>
              Remember
            </Checkbox>
            <Button
              type={'submit'}
              variant={'solid'}
              colorScheme={'red'}
              size={'sm'}
              mr={4}
              ml={4}>Login</Button>
          </Box>

        </FormControl>
      </form>
    </Box>

  )
}