import React, {ReactNode} from 'react';

import {HamburgerIcon, CloseIcon, CheckCircleIcon, ExternalLinkIcon} from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button, Flex, Heading,
  HStack,
  IconButton, Link, Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack, useColorModeValue, useDisclosure
} from "@chakra-ui/react";
import {AddItemComponent} from "../AddItemComponent/AddItemComponent";

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
  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} mb='30'>
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
                <Avatar
                  size={'sm'}
                  src={
                    'https://avatars.githubusercontent.com/u/15981680?s=400&u=c777ec047d344fe8a7f933de75e3e3db39f78841&v=4'
                  }
                />
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
      </Box>
    </>
  );
}
