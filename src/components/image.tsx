import React from 'react'
import { Image } from '@chakra-ui/react'

function image({src}: {src: any}) {
  return (
    <>
      <Image
        objectFit="cover"
        w={{ sm: "300px", md: "400px" }}
        src={`https://wsrv.nl/?url=${src}&h=300`}
        alt="Institute image"
      />
    </>
  );
}

export default image