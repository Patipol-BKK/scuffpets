// Import Chakra UI elements
import { ChakraProvider } from '@chakra-ui/react'
import { Stack, HStack } from '@chakra-ui/react'
import { Text, Heading } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'

// Import roll functions
import { DisplayRolls } from './display-rolls.js'
import { testRoll } from './roll.js'

// Import components
import { TopMenu } from '/src/components/layouts/top-menu.js'
import { PlayerInfo } from '/src/components/layouts/player-info.js'
import { PetsList } from '/src/components/layouts/pets-list.js'
import { Gacha } from './gacha.js'

// Import for checking local gacha pool data
import fs from 'fs'
import { fetchGoogleSheets } from './fetch-sheet.js'


export default function Page() {

  // If local gacha pool data doesn't exist, fetch from google sheets and save as pool.json
  // Webserver needs reloading bc the .json file is read using import
  if (!fs.existsSync(process.env.GACHA_POOL_PATH)) {
      console.log('Gacha pool does not exist, fetching from Google Sheets...')
      fetchGoogleSheets()
  }

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
        <GridItem bg='green' area={'info'}>
          <PlayerInfo 
            playerName ='joe bidet'
            raidTime = 'xx:xx'
            dailyBonusCurrent = '3'
            dailyBonusMax = '15'
            larger='69,420'
          />
        </GridItem>
        <GridItem area={'nav'}>
          <TopMenu />
        </GridItem>
        <GridItem bg='yellow.100' area={'pets'}>
          <PetsList />
        </GridItem>
        <GridItem pl='2' area={'main'}>
          <Gacha />
        </GridItem>
      </Grid>
    </ChakraProvider>
    )
}