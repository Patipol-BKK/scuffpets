import { Stack, Image, HStack, Box, Text } from '@chakra-ui/react'

// TODO: make this dynamic
export function PetsList() {
  return (
    <Stack>
      <Box m='2' pl='2' borderWidth='5px' borderColor='Green'overflow='hidden'>
          <Text color='Black' fontWeight='bold'>pets</Text>
      </Box>
      <Stack spacing='2' mt='2' ml='2'>
        <HStack>
          <Image 
            boxSize='150px'
            src='/imgs/1.png' 
          />
          <Image 
            boxSize='150px'
            src='/imgs/2.png' 
          />
        </HStack>
        <HStack>
          <Image 
            boxSize='150px'
            src='/imgs/3.png' 
          />
          <Image 
            boxSize='150px'
            src='/imgs/4.png' 
          />
        </HStack>
        <HStack>
          <Image 
            boxSize='150px'
            src='/imgs/5.png' 
          />
          <Image 
            boxSize='150px'
            src='/imgs/6.png' 
          />
        </HStack>
      </Stack>
    </Stack>
  )
}
