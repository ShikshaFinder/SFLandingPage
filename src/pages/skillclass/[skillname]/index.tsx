import Card from "../../../components/card";
import React, { useEffect, useState } from "react";
import Bannerad from "../../../components/bannerad";
import Layoutt from "../../Layout";
import supabase from "../../../../supabase";
import { useAuthContext } from "@/context";
import { useRouter } from "next/router";
import { Grid } from "@chakra-ui/react";
import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
// import { useRouter } from "next/router";


export default function Skillclass() {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState<any[] | null>(null);
const router = useRouter();
const { skillName } = router.query;


  async function getskill() {
    try {
      let { data, error } = await supabase.from("skillclass").select("*");

      if (error) throw error;
      setUserData(data);
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }

  useEffect(() => {
    getskill();
  }, [user]);

   if (!user.email) {
     return (
       <div>
         no user found ,if it is taking longer than usual ,please{" "}
         <a href="signup">signup</a>__ /__<a href="/login">signin</a>.
       </div>
     );
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
          <h1>Top Skill classes </h1>
        )}

        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(4, 1fr)" }}
          gap={1}
        >
          {userData &&
            userData.map(
              (
                skill: { skillname: string; rating: number; link: string },
                index: number
              ) => (
                <Card
                  key={index} // Ensure unique key for each Card
                  name={skill.skillname}
                  rating={skill.rating}
                  link={`/skillclass/${skillName}/${skill.skillname}`}
                  imgsrc={
                    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                />
              )
            )}
        </Grid>
      </Layoutt>
    </>
  );
}
