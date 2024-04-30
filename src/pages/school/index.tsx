import Card from "../../components/card";
import React, { use, useEffect, useState } from "react";
import Bannerad from "../../components/bannerad";
import Layoutt from "../Layout";
import supabase from "../../../supabase";
import { useAuthContext } from "@/context";
import {
  Grid,
  Toast,
  Stack,
  Button,
  Box,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { useUser } from "@/store";
import Nouser from "@/components/Nouser";
import { useRouter } from "next/router";

export default function skillclass() {
  // const router = useRouter();
  const { user } = useAuthContext();

  const [userData, setUserData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [dataOffset, setDataOffset] = useState(0); // State to keep track of offset
  const [useView, setUseView] = React.useState<any[] | null>(null);
  const school_id = "069dd121-b40d-408b-bfcb-ed2f958785ed";

  

   async function updateView() {
     try {
       if (typeof school_id === "string") {
         let { data, error } = await supabase
           .from("banneradview")
           .select("view")
           .eq("user_id", school_id);

         setUseView(data);
         if (error) throw error;

         console.log("view", data);

         if (data && data[0].view !== null) {
           // Increment the 'view' column value
           const newViewValue = data[0].view + 1;
           // console.log("newViewValue", newViewValue);

           // Update the 'view' column with the new value
           const { error: updateError } = await supabase
             .from("banneradview")
             .update({ view: newViewValue })
             .eq("user_id", school_id);

           console.log("view incremented bdvkb");
           // console.log("updateError", updateError);

           if (updateError) {
             throw updateError;
           }
         }
       } else {
         console.log("string error");
       }
     } catch (error) {
       console.log("Caught Error:", error);
     }
   }

  const userStore = useUser((state) => state.user);
  console.log(userStore);
  const router = useRouter();
  async function getSchool(offset: number) {
    try {
      let { data, error } = await supabase
        .from("School")
        .select("schoolname, ratingofschool, img, user_id")
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
    if (userStore && userStore.State) {
      getSchool(dataOffset);
    }
  }, [userStore, dataOffset]); // Update effect dependencies
   const handleLoadMore = () => {
     setDataOffset((prevOffset) => prevOffset + 3); // Increment offset by 3
   };

 


   useEffect(() => {
     updateView();
   }, []);

    if (!user.email) {
      return <Nouser />;
    }


  return (
    <>
      <Layoutt>
        <Bannerad />
        <br />
        {userData === null ? (
         <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
            <Button
              colorScheme="teal"
              display={"flex"}
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.reload();
                }
              }}
            >
              Reload Page
            </Button>
          </Stack>
        ) : (
          <h1>Top Schools in {userStore.city}</h1>
        )}

        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(4, 1fr)" }}
          gap={1}
        >
          {userData &&
            userData.map(
              (
                school: {
                  schoolname: string;
                  ratingofschool: number;
                  link: string;
                  img: string;
                  user_id: string;
                },
                index: number
              ) => (
                <Card
                  key={index} // Ensure unique key for each Card
                  name={school.schoolname}
                  rating={school.ratingofschool}
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
          <Button onClick={handleLoadMore}>Load More</Button>
        </Stack>
        <br />
      </Layoutt>
    </>
  );
}
