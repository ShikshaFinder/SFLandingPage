import Card from "../../components/card";
import React, { use, useEffect, useState } from "react";
import Bannerad from "../../components/bannerad";
import Layoutt from "../Layout";
import supabase from "../../../supabase";
import { useAuthContext } from "@/context";
// import { useRouter } from "next/router";
import { useUser } from "@/store";

export default function skillclass() {
  // const router = useRouter();
  const { user } = useAuthContext();
  const [userData, setUserData] = useState<any[] | null>(null);

  const userStore = useUser((state) => state.user);
  // console.log("userstore", userStore);

  async function getSchool() {
    try {
      let { data, error } = await supabase
        .from("School")
        .select("*")
        .eq("State", userStore.State);
        

      // console.log('userStore.State',userStore.State);

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
        <a href="signup">signup</a>__ /__<a href="/signin">signin</a>.
      </div>
    );
  }

  return (
    <>
      <Layoutt>
        <Bannerad />

        {userData &&
          userData.map(
            (
              school: { schoolname: string; rating: number; link: string },
              index: number
            ) => (
              <Card
                key={index} // Ensure unique key for each Card
                name={school.schoolname}
                rating={school.rating}
                link={`/school/${school.schoolname}`}
                imgsrc={
                  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
              />
            )
          )}
      </Layoutt>
    </>
  );
}
