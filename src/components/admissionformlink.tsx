import React from 'react'
import { Box, Button, Stack, useColorMode } from '@chakra-ui/react'
import { MdOutlineDynamicForm, MdCall } from 'react-icons/md'
import Link from 'next/link'

function AdmissionFormLink({ name, phoneNumber }: { name: string, phoneNumber: number }) {
  const { colorMode } = useColorMode();

  return (
    <>
      <Box
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        p={4}
        bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
        borderTopWidth="1px"
        zIndex={20}
        borderColor={colorMode === 'light' ? 'gray.400' : 'gray.600'}
      >
        <Stack direction="row" spacing={12}>
          <Link href={`/admissionform/${name}`}>
            <Button
              leftIcon={<MdOutlineDynamicForm />}
              colorScheme={colorMode === 'light' ? 'blue' : 'teal'}
              variant="solid"
            >
              Admission form
            </Button>
          </Link>
          <a href={`tel:${phoneNumber}`}>
            <Button
              rightIcon={<MdCall />}
              colorScheme={colorMode === 'light' ? 'green' : 'green'}
              variant="outline"
            >
              Call Now
            </Button>
          </a>
        </Stack>
      </Box>
    </>
  );
}

export default AdmissionFormLink;
