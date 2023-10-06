import { HStack, Box, Text } from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'

function TopMenuElement(props) {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Actions
      </MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>
    </Menu>
    // {props.rolls.map(function(character, idx){
    //   return (
    //     <DisplayRolledCharacter character={character}/>
    //   )
    // })}
  )
}

export function TopMenu(props) {
	return (
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
	)
}