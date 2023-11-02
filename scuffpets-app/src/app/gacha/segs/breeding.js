"use client"

// Import Chakra UI elements
import { Grid, GridItem, HStack, VStack, Image, Stack, Box, Heading, Text, Button } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

// Import roll functions
// import { DisplayRolls } from './display-rolls.js'
// import { testRoll } from './roll.js'
// import { RollButton } from './roll-button.js'

// Import components
import { GachaCard } from '/src/components/layouts/gacha-card.js'

// Import for rerendering
import { useState } from 'react'

//var currentRoll = undefined

export function Breeding(props) {

  // Updating key forces rerendering components that contains it
  const [key, setKey] = useState(0);

  // Callback function for when rolled character is retrieved
  // Updates currentRoll and rerender DisplayRoll to show current characters
  /*function handleRoll(rolledCharacters) {
    currentRoll = rolledCharacters
    setKey(currentKey => currentKey+1)
  }*/

  return(
    <Grid
    templateAreas={`"breeding help"`}
    gridTemplateColumns={'1fr 50px'}
    h='200px'
    gap='1'
    color='blackAlpha.000'
    fontWeight='bold'
    >
      <GridItem bg='white' area={'breeding'}>
        <HStack align='top'>
        <Image 
          width='300px'
          height='400px'
          src='/imgs/segs.jpg' 
        />
        <Stack flex='1'>
          <Box m='2' pl='2' borderWidth='5px' borderColor='Black'overflow='hidden'>
          <Heading p='2' color='Black' fontWeight='bold'>Did anybody say segs?</Heading>
          </Box>
          <HStack align='top'>
            <VStack>
              <GachaCard align='left'/>
              <Button>Select</Button>
            </VStack>
            <VStack>
              <GachaCard align='right'/>
              <Button>Select</Button>
            </VStack>
          </HStack>
        </Stack>
        </HStack>
      </GridItem>
    </Grid>
  )
}