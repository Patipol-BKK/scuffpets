import { Box, Grid, GridItem, Stack, HStack, Image, Text } from '@chakra-ui/react'

export function PlayerInfo(props) {
  return (
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
          <Text fontSize='xl'>{props.playerName}</Text>
        </GridItem>
        <GridItem p='2' area={'raid'}>
          <Text fontSize='xs'>raid:</Text>
          <Text fontSize='xl'>{props.raidTime}</Text>
        </GridItem>
        <GridItem p='2' area={'daily'}>
          <HStack spacing='30px'>
            <Stack>
              <Text fontSize='xs'>daily</Text>
              <Text fontSize='xs'>bonus: </Text>
            </Stack>
            <Text fontSize='xl'>{props.dailyBonusCurrent}/{props.dailyBonusMax}</Text>
          </HStack>
          
        </GridItem>
        <GridItem p='2' area={'money'}>
          <Image 
            boxSize='50px'
            src='/imgs/larger.png' 
            alt='Dan Abramov' 
          />
          <Text fontSize='xl'>{props.larger}</Text>
        </GridItem>
      </Grid>
    </Box>
  )
}