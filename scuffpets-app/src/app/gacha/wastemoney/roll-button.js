"use client"

// Import Chakra UI elements
import { Box, Image, useToast } from '@chakra-ui/react'

import YouTube from 'react-youtube'
import { useState } from 'react'

import { get10Roll } from './roll.js'

// Initialize bgm player
let videoElement = undefined

export function RollButton(props) {


  // Define const for controlling bgm player
  const [playing, setPlaying] = useState(true)

  // Create Youtube player config for playing gacha bgm 
  const opts = {
      height: '1',
      width: '1',
      playerVars: {
        autoplay: 1,
      }
    }

  // Initialize toast for displaying alert/error msgs
  const toast = useToast()

  // Callback when video player has been loaded
  const _onReady = (event) => {
    // Loads video player for bgm
    videoElement = event;
    console.log('ready')
  }

  // Handles roll button press
  function handleRoll() {
    console.log('you\'ve wasted money')
    // Plays bgm via react-youtube
    if (videoElement !== undefined) {
      videoElement.target.setVolume(20)
      videoElement.target.playVideo()

      // Rolls 10 characters and trigger callback function
      props.onPressed(get10Roll())
    }

    // Display error msg, video player is still loading
    else {
      toast({
          title: 'still loading, plz don\'t spam',
          description: ">>>>>>:(",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
    }
  }

  return (
    <Box
      as='button'
      onClick={handleRoll}
    >
      <Image 
        boxSize='200px'
        src='/imgs/wastemoney.png' 
      />
      <YouTube 
        videoId='oKdcPG3T8lw'
        opts={opts}
        onReady={_onReady}
      />
    </Box>
    )
}