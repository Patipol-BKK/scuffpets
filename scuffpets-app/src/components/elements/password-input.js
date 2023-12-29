import { InputGroup, Input, Button, InputRightElement } from '@chakra-ui/react';
import { useState } from "react";

export function PasswordInput({ value, onInput }) {
  const [ password, setPassword ] = useState(value);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handlePasswordChange = (e) => {
    const newValue = e.target.value;
    setPassword(newValue);
    onInput(newValue);
  }

  return (
    <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Password'
        value={password}
        onInput={handlePasswordChange}
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}