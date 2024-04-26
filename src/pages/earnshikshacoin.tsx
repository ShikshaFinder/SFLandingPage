import React from "react";
import { Button, Stack } from "@chakra-ui/react";
import Link from "next/link";

function earnshikshacoin() {
  const handleShare = () => {
    let slugs = window.location.pathname.split("/");
    slugs = slugs.filter((slug) => slug !== "");
    let shareUrl = "https://shikshafinder.com/";

    if (navigator.share) {
      navigator
        .share({
          title: "Shiksha Finder",
          text: "I found this website named shiksha finder ,it might be help for you too.",
          url: shareUrl,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.log("Web Share API not supported");
    }
  };
 
  return (
    <>
      <div>
        Shiksha Coin refferal program is still in development ,we are sorry for
        incovinience
      </div>
      <br /><br />
      <Stack spacing={14} direction="row" align="center" >
        <Link href="/">
          <Button colorScheme="teal">home page</Button>
        </Link>
        <Button colorScheme="teal" onClick={handleShare}>
          Share
        </Button>
      </Stack>
    </>
  );
}

export default earnshikshacoin;
