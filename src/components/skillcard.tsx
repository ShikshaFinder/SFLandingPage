import {
  chakra,
  Box,
  Stack,
  Link,
  HStack,
  Text,
  Container,
  Icon,
  Avatar,
  Tooltip,
  StackProps,
  Divider,
  useColorModeValue
} from '@chakra-ui/react';

const UserCard = ({ skillname, icon }:{ skillname: string, icon:any }) => {
  return (
    <Container maxW="5xl" p={{ base: 5, md: 6 }}>
      <Stack
        w="9rem"
        p={6}
        border="1px solid"
        borderColor={useColorModeValue("gray.500", "gray.600")}
        rounded="md"
        _hover={{
          boxShadow: useColorModeValue(
            "0 4px 6px rgba(160, 174, 192, 0.6)",
            "0 4px 6px rgba(9, 17, 28, 0.4)"
          ),
        }}
      >
        <HStack justifyContent="space-between" alignItems="baseline">
          <Tooltip
            label="SKill Name"
            aria-label="SKill Name"
            placement="right-end"
            size="sm"
            // Sizes for Tooltip are not implemented in the default theme. You can extend the theme to implement them
          >
            <Box pos="relative">
              <Avatar
                src={icon}
                name="Skill Name "
                size="xl"
                borderRadius="md"

              />
            </Box>
          </Tooltip>
        </HStack>
        <chakra.h1 fontSize="xl" fontWeight="bold">
         {skillname}
        </chakra.h1>
      </Stack>
    </Container>

    
  );
};

export default UserCard;