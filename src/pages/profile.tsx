import React, { useEffect, useState } from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Button,
  Box,
  useTab,
  useMultiStyleConfig,
  Spinner,
  Center,
} from "@chakra-ui/react";
import Profilee from "../components/profile";
import Leaderbord from "../components/Leaderbord";
import { useAuthContext } from "@/context";
import supabase from "../../supabase";
import Layout from "./Layout";
import { useRouter } from "next/router";


type UserType = {
  app_metadata: {
    provider: string;
    providers: string[];
  };
  aud: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  created_at: string;
  email: string;
  email_confirmed_at: string;
  id: string;
  identities: Array<any>; // You might want to define a type for this array
  last_sign_in_at: string;
  phone: any;
  role: string;
  updated_at: string;
};


function Profile() {
  const { user } = useAuthContext() as { user: UserType };
  const [userData, setUserData] = useState<any>();
  const router = useRouter();
  async function getStudent() {
    try {
      let { data, error } = await supabase
        .from("Student")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;

      if (!data) return;

      setUserData(data);
    } catch (error) {
      router.push("/formstudent");
    }
  }

  useEffect(() => {
    getStudent();
  }, [user]);
  console.log(user.id);

  const CustomTab = React.forwardRef<HTMLElement, any>((props, ref) => {
    // 1. Reuse the `useTab` hook
    const tabProps = useTab({ ...props, ref });
    const isSelected = !!tabProps["aria-selected"];

    // 2. Hook into the Tabs `size`, `variant`, props
    const styles = useMultiStyleConfig("Tabs", tabProps);

    return (
      <Button __css={styles.tab} {...tabProps}>
        <Box as="span" mr="2">
          {isSelected ? "😎" : "😐"}
        </Box>
        {tabProps.children}
      </Button>
    );
  });

  if (!userData)
    return (
      <Center>
        <Spinner color="green.500" />
      </Center>
    );

  return (
    <>
      <Layout>
        {" "}
        <Tabs>
          <TabList>
            <CustomTab>Profile</CustomTab>
            <CustomTab>Leaderbord</CustomTab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {" "}
              <Profilee
                name="harsh"
                city={userData[0].District}
                state={userData[0].State}
                email={user.email}
                coins={userData[0].Coins}
                medium={userData[0].medium}
                standard={userData[0].Standard}
                board={userData[0].Board}
              />
            </TabPanel>
            <TabPanel>
              <Leaderbord name="you" number={78} name1="Shree Ram" name2="Harsh Jani" name3="rudra joshi"/>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <a href="schoolleaderbord" style={{ textDecoration: 'underline', color: 'blue' }}>school leaderbord</a>
      </Layout>
    </>
  );
}

export default Profile;

export async function getServerSideProps(context: any) {
  let content = "shiksha finder"; // Fetch the data here

  return {
    props: {
      content, // will be passed to the page component as props
    },
  };
}