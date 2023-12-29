'use client'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { Button, ButtonGroup, Text } from '@chakra-ui/react'
import { Input, HStack, Stack, useToast } from '@chakra-ui/react'

import { PasswordInput } from '/src/components/elements/password-input.js'

import { registerUser } from '/src/components/utils/auth.js';
import { sendErrorToast } from '/src/components/elements/toast.js';

import { useId, useState } from 'react';

export function RegisterModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [ username, setUsername ] = useState(props?.value ?? '')
  const [ password, setPassword ] = useState(props?.value ?? '')

  const toast = useToast()

  return (
    <HStack>
      <Button onClick={onOpen}>Sign In / Register</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack mb='5'>
              <Input placeholder='Username' 
                value={username}
                onInput={e => setUsername(e.target.value)}
              />
              <PasswordInput 
                value={password}
                onInput={setPassword}
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={
              () => registerUser(username, password, (e) => toast({
                title: e,
                status: 'error',
                isClosable: true,
              }),
              (user) => toast({
                title: 'User Registered',
                status: 'success',
                isClosable: true,
              }))}>
              Register
            </Button>
            <Button variant='ghost'>Sign In</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  )
}