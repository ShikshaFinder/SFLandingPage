import React from "react";
import Leaderbord from "./Leaderbord";

import { Box, Heading, Text } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

interface LeaderboardEntry {
  schoolname: string;
  views: number;
  name1: string;
  name2: string;
  name3: string;
}

function Schoolleaderbord() {
  //   const { user } = useAuthContext();

  //   const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
  //     []
  //   );
  // /////change///
  //   const fetchLeaderboardData = async () => {
  //     const { data, error } = await supabase
  //       .from("votes")
  //       .select("view , rating, user_id")
  //       .order("view", { ascending: false }) //here i can sort with help of vote also
  //       .limit(10);
  //     // .eq("District", user?.Board)
  //     //percentage * rating

  //     if (error) {
  //       console.error("Error fetching leaderboard data:", error);
  //     } else {
  //       setLeaderboardData(data as never[]);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchLeaderboardData();
  //   }, [user]);

  return (
    <>
      <Text fontSize="3xl" display={"flex"} justifyContent={"center"}>
        Leaderbord
      </Text>
      <br />{" "}
      <Box textAlign="center" py={10} px={6}>
        <InfoIcon boxSize={"50px"} color={"blue.500"} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Leaderboard will be available soon. Please visit again after some time
        </Heading>
        <Text color={"gray.800"}>
          We are excited to showcase which students and educational institutes
          are performing great in your district. Once we receive sufficient
          applicants, we will showcase them here!
        </Text>
      </Box>
      {/* {/* //   {leaderboardData.map((entry, index) => (
        <Leaderbord
          key={index}
          name={entry.schoolname}
          number={entry.views}
          position={index + 1}
        /> */}
    </>
  );
}

export default Schoolleaderbord;

