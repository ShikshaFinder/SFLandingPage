import React from "react";
import { Button, ButtonGroup, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";

function shareButton({ link }: { link: string }) {
  const router = useRouter();
  let url=router.query;
console.log("url",url);

  return (
    <>
      <Stack spacing={14} direction="row" align="center">
        <Button
          colorScheme="whatsapp"
          onClick={() => {
            router.push("https://" + link);
          }}
        >
          Visit Website
        </Button>

        <Button
          colorScheme="teal"
          onClick={() => {
            // if (!url) return console.log("No url found");
            // if (Array.isArray(url)) url = url[0]; // use the first string if url is an array

            if (navigator.share) {
              navigator
                .share({
                  title: "Shiksha Finder",
                  text: "I found this school on shiksha finder ,It might be helpful for you too.",
                  url: "shikshafinder.com/schools/",
                })
                .then(() => console.log("Successful share"))
                .catch((error) => console.log("Error sharing", error));
            } else {
              console.log("Web Share API not supported");
            }
          }}
        >
          Share
        </Button>
      </Stack>
    </>
  );
}

export default shareButton;
