"use client"

import { useState } from "react"
import YouTube from 'react-youtube'

import { Box, Image } from '@chakra-ui/react'

import { get10Roll } from './roll.js'

let videoElement = null;

export function RollButton(props) {
  const [playing, setPlaying] = useState(true)

  // Create Youtube player config for playing gacha bgm 
  const opts = {
      height: '1',
      width: '1',
      playerVars: {
        autoplay: 1,
      }
    }

  const _onReady = (event) => {
    // Loads video player for bgm
    videoElement = event;
    console.log('ready')
  }

  function handleRoll() {
    console.log('you\'ve wasted money')
    // plays bgm via react-youtube
    // TODO: make roll function wait until the player is loaded
    videoElement.target.setVolume(20)
    videoElement.target.playVideo()
    console.log(props.pool)
    // props.onPressed(get10Roll(props.pool))
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