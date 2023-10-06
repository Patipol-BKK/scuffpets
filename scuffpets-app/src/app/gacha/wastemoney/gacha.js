"use client"

// Import Chakra UI elements
import { Grid, GridItem, HStack, Image, Stack, Box, Heading, Text } from '@chakra-ui/react'

// Import roll functions
import { DisplayRolls } from './display-rolls.js'
import { testRoll } from './roll.js'
import { RollButton } from './roll-button.js'

// Import for rerendering
import { useState } from 'react'

var currentRoll = undefined

export function Gacha(props) {

  // Updating key forces rerendering components that contains it
  const [key, setKey] = useState(0);

  // Callback function for when rolled character is retrieved
  // Updates currentRoll and rerender DisplayRoll to show current characters
  function handleRoll(rolledCharacters) {
    currentRoll = rolledCharacters
    setKey(currentKey => currentKey+1)
  }

  return(
    <Grid
    templateAreas={`"roll help"`}
    gridTemplateColumns={'1fr 50px'}
    h='200px'
    gap='1'
    color='blackAlpha.000'
    fontWeight='bold'
    >
      <GridItem bg='yellow' area={'roll'}>
        <HStack align='top'>
        <Image 
          width='300px'
          height='400px'
          src='/imgs/gachapon.png' 
        />
        <Stack flex='1'>
          <Box m='2' pl='2' borderWidth='5px' borderColor='Black'overflow='hidden'>
          <Heading p='2' color='Black' fontWeight='bold'>the gachapon</Heading>
          </Box>
          <HStack align='top'>
          <RollButton
            onPressed = {handleRoll}
          />
          <Box m='2' pl='2' borderWidth='5px' borderColor='Black'overflow='hidden'>
            <HStack>
            <Text p='2' size='md' color='Black'>rolls left:</Text>
            <Text p='2' size='md' color='Black'>1/3</Text>
            </HStack>
            <HStack>
            <Text p='2' size='md' color='Black'>next roll in:</Text>
            <Text p='2' size='md' color='Black'>4:20:09</Text>
            </HStack>
          </Box>
          </HStack>
          <DisplayRolls
            key={key}
            rolls={currentRoll}
          />
        </Stack>
        </HStack>
      </GridItem>
    </Grid>
  )
}