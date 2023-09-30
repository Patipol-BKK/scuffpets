'use client';

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

import YouTube from 'react-youtube';
import { AspectRatio } from '@chakra-ui/react'

import { useState } from "react"

let videoElement = null;

import { Metadata } from 'next'



export default function Page() {

  const [playing, setPlaying] = useState(true)

  const opts = {
      height: '1',
      width: '1',
      playerVars: {
        autoplay: 1,
      },
    }

  function handleRoll() {
    setPlaying(false)
    console.log('you\'ve wasted money')
    videoElement.target.setVolume(20)
    videoElement.target.playVideo()
  }

  const _onReady = (event) => {
    videoElement = event;
    console.log('ready')
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
      <GridItem bg='yellow.100' area={'pets'}>
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
                  <Box
                    as='button'
                    onClick={handleRoll}
                  >
                    <Image 
                      boxSize='200px'
                      src='/imgs/wastemoney.png' 
                    />
                  </Box>
                  <Box m='2' pl='2' borderWidth='5px' borderColor='Black'overflow='hidden'>
                    <HStack>
                      <Text p='2' size='md' color='Black'>rolls left:</Text>
                      <Text p='2' size='md' color='Black'>1/3</Text>
                    </HStack>
                    <HStack>
                      <Text p='2' size='md' color='Black'>next roll in:</Text>
                      <Text p='2' size='md' color='Black'>4:20:09</Text>
                    </HStack>
                    <YouTube 
                      videoId='oKdcPG3T8lw'
                      opts={opts}
                      onReady={_onReady}
                    />
                  </Box>
                </HStack>
                <AspectRatio maxW='700px' ratio={310 / 166}>
                  <Image
                    src='/imgs/gacha_bg.png' 
                  />
                </AspectRatio>
                
              </Stack>
            </HStack>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
    {/*<audio ref={audioRef} src='/static/gacha_bgm.mp3' />*/}
    </ChakraProvider>
    )
}