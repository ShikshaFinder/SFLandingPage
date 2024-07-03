import { useEffect, useState } from "react";
import SchoolItem from "../components/SchoolItem";
import { Grid } from "@chakra-ui/react";

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
        return <div>Loading...</div>;
    }


    return (
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
        <ul>
          {filteredSchools.map((school) => (
            <Grid
              templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
              gap={1}
            >
              <SchoolItem key={school.diseCode} school={school} />
            </Grid>
          ))}
        </ul>
      </div>
    );
};

export default Home;
