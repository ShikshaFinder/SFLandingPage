import Card from "../../components/card";
import React, { useEffect, useState } from "react";
import Layoutt from "../Layout";
import supabase from "../../../supabase";
import { useAuthContext } from "@/context";
import ImgAd from "../../components/ImgAd";
import Videoo from "../../components/videoad";
import { useUser } from "@/store";
import {
  Grid,
  Stack,
  Box,
  SkeletonCircle,
  SkeletonText,
  Button,
} from "@chakra-ui/react";
import Nouser from "../../components/Nouser";

export default function skillclass() {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState<any[] | null>(null);
  const [dataOffset, setDataOffset] = useState(0); // State to keep track of offset
  const userStore = useUser((state) => state.user);

  const [useView, setUseView] = React.useState<any[] | null>(null);
  const [userAd, setUserAd] = React.useState<any[] | null>(null);

  async function getAd() {
    try {
      let { data, error } = await supabase
        .from("marketingDetails")
        .select("img,redirecturl,videolink,user_id")
        .match({
          State: userStore.State,
          District: userStore.city,
          Board: userStore.Board,
          Standard: userStore.standardcategory,
        })
        .range(0, 0);

      setUserAd(data);
      console.log("data", data);

      if (data && data[0]?.videolink == null) {
        let { data, error } = await supabase
          .from("marketingDetailsIndustry")
          .select("img,redirecturl,videolink,user_id")
          .match({ State: userStore.State })
          .range(0, 0);

        setUserAd(data);
        console.log("yaha pe data", data);
        if (error) throw error;
      }
      if (error) throw error;
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }

  async function updateView() {
    try {
      if (userAd && userAd[0]?.videolink) {
        let { data, error } = await supabase
          .from("banneradview")
          .select("view")
          .eq("user_id", userAd?.[0]?.user_id);

        setUseView(data);
        console.log("data view", userAd?.[0]?.user_id);

        if (error) throw error;

        if (data && data[0].view !== null) {
          // Increment the 'view' column value
          const newViewValue = data[0].view + 1;
          // console.log("newViewValue", newViewValue);

          // Update the 'view' column with the new value
          const { error: updateError } = await supabase
            .from("banneradview")
            .update({ view: newViewValue })
            .eq("user_id", userAd?.[0]?.user_id);

          console.log("view incremented bdvkb");
          // console.log("updateError", updateError);

          if (updateError) {
            throw updateError;
          }
        }
      }
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }

  async function getcoaching(offset: number) {
    try {
      let { data, error } = await supabase
        .from("coaching")
        .select("coachingname, ratingofcoaching, img, user_id")
        .match({ State: userStore.State, city: userStore.city })
        .range(offset, offset + 3); // Fetch 3 more items

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
  }, [userStore, dataOffset]); // Update effect dependencies\

  useEffect(() => {
    getAd();
  }, [userStore]);

  useEffect(() => {
    updateView();
  }, [userAd]);

  const handleLoadMore = () => {
    setDataOffset((prevOffset) => prevOffset + 3); // Increment offset by 3
  };

  if (!user.email) {
    return <Nouser />;
  }

  return (
    <>
      <Layoutt>
        <Videoo
          src={(userAd && userAd[0]?.videolink) || "Q8PYzXn4HSs"}
          link={
            (userAd && userAd[0]?.redirecturl) || "https://www.vigyasa.live/"
          }
        />
        <br />
        {userData === null ? (
          <Box>
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        ) : (
          <h1>Top Coaching classes in {userStore.city}</h1>
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
                  link={`/coaching/${coaching.user_id}`}
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
          <Button onClick={handleLoadMore}>Load More</Button>
          <br />
          <ImgAd
            src={
              (userAd && userAd[0]?.img) ||
              "https://www.vigyasa.live/_next/image?url=%2Fsfv1.png&w=256&q=75"
            }
            link={
              (userAd && userAd[0]?.redirecturl) || "https://www.vigyasa.live/"
            }
          />
        </Stack>
      </Layoutt>
    </>
  );
}
