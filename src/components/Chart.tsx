import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Box } from "@chakra-ui/react";
type ChartProps = {
  quality: number;
};


export default function Chart({quality, management, facilities, extra}:{quality: number, management: number, facilities: number, extra: number}) {
  
const data = [
  {
    name: "Quality of Education",
    uv: quality,
    amt: 2400,
  },
  {
    name: "Management",
    uv: management,
    amt: 2210,
  },
  {
    name: "Facilities Available",
    uv: facilities,
    amt: 2290,
  },
  {
    name: "Extra Curricular Activities",
    uv: extra,
    amt: 2000,
  },
];


    // console.log("chart");
  return (
    <Box width={["100%", "75%", "100%", "25%"]}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Bar
          dataKey="uv"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </Box>
  );
}
