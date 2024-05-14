import React from "react";
import { Button, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { LinkIcon } from "@chakra-ui/icons";
import { BiShareAlt } from "react-icons/bi";

function ShareButton({ link }: { link: string }) {
  const router = useRouter();
  let url = router.query;

  const handleShare = () => {
    let slugs = window.location.pathname.split("/");
    slugs = slugs.filter((slug) => slug !== "");
    let lastTwoSlugs = slugs.slice(-4);
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
        onClick={() => {
          router.push(link);
        }}
      >
        website &nbsp; <LinkIcon />
      </Button>
      <Button onClick={handleShare}>
        <BiShareAlt />
      </Button>
    </Stack>
  );
}

export default ShareButton;
