import React from "react";
import { AspectRatio } from "@chakra-ui/react";

function video({ src }: { src: string }) {
  return (
    <>
      <AspectRatio
        maxW="560px"
        ratio={1.75}
        borderRadius="1px"
        overflow="hidden"
      >
        <iframe
          title="Youtube Video"
          src={`https://www.youtube.com/embed/${src}?autoplay=1`}
          allowFullScreen
        />
      </AspectRatio>
    </>
  );
}

export default video;
