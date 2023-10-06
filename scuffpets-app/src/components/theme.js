import { theme as chakraTheme } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    body: `Comic Sans MS, ${chakraTheme.fonts?.body}`,
    heading: `Comic Sans MS, ${chakraTheme.fonts?.body}`,
  },
})

export const ScuffTheme = extendTheme(theme)

