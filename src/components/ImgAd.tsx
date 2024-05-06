import React, { use } from "react";
import { Image, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";

function video({ src, link }: { src: string; link: string }) {
  const router = useRouter();

  return (
    <>
      <Stack
        spacing={2}
        mx={"auto"}
        maxW={"lg"}
        py={{
          base: 12,
          md: 12,
          small: 2,
        }}
        px={{
          base: 6,
          md: 6,
          small: 2,
        }}
      >
        <Text>
          {" "}
          This site might help you...Click on img <b>Sponsored</b>
        </Text>
        <Link href={link || "https://www.vigyasa.live/"}>
          {" "}
          <Image
            objectFit="cover"
            w="100%"
            borderWidth="1px"
            _hover={{ shadow: "lg" }}
            src={src}
            alt="Promotion Image"
          />
        </Link>
      </Stack>
    </>
  );
}

export default video;
