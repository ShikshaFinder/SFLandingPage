import React, { useEffect, useState } from "react";
// import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

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
import Leaderbord from "../components/Leaderbord";
import { useAuthContext } from "@/context";
import Layout from "./Layout";
import { useUser } from "../store";
import Schoolleaderbord from "@/components/schoolleaderbord";
import Nouser from "@/components/Nouser";
import Profilee from "../components/profile";

function Profile() {
  const { user } = useAuthContext();
  const useUse = useUser((state) => state.user);
  const CustomTab = React.forwardRef<HTMLElement, any>((props, ref) => {
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

  if (!user.email) {
    return <Nouser />;
  }
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
                name={useUse.name}
                email={useUse.email}
                board={useUse.Board}
                medium={useUse.medium}
                standard={useUse.Standard}
                city={useUse.city}
                state={useUse.State}
                coins={useUse.Coins}
              />
            </TabPanel>
            <TabPanel>
              <Schoolleaderbord />
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
