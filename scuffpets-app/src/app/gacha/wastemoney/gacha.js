"use client"
import { Grid, GridItem, HStack, Image, Stack, Box, Heading, Text } from '@chakra-ui/react'

// Import roll functions
import { DisplayRolls } from './display-rolls.js'
import { testRoll } from './roll.js'

import { RollButton } from './roll-button.js'

export function Gacha(props) {
  var currentRoll = testRoll

  function handleRoll(rolledCharacters) {
    currentRoll = rolledCharacters
    console.log(rolledCharacters)
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
          boxSize='500px'
          src='/imgs/gachapon.png' 
        />
        <Stack flex='1'>
          <Box m='2' pl='2' borderWidth='5px' borderColor='Black'overflow='hidden'>
          <Heading p='2' color='Black' fontWeight='bold'>the gachapon</Heading>
          </Box>
          <HStack align='top'>
          <RollButton
            pool = {props.pool}
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
            rolls={currentRoll}
          />
        </Stack>
        </HStack>
      </GridItem>
    </Grid>
  )
}