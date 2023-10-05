import { Text, Center, Heading } from '@chakra-ui/react'
import { SimpleGrid, Box, Image, Badge, Tooltip } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from '@chakra-ui/react'

// Returns bg color according to number of stars
function getFrameColor(numStars) {
  var frameBgColor = ''
  switch(numStars) {
    case 1:
      frameBgColor = 'gray.200'
      break
    case 2:
      frameBgColor = 'gray.200'
      break
    case 3:
      frameBgColor = '#bce5f7'
      break
    case 4:
      frameBgColor = '#feff7f'
      break
    case 5:
      frameBgColor = '#f7ceee'
      break
    default:
      console.log("U DONE FUCKED UP IN src\\app\\gacha\\wastemoney\\display-roll.js:DisplayRolledCharacter: numStars was %d", numStars)
  }
  return frameBgColor
}





// Renders a single roll element
function DisplayRolledCharacter(props) {
  var frameBgColor = 'White'
  if (props.character.numStars === undefined)
    console.log("U DONE FUCKED UP IN src\\app\\gacha\\wastemoney\\display-roll.js:DisplayRolledCharacter: no numStars property")

  return (
    <Tooltip hasArrow label={
        "(".concat(props.character.numStars,"*) ",props.character.name)} aria-label='A tooltip'>
      <Box maxW='sm' borderRadius='lg' overflow='hidden' borderWidth='1px' bg='white'>
        <Image
          height='100px'
          width='200px'
          src='https://picsum.photos/200'
          alt='Green double couch with wooden legs'
        />
        <Box p='2'>
          <Tag size='sm' bg={getFrameColor(props.character.numStars)} borderRadius='full'>
            <TagLabel>{props.character.numStars} Stars</TagLabel>
          </Tag>
          <Text as='b' fontSize='s' noOfLines={1}>{props.character.name}</Text>
          <HStack spacing='3'>
            <Text fontSize='xs' color='gray.600' noOfLines={1}>{props.character.type1}</Text>
            <Text fontSize='xs' color='gray.600' noOfLines={1}>{props.character.type2}</Text>
          </HStack>
        </Box>
      </Box>
    </Tooltip>
    )
}

// Renders 10 rolls from a given list of rolled characters
export function DisplayRolls(props) {
  return (
    <SimpleGrid columns={5} spacing={2} maxWidth='800px'>
      {props.rolls.map(function(character, idx){
        return (
          <DisplayRolledCharacter character={character}/>
        )
      })}
    </SimpleGrid>
  )
}