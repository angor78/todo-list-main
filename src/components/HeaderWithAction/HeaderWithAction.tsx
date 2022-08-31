import React, {ReactNode} from 'react';

import {HamburgerIcon, CloseIcon, CheckCircleIcon, ExternalLinkIcon} from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button, Flex, Heading,
  HStack,
  IconButton, Link, Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList, Progress,
  Stack, useColorModeValue, useDisclosure
} from "@chakra-ui/react";
import {AddItemComponent} from "../AddItemComponent/AddItemComponent";
import {ErrorAlert} from "../ErrorAlert";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux-store/store";
import {RequestStatusType} from "../../reducers/app-reducer";
import {logoutTC} from "../../reducers/auth-reducer";


const Links = ['Dashboard', 'Projects', 'Team'];

const NavLink = ({children}: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

type HeaderWithActionType = {
  addTodolist: (newTitle: string) => void
}
export default function HeaderWithAction(props: HeaderWithActionType) {
  let dispatch = useDispatch<any>()
  const {isOpen, onOpen, onClose} = useDisclosure();
  const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
  const login = useSelector<AppRootStateType, string>(state => state.auth.login)
  const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)

  const onLogout = () => {
    dispatch(logoutTC({}))
  }
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} maxH={'70'}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon/> : <HamburgerIcon/>}
            aria-label={'Open Menu'}
            display={{md: 'none'}}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Heading size='lg' fontSize='28px' color={"teal.500"}><CheckCircleIcon mb={"2"}/> Todolist</Heading>

            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{base: 'none', md: 'flex'}}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={'center'}>
            <AddItemComponent addItem={props.addTodolist}/>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Link href='https://github.com/angor78' isExternal>
                    GIT <ExternalLinkIcon mx='2px'/>
                  </Link>
                </MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider/>
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
            {isAuth ?
              <Box>
                <Badge colorScheme={'blue'} p={'2'}>{login}</Badge>
                <Button size={'sm'} colorScheme={'red'} onClick={onLogout}>Logout</Button>
              </Box> :
              <Box>
                <Badge colorScheme={'blue'} p={'2'}>no user</Badge>
                <Button size={'sm'} colorScheme={'red'} onClick={onLogout}>Login</Button>
              </Box>}

          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{md: 'none'}}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
        {error !== null && <ErrorAlert error={error}/>}
        {
          status === 'loading'
            ? <Progress size='xs' isIndeterminate colorScheme={'teal'} mb='30'/>
            : <Progress size='xs' colorScheme={'teal'} mb='30'/>
        }
      </Box>
    </>
  );
}
