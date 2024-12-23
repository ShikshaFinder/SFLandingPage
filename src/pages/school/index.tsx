import Card from "../../components/card";
import React, { use, useEffect, useState } from "react";
import ImgAd from "../../components/ImgAd";
import Videoo from "../../components/videoad";
import Layoutt from "../Layout";
import supabase from "../../../supabase";
import { useAuthContext } from "@/context";
import Nodata from "@/components/Nodata";
import { Grid, Toast, Stack, Button, Text } from "@chakra-ui/react";
import { useUser } from "@/store";
import Nouser from "@/components/Nouser";
import { BiShareAlt } from "react-icons/bi";
import { NextSeo } from "next-seo";
import Head from "next/head";


export default function skillclass() {
  const { user } = useAuthContext();

  const [userData, setUserData] = useState<any[] | null>(null);
  const [dataOffset, setDataOffset] = useState(0); // State to keep track of offset
  const userStore = useUser((state) => state.user);

  // console.log(userStore);
  const [isLoading, setIsLoading] = useState(false); // Initialize loading state

  const [useView, setUseView] = React.useState<any[] | null>(null);
  const [userAd, setUserAd] = React.useState<any[] | null>(null);

  

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

  async function getAd() {
    try {
      let { data, error } = await supabase
        .from("marketingDetails")
        .select("img,redirecturl,videolink,user_id")
        .match({
          State: userStore.State,
          District: userStore.city,
          Standard: userStore.standardcategory,
          paid: true,
        })
        .range(0, 0);

      setUserAd(data);
      // console.log("data", data);

      if (data && data[0]?.videolink == null) {
        let { data, error } = await supabase
          .from("marketingDetailsIndustry")
          .select("img,redirecturl,videolink,user_id")
          .match({ State: userStore.State, paid: true })
          .range(0, 0);

        setUserAd(data);
        // console.log("yaha pe data", data);
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

  async function updateClick() {
    try {
      if (userAd && userAd[0]?.videolink) {
        let { data, error } = await supabase
          .from("banneradview")
          .select("click")
          .eq("user_id", userAd?.[0]?.user_id);

        setUseView(data);
        console.log("data view", userAd?.[0]?.user_id);

        if (error) throw error;

        if (data && data[0].click !== null) {
          // Increment the 'view' column value
          const newViewValue = data[0].click + 1;
          // console.log("newViewValue", newViewValue);

          // Update the 'view' column with the new value
          const { error: updateError } = await supabase
            .from("banneradview")
            .update({ click: newViewValue })
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

  async function getSchool(offset: number) {
    try {
      let { data, error } = await supabase
        .from("School")
        .select("schoolname, subdistrict, img, user_id")
        .match({ State: userStore.State, District: userStore.city })
        .range(offset, offset + 3);

      setUserData((prevData) =>
        prevData ? [...prevData, ...(data || [])] : data || []
      ); // Append new data
      // setLoading(false);

      if (error) throw error;
    } catch (error) {
      Toast({
        title: "Error",
        description: "Error fetching data",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    getAd();
  }, [userStore]);

  useEffect(() => {
    updateView();
  }, [userAd]);

  useEffect(() => {
    if (userStore && userStore.State) {
      getSchool(dataOffset);
    }
  }, [userStore, dataOffset]); // Update effect dependencies
  const handleLoadMore = async () => {
    setIsLoading(true); // Start loading state

    try {
      await getSchool(dataOffset); // Fetch more data
      setDataOffset((prevOffset) => prevOffset + 3); // Increment offset by 3
    } catch (error) {
      console.error("Error loading more schools:", error);
    }

    setIsLoading(false); // End loading state
  };

  if (!user.email) {
    return <Nouser />;
  }
  console.log("userAd", userAd);

  return (
    <>
      <Layoutt>
        <NextSeo
          title={`top schools in `}
          description={`Which is the most affordable school in },how to find best school in ,best school in  for your child, top schools`}
        />
        <Head>
          <meta
            name={`Shiksha Finder Schools In `}
            content={`Which is the most affordable , how to find best school in,best school in for your child, top schools in`}
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Videoo
          src={(userAd && userAd[0]?.videolink) || "Q8PYzXn4HSs"}
          link={
            (userAd && userAd[0]?.redirecturl) || "https://www.vigyasa.live/"
          }
          Click={updateClick}
        />
        <br />
        {userData === null ? (
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Nodata />
          </Stack>
        ) : (
          <h1>
            {" "}
            <Stack
              spacing={8}
              mx={{
                base: "auto",
                lg: "-0.5",
              }}
              maxW={"lg"}
              px={6}
            >
              <Text as="b">Top Schools in {userStore.city}</Text>
            </Stack>
          </h1>
        )}
        <br />
{/* <a href="/yt">Compare Demo Lectures</a> */}
{/* <br /> */}
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          gap={6}
        >
          {userData &&
            userData.map(
              (
                school: {
                  schoolname: string;
                  subdistrict: string;
                  link: string;
                  img: string;
                  user_id: string;
                },
                index: number
              ) => (
                <Card
                  key={index} // Ensure unique key for each Card
                  name={school.schoolname}
                  rating={school.subdistrict}
                  link={`/school/${school.user_id}`}
                  imgsrc={
                    school.img
                      ? ` //wsrv.nl/?url=${school.img}&h=300`
                      : "https://images.unsplash.com/photo-1595528573972-a6e4c0d71f1b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                />
              )
            )}
        </Grid>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          {" "}
          {userData && userData.length > 0 && (
            <Button
              onClick={handleLoadMore}
              isLoading={isLoading}
              loadingText="Loading..."
              colorScheme="teal"
            >
              Load More Schools
            </Button>
          )}
          <Button
            colorScheme="blue"
            onClick={handleShare}
            leftIcon={<BiShareAlt />}
            size="lg"
          >
            Share this page
          </Button>
          <a href="/detailsSchool" style={{ display: "block" }}>
            {" "}
            <Button>Visit all schools in Gujarat</Button>
          </a>
          <br />
          <button onClick={updateClick}>
            {" "}
            <ImgAd
              src={
                (userAd && userAd[0]?.img) ||
                "https://wsrv.nl/?url=https://blobimageshikshafinder.blob.core.windows.net/shikshafinder/1714766849103_vigysalogo.png&h=300"
              }
              link={
                (userAd && userAd[0]?.redirecturl) ||
                "https://www.vigyasa.live/"
              }
            />
          </button>
        </Stack>
      </Layoutt>
    </>
  );
}
