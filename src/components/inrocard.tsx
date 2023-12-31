import React, { useState } from "react";
import {
  Image,
  Stack,
  Card,
  CardBody,
  Heading,
  Text,
} from "@chakra-ui/react";

function introcard() {
  const [userImage, setUserImage] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        {userImage ? (
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src={userImage}
            alt="User Image"
          />
        ) : (
          <input type="file" accept="image/*" onChange={handleImageChange} />
        )}

        <Stack>
          <CardBody>
            <Heading size="md">
              Ask your doubts, solve your queries to your personal AI chatbot
            </Heading>

            <Text py="2">
              With the help of your board-trained chatbot, you will be able to
              generate precise answers.
            </Text>
          </CardBody>

       
        </Stack>
      </Card>
    </>
  );
}

export default introcard;
