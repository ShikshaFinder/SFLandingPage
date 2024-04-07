import Card from "../../components/card";
import React, { useEffect, useState } from "react";
import Bannerad from "../../components/bannerad";
import Layoutt from "../Layout";
import supabase from "../../../supabase";
import { useAuthContext } from "@/context";
import { useUser } from "@/store";
import { Grid } from "@chakra-ui/react";

// import { useRouter } from "next/router";

export default function skillclass() {
  // const router = useRouter();
  const { user } = useAuthContext();
  const [userData, setUserData] = useState<any[] | null>(null);
  const userStore = useUser((state) => state.user);

  async function getSchool() {
    try {
      let { data, error } = await supabase
        .from("coaching")
        .select("*")
        // .eq("State", userStore.State);
        console.log({data, error})

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
      getSchool();
    }
  }, [userStore]);

  if (!user.email) {
    return (
      <div>
        loading/no user found ,if it is taking longer than usual ,please{" "}
        <a href="signup">signup</a>__ /__<a href="/login">signin</a>.
      </div>
    );
  }

  return (
    <>
      <Layoutt>
        <Bannerad />
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(4, 1fr)" }}
          gap={1}
        >
          {userData &&
            userData.map(
              (
                school: {
                  coachingname: string;
                  ratingofcoaching: number;
                  link: string;
                  img: string;
                },
                index: number
              ) => (
                <Card
                  key={index} // Ensure unique key for each Card
                  name={school.coachingname}
                  rating={school.ratingofcoaching}
                  link={`/school/${school.coachingname}`}
                  imgsrc={
                    school.img
                      ? ` //wsrv.nl/?url=${school.img}`
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
