import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Button,
  Box,
  useTab,
  useMultiStyleConfig,
} from "@chakra-ui/react";
// import Leaderbord from "../components/Leaderbord";
import { useAuthContext } from "@/context";
import Layout from "./Layout";
import { useUser } from "../store";
import Schoolleaderbord from "@/components/schoolleaderbord";
import Nouser from "@/components/Nouser";
import Profilee from "../components/profile";
import { useRouter } from "next/router";

function Profile() {
  const { user } = useAuthContext();
  const useUse = useUser((state) => state.user);
  const router = useRouter();
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
            <CustomTab>Leaderboard</CustomTab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {" "}
              <Profilee
                name={useUse?.name || "Your Name"}
                email={useUse?.email || "email@gmail.com"}
                board={useUse?.Board || "Your Board"}
                medium={useUse?.medium || "medium"}
                standard={useUse?.Standard || "standard"}
                city={useUse?.city || "city"}
                state={useUse?.State || "state"}
                coins={useUse?.Coins || 30}
              />
            </TabPanel>
            <TabPanel>
              <Schoolleaderbord />
            </TabPanel>
          </TabPanels>
        </Tabs>
        {/* <a
          href="schoolleaderbord"
          style={{ textDecoration: "underline", color: "blue" }}
        >
          school leaderbord
        </a> */}
      </Layout>
    </>
  );
}

export default Profile;
