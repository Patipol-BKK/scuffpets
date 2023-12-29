import { useToast } from '@chakra-ui/react'

export function sendToast(status, title, description) {
  const toast = useToast()
  const statuses = ['success', 'error', 'warning', 'info']

  return toast({
    title: title,
    status: status,
    description: description,
    isClosable: true,
  })
}

export function sendErrorToast(title) {
  const toast = useToast()
  const statuses = ['success', 'error', 'warning', 'info']

  return toast({
    title: title,
    isClosable: true,
  })
}