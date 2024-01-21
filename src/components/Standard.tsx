import { Button ,Stack} from '@chakra-ui/react'
import React from 'react'

function Standard() {

  return (
  
  <>
    <Stack spacing={4}
        direction="row"
        align="center"
        overflowX="auto"
        whiteSpace="nowrap">
    <Button colorScheme="teal" variant="solid">
    10th
    </Button>
    <Button colorScheme="teal" variant="solid">
    11th
    </Button>
    
 
    </Stack>
    
    </>
  )
}

export default Standard