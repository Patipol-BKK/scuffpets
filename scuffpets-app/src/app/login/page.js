import { ChakraProvider } from '@chakra-ui/react'

import { RegisterModal } from '/src/components/modals/register-modal.js'


export default function Page() {
  return (
    <ChakraProvider>
      <RegisterModal />
    </ChakraProvider>
    )
}