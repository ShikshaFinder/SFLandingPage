import Card from "../../../components/card";
import React, { useEffect, useState } from "react";
import Bannerad from "../../../components/bannerad";
import Layoutt from "../../Layout";
import supabase from "../../../../supabase";
import { useAuthContext } from "@/context";
import { useRouter } from "next/router";
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

  return (
    <>
      <Layoutt>
        <Bannerad />

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
      </Layoutt>
    </>
  );
}
