import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button, Box, useTab, useMultiStyleConfig } from "@chakra-ui/react"
import Profilee from "../components/profile"
import Leaderbord from "../components/Leaderbord"
import { useAuthContext } from '@/context'
import supabase from '../../supabase'
// import  { Database } from '../../lib/database.types'



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
  //  async function getStudent() {
  //   let { data: Student, error } = await supabase.from("Student").select("*");
  //   console.log(Student.State);
  // }

//     const { user } = useAuthContext() as { user: UserType };
// console.log(user.id);

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

    return (
        <>
            <Tabs>
                <TabList>
                    <CustomTab>Profile</CustomTab>
                    <CustomTab>Leaderbord</CustomTab>
                </TabList>
                <TabPanels>
                    <TabPanel> <Profilee name='harsh' city='bhavnagar' state='Gujrat' email='janiharsh794@gmail.com' coins={39} medium='Gujrati' standard='standard 12' board='CBSE' /></TabPanel>
                    <TabPanel><Leaderbord/></TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

export default Profile
