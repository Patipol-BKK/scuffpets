import { HStack, Box, Text } from '@chakra-ui/react'

export function TopMenu() {
	return (
		<HStack spacing='1'>
          <Box as='button' p='4' bg='gray.700' h='100px' w='80px'>
            <Text color='White'>inv</Text>
          </Box>
          <Box as='button' p='4' bg='gray.700' h='100px' w='80px'>
            <Text color='White'>gachapon</Text>
          </Box>
          <Box as='button' p='4' bg='gray.700' h='100px' w='80px'>
            <Text color='White'>adv</Text>
          </Box>
          <Box as='button' p='4' bg='gray.700' h='100px' w='80px'>
            <Text color='White'>mini games</Text>
          </Box>
          <Box as='button' p='4' bg='gray.700' h='100px' w='80px'>
            <Text color='White'>casino</Text>
          </Box>
          <Box as='button' p='4' bg='gray.700' h='100px' flex='1'>
            <Text color='White'>don't click this</Text>
          </Box>
        </HStack>
	)
}