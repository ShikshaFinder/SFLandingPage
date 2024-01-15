import React from 'react'
import { Box, Button, Stack } from '@chakra-ui/react'
import { MdOutlineDynamicForm, MdCall } from 'react-icons/md'
import Link from 'next/link'


function admissionformlink({name,phoneNumber}:{name:string,phoneNumber:number}) {
  return (
    <>
      <Box
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        p={4}
        bg="gray.100"
        borderTopWidth="1px"
        zIndex={20}
        borderColor="gray.400"
      >
        <Stack direction="row" spacing={100}>
          <Link href={`/admissionform/${name}`}>
            {" "}
            <Button
              leftIcon={<MdOutlineDynamicForm />}
              colorScheme="pink"
              variant="solid"
            >
              Admission form
            </Button>
          </Link>
          <a href={`tel:${phoneNumber}`}>
            {" "}
            <Button rightIcon={<MdCall />} colorScheme="blue" variant="outline">
              Call us
            </Button>
          </a>
        </Stack>
      </Box>
      ;
    </>
  );
}

export default admissionformlink