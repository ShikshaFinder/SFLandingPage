import Card from "../../components/card";
import React, { useEffect, useState } from "react";
import Bannerad from "../../components/bannerad";
import Layoutt from "../Layout";
import supabase from "../../../supabase";
import { useAuthContext } from "@/context";
import { useUser } from "@/store";
import { Grid, Toast } from "@chakra-ui/react";
import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import Nouser from "../../components/Nouser";

export default function skillclass() {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState<any[] | null>(null);
  const userStore = useUser((state) => state.user);

  async function getcoaching() {
    try {
      let { data, error } = await supabase.from("coaching").select("*");
      // .eq("State", userStore.State);

      if (error) throw error;

      setUserData(data);

      if (error) throw error;
      setUserData(data);
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }

  useEffect(() => {
    if (userStore && userStore.State) {
      getcoaching();
    }
  }, [userStore]);

 
  if (!user.email) {
    return <Nouser />;
  }


  return (
    <>
      <Layoutt>
        <Bannerad />
        {userData === null ? (
          <Box>
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        ) : (
          <h1>Top Coaching classes in {userStore.District}</h1>
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
      </Layoutt>
    </>
  );
}
