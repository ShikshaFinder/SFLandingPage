import React, { use } from "react";
import { AspectRatio, Stack, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

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
        <AspectRatio maxW="560px" ratio={1.75}>
          <iframe
            title="hello"
            src={
              `https://www.youtube.com/embed/${src}?autoplay=1` ||
              "https://www.youtube.com/embed/Q8PYzXn4HSs?si=HF3XvS_3Eu1RO93K?autoplay=1"
            }
            allowFullScreen
          />
        </AspectRatio>
        <Button
          onClick={() => {
            router.push(link || "https://www.vigyasa.live/");
          }}
        >
          visit site
        </Button>
      </Stack>
    </>
  );
}

export default video;
