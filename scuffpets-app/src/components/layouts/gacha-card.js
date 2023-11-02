import { Box, Grid, GridItem, Stack, HStack, VStack, Image, Text, Heading, Tag, Progress } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'


export function GachaCard(props) {
  
  function CardInfo(props) {
    return (
      <HStack align='top' p='2'>
        <Stack>
          <Heading>joe birden</Heading>
          <Heading as='h6' size='xs'>☆☆☆☆</Heading>
          <Image 
            boxSize='200px'
            src='/imgs/1.png' 
          />
          <HStack>
            <Tag size='sm' key='sm' variant='solid' colorScheme='teal'>
              bird
            </Tag>
            <Tag size='sm' key='sm' variant='solid' colorScheme='teal'>
              president
            </Tag>
          </HStack>
        </Stack>
      </HStack>
    )
  }

  function CardStats(props) {
    return (
      <Card>
        <CardHeader paddingBottom={1}>
          stats
        </CardHeader>
        <CardBody>
          <Stack m='1' maxWidth={200} maxHeight={300}>
            <Text fontSize="sm">phys stam</Text>
            <Progress value={89} size='md' colorScheme='red' />
            <Text fontSize="sm" color='gray'>89</Text>
            <Text fontSize="sm">mental health</Text>
            <Progress value={46} size='md' colorScheme='blue' />
            <Text fontSize="sm" color='gray'>46</Text>
            <Text fontSize="sm">soup</Text>
            <Progress value={7} size='md' colorScheme='yellow' />
            <Text fontSize="sm" color='gray'>7</Text>
            <Text fontSize="sm">percentage of becoming the next president</Text>
            <Progress value={98} size='md' colorScheme='green' />
            <Text fontSize="sm" color='gray'>98</Text>
          </Stack>
        </CardBody>
      </Card>
    )
  }

  function CardSkills(props) {
    return (
      <Card>
            <CardHeader paddingBottom={1}>
              skills
            </CardHeader>
            <CardBody>
              <Stack m='1' maxWidth={200} maxHeight={300}>
                <Card background="yellow.300" p="2">
                  <Heading size="sm">win presidency</Heading>
                  ☆☆☆☆
                </Card>
                <Card background="blue.300" p="2">
                  <Heading size="sm">poop on opponent</Heading>
                  ☆☆☆☆☆
                </Card>
                <Card background="red.300" p="2">
                  <Heading size="sm">read from script without errors</Heading>
                  ☆
                </Card>
              </Stack>
            </CardBody>
          </Card>
    )
  }

  function CardInCorrectOrder(props) {
    if (props.align === "left") {
      return (
        <HStack align='top' p='2'>
          <CardInfo/>
          <CardStats/>
          <CardSkills/>
        </HStack>
      )
    }
    else {
      return (
        <HStack align='top' p='2'>
          <CardSkills/>
          <CardStats/>
          <CardInfo/>
        </HStack>
      )
    }
  }
  
  return (
    <Card background="lightgray"> 
      <CardBody> 
        <CardInCorrectOrder align={props.align}/>
      </CardBody>
    </Card>
  )
}