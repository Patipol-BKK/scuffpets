import { ChakraProvider } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Text, Center, Heading } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { CloseButton } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Progress } from '@chakra-ui/react'

export default function Page() {
  return (
    <ChakraProvider>
    <Grid
      templateAreas={`"info nav"
                      "info main"
                      "pets main"`}
      gridTemplateRows={'100px 120px 1fr'}
      gridTemplateColumns={'400px 1fr'}
      h='calc(100vh)'
      gap='1'
    >
      <GridItem area={'info'}>
        <Box m='2' borderRadius='lg' borderWidth='2px' overflow='hidden' bg='BlackAlpha 50'>
          <Grid
            templateAreas={`"name raid"
                            "daily money"`}
            gridTemplateRows={'1fr 1fr'}
            gridTemplateColumns={'1fr 1fr'}
            h='200px'
            gap='1'
            color='blackAlpha.000'
            fontWeight='bold'
          >
            <GridItem p='2' area={'name'}>
              <Text fontSize='xs'>playername:</Text>
              <Text fontSize='xl'>joe bidet</Text>
            </GridItem>
            <GridItem p='2' area={'raid'}>
              <Text fontSize='xs'>raid:</Text>
              <Text fontSize='xl'>xx</Text>
              <Text fontSize='xl'>12.52</Text>
            </GridItem>
            <GridItem p='2' area={'daily'}>
              <HStack spacing='30px'>
                <Stack>
                  <Text fontSize='xs'>daily</Text>
                  <Text fontSize='xs'>bonus: </Text>
                </Stack>
                <Text fontSize='xl'>3/15</Text>
              </HStack>
              
            </GridItem>
            <GridItem p='2' area={'money'}>
              <Image 
                boxSize='50px'
                src='/imgs/larger.png' 
                alt='Dan Abramov' 
              />
              <Text fontSize='xl'>69,420,727</Text>
            </GridItem>
          </Grid>
        </Box>
      </GridItem>
      <GridItem area={'nav'}>
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
      </GridItem>
      <GridItem bg='White' area={'pets'}>
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
      </GridItem>
      <GridItem pl='2' area={'main'}>
        <Grid
          templateAreas={`"main stats skills"`}
          gridTemplateRows={'1fr'}
          gridTemplateColumns={'1fr 1fr 1fr'}
          gap='1'
          color='blackAlpha.000'
          fontWeight='bold'
        >
          <GridItem p='2' area={'main'}>
            <Card> 
              <CardBody> 
                <HStack align='top' p='2'>
                  <Stack>
                    <CloseButton bg='red.400'/>
                    <Text color='Black' fontWeight='bold'>close</Text>
                    <Button colorScheme='Black' variant='outline'>
                      goto breeding
                    </Button>
                    <Button colorScheme='Black' variant='outline'>
                      release
                    </Button>
                    <Button colorScheme='red' variant='outline'>
                      idk
                    </Button>
                  </Stack>
                  <Stack>
                    <Heading>joe birden</Heading>
                    <Image 
                      boxSize='300px'
                      src='/imgs/1.png' 
                    />
                    <HStack>
                      <Tag size='sm' key='sm' variant='solid' colorScheme='teal'>
                        currently
                      </Tag>
                      <Tag size='sm' key='sm' variant='solid' colorScheme='teal'>
                        doing
                      </Tag>
                      <Tag size='sm' key='sm' variant='solid' colorScheme='teal'>
                        your
                      </Tag>
                      <Tag size='sm' key='sm' variant='solid' colorScheme='teal'>
                        mom 😠😠😠😠
                      </Tag>
                    </HStack>
                  </Stack>
                </HStack>
                <Card>
                  <CardHeader>
                    stats
                  </CardHeader>
                  <CardBody>
                  <Stack m='1'>
                    <Text>phys stam</Text>
                    <Progress value={20} size='lg' colorScheme='red' />
                    <Text>mental health</Text>
                    <Progress value={20} size='lg' colorScheme='blue' />
                    <Text>soup</Text>
                    <Progress value={20} size='lg' colorScheme='yellow' />
                  </Stack>
                  </CardBody>
                </Card>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem p='2' area={'stats'}>
            stats
          </GridItem>
          <GridItem p='2' area={'skills'}>
            skills
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
    </ChakraProvider>
    )
}