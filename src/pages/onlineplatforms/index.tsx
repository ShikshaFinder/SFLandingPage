import Card from "../../components/card";
import React, { useEffect, useState } from "react";
import Bannerad from "../../components/bannerad";
import Layoutt from "../Layout";
import supabase from "../../../supabase";
import { useAuthContext } from "@/context";
import { useUser } from "@/store";
import {
  Grid,
  Stack,
  Box,
  SkeletonCircle,
  SkeletonText,
  Text,
  Button,
} from "@chakra-ui/react";
import Nouser from "../../components/Nouser";

export default function skillclass() {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState<any[] | null>(null);
  const [dataOffset, setDataOffset] = useState(0); // State to keep track of offset
  const userStore = useUser((state) => state.user);

  async function getcoaching(offset: number) {
    try {
      let { data, error } = await supabase
        .from("onlineform")
        .select("coachingname, ratingofcoaching, img, user_id")
        .range(offset, offset + 3); // Fetch 3 more items
      // .eq("District", userStore.District)

      // .eq("State", userStore.State);

      if (error) throw error;

      setUserData((prevData) =>
        prevData ? [...prevData, ...(data || [])] : data || []
      ); // Append new data
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }

  useEffect(() => {
    if (userStore && userStore.State) {
      getcoaching(dataOffset);
    }
  }, [userStore, dataOffset]); // Update effect dependencies

  const handleLoadMore = () => {
    setDataOffset((prevOffset) => prevOffset + 3); // Increment offset by 3
  };

  if (!user.email) {
    return <Nouser />;
  }

  return (
    <>
      <Layoutt>
        <Bannerad />
        <br />
        {userData === null ? (
          <Box>
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        ) : (
          <Text>Top Online Platforms</Text>
        )}

        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(4, 1fr)" }}
          gap={1}
        >
          {userData &&
            userData.map(
              (
                coaching: {
                  coachingname: string;
                  ratingofcoaching: number;
                  link: string;
                  img: string;
                  user_id: string;
                },
                index: number
              ) => (
                <Card
                  key={index} // Ensure unique key for each Card
                  name={coaching.coachingname}
                  rating={coaching.ratingofcoaching}
                  link={`/onlineplatforms/${coaching.user_id}`}
                  imgsrc={
                    coaching.img
                      ? ` //wsrv.nl/?url=${coaching.img}&h=300`
                      : "https://images.unsplash.com/photo-1595528573972-a6e4c0d71f1b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                />
              )
            )}
        </Grid>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          {" "}
          <Button onClick={handleLoadMore}>Load More</Button> // Add onClick
          handler
        </Stack>
      </Layoutt>
    </>
  );
}

// .filter("Standard", "contains", "Kg");
// .match({ State: userStore.Standard, District: userStore.medium });

// .match({ State: userStore.State, District: userStore.city });
