"use client"
import React from 'react'
import { Wrap, WrapItem, Button } from "@chakra-ui/react"
import Link from 'next/link';

function pagination({ mainSlug }: { mainSlug: string }) {
  return (
    <>
      <Wrap spacing={4} justify="center">
        <WrapItem>
          <Link href={`/${mainSlug}/`}>
            <Button colorScheme="gray" borderRadius="thin">1</Button>
          </Link>
        </WrapItem>{" "}
        <WrapItem>
          <Link href={`/${mainSlug}/2`}>
            <Button colorScheme="gray" borderRadius="thin">2</Button>
          </Link>
        </WrapItem>{" "}
        <WrapItem>
          <Link href={`/${mainSlug}/3`}>
            <Button colorScheme="gray" borderRadius="thin">3</Button>
          </Link>
        </WrapItem>{" "}
        <WrapItem>
          <Link href={`/${mainSlug}/4`}>
            <Button colorScheme="gray" borderRadius="thin">4</Button>
          </Link>
        </WrapItem>{" "}
        <WrapItem>
          <Link href={`/${mainSlug}/5`}>
            <Button colorScheme="gray" borderRadius="thin">5</Button>
          </Link>
        </WrapItem>{" "}
      </Wrap>
    </>
  );
}

export default pagination;
