import { useEffect, useState } from "react";
import SchoolItem from "../components/SchoolItem";
import { Grid } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import Head from "next/head";

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

export interface SchoolData {
    data: School[];
}

const Home: React.FC = () => {
    const [schools, setSchools] = useState<School[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
    const [selectedDistrict, setSelectedDistrict] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    "https://blobimageshikshafinder.blob.core.windows.net/shikshafinder/data_final.json"
                );
                const data = await res.json();
                console.log(res, data)
                setSchools(data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedDistrict) {
            const filteredData = schools.filter(
                (school) => school.district === selectedDistrict
            );
            setFilteredSchools(filteredData);
        } else {
            setFilteredSchools(schools);
        }
    }, [selectedDistrict, schools]);

    if (loading) {
        return (
          <iframe src="https://lottie.host/embed/a75b9516-581b-439a-89b5-aab82118aa06/FCreFd8jZ9.json"></iframe>
        );
    }


    return (
      <>
        {" "}
        <NextSeo
          title="School details of gujrat , schools in my district ,district wise school list"
          description="Schools list with address, ward, district, board, type, medium, location"
          openGraph={{
            url: "/icon-192x192.png",
            title: "Let's promote Quality of Education",
            description: "Choose right educational platform for your child",
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
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <div>
          <h1>Schools List</h1>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            {Array.from(new Set(schools.map((school) => school.district))).map(
              (district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              )
            )}
          </select>
        </div>
        {filteredSchools.map((school) => (
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={1}
          >
            <SchoolItem key={school.diseCode} school={school} />
          </Grid>
        ))}
      </>
    );
};

export default Home;
