import React from "react";
import { Button, ButtonGroup, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";

function shareButton({ link }: { link: string }) {
  const router = useRouter();
  let url = router.query;
  console.log("url", url);

  // Get the current path and split it into slugs
  let slugs = window.location.pathname.split("/");

  // Remove empty slugs (which appear if the path starts or ends with a slash)
  slugs = slugs.filter((slug) => slug !== "");  

  // Take the last two slugs
  let lastTwoSlugs = slugs.slice(-2);

  // Join the slugs with slashes and append them to the share URL
  let shareUrl = "https://shikshafinder.com/" + lastTwoSlugs.join("/");

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
                  url: shareUrl,
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
