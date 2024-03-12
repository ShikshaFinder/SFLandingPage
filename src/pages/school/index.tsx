import Card from "../../components/card";
import React, { useEffect, useState } from "react";
import Bannerad from "../../components/bannerad";
import Layoutt from "../Layout";
import supabase from "../../../supabase";
import { useAuthContext } from "@/context";
// import { useRouter } from "next/router";

export default function skillclass() {
  // const router = useRouter();
  const { user } = useAuthContext();
  const [userData, setUserData] = useState<any[] | null>(null);

  console.log(user.district);

  async function getSchool() {
    try {
      let { data, error } = await supabase
        .from("School")
        .select("*")

      if (error) throw error;
      setUserData(data);
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }

  useEffect(() => {
    getSchool();
  }, [user]);

  return (
    <>
      <Layoutt>
        <Bannerad />

        {userData &&
          userData.map(
            (
              school: { District: string; rating: number; link: string },
              index: number
            ) => (
              <Card
                key={index} // Ensure unique key for each Card
                name={school.District}
                rating={school.rating}
                link={school.link}
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
