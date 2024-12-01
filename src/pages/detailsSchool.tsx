import { useEffect, useState } from "react";
import SchoolItem from "../components/SchoolItem";
import { Grid } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import supabase from "../../supabase";
import { state } from "@/components/city";
import { useForm } from "react-hook-form";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";

export interface School {
  schoolName: string;
  diseCode: string;
  address: string;
  ward: string;
  district: string;
  board: string;
  type: string;
  medium: string;
  location: string;
}

export interface State {
  districts: string[];
  state: string;
}

const Home: React.FC = () => {
  const { register, watch } = useForm();

  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [states, setStates] = useState<State[]>(state.states);

  const selectedState = watch("State");
  const selectedDistrict = watch("District");

  // Get districts for the selected state
  const districts =
    states.find((stateObj) => stateObj.state === selectedState)?.districts ||
    [];

  // Fetch schools from Supabase
  const getSchools = async (district: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("schools")
      .select("*")
      .eq("district", district);

    if (error) {
      console.error("Error fetching schools:", error);
    } else {
      setSchools(data || []);
      setFilteredSchools(data || []);
    }
    setLoading(false);
  };

  // Watch for district selection and fetch schools
  useEffect(() => {
    if (selectedDistrict) {
      getSchools(selectedDistrict);
    }
  }, [selectedDistrict]);

  if (loading) {
    return (
      <iframe
        src="https://lottie.host/embed/a75b9516-581b-439a-89b5-aab82118aa06/FCreFd8jZ9.json"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        title="Loading animation"
      ></iframe>
    );
  }

  return (
    <>
      <NextSeo
        title="School details of Gujarat, schools in my district, district-wise school list"
        description="Schools list with address, ward, district, board, type, medium, location"
        openGraph={{
          url: "/icon-192x192.png",
          title: "Let's promote Quality of Education",
          description: "Choose the right educational platform for your child",
          images: [
            {
              url: "/icon-192x192.png",
              alt: "Shiksha Finder == happy students",
            },
          ],
          site_name: "shikshafinder.com",
          type: "website",
        }}
      />
      <Head>
        <meta
          name="description"
          content="Schools list with address, ward, district, board, type, medium, location"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div>
        <h1>Schools List</h1>
        <FormControl isRequired>
          <FormLabel>State</FormLabel>
          <Select
            {...register("State", { required: true })}
            name="State"
            placeholder="Select State"
          >
            {states.map((stateObj) => (
              <option key={stateObj.state} value={stateObj.state}>
                {stateObj.state}
              </option>
            ))}
          </Select>
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>District/City</FormLabel>
          <Select
            {...register("District", { required: true })}
            name="District"
            placeholder="Select District"
          >
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </Select>
        </FormControl>
      </div>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={4}
        mt={5}
      >
        {filteredSchools.map((school) => (
          <SchoolItem key={school.diseCode} school={school} />
        ))}
      </Grid>
    </>
  );
};

export default Home;
