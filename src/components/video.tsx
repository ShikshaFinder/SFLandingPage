import React from 'react'
import { AspectRatio } from "@chakra-ui/react"

function video({src}: {src: string}) {
  return (
    <>
      <AspectRatio maxW="560px" ratio={1.75}>
        <iframe
          title="hihello"
          src={src}
          allowFullScreen
        />
      </AspectRatio>
    </>
  );
}

export default video