import { Container } from "@chakra-ui/react";
import React from 'react'
import { Avatar, WrapItem, Wrap } from "@chakra-ui/react";

function profile() {
  return (<Container>
    <Wrap>
    <WrapItem>
    <Avatar size='2xl' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />{' '}
  </WrapItem>
</Wrap>

  </Container>)
}

export default profile
