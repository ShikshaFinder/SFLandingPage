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

function Profile() {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState<any>();
  const router = useRouter();
  async function getStudent() {
    try {
      let { data, error } = await supabase
        .from("Student")
        .select("*")
        .eq("user_id", user.id);

      setUserData(data);
    } catch (error) {
      router.push("/formstudent");
    }
  }

  useEffect(() => {
    getStudent();
  }, [user]);

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
  console.log(userData[0]);
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
                name={userData[0].name}
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
              <Leaderbord
                name="you"
                number={78}
                name1="Shree Ram"
                name2="Harsh Jani"
                name3="rudra joshi"
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <a
          href="schoolleaderbord"
          style={{ textDecoration: "underline", color: "blue" }}
        >
          school leaderbord
        </a>
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
