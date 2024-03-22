import React from "react";
import { Button, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";

function ShareButton({ link }: { link: string }) {
  const router = useRouter();
  let url = router.query;
  console.log("url", url);

  const handleShare = () => {
    let slugs = window.location.pathname.split("/");
    slugs = slugs.filter((slug) => slug !== "");
    let lastTwoSlugs = slugs.slice(-2);
    let shareUrl = "https://shikshafinder.com/" + lastTwoSlugs.join("/");

    if (navigator.share) {
      navigator
        .share({
          title: "Shiksha Finder",
          text: "I found this school on shiksha finder, It might be helpful for you too.",
          url: shareUrl,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.log("Web Share API not supported");
    }
  };

  return (
    <Stack spacing={14} direction="row" align="center">
      <Button
        colorScheme="whatsapp"
        onClick={() => {
          router.push("https://" + link);
        }}
      >
        Visit Website
      </Button>
      <Button colorScheme="teal" onClick={handleShare}>
        Share
      </Button>
    </Stack>
  );
}

export default ShareButton;
