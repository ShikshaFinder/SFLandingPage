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
    p: quality,
  },
  {
    name: "Management",
    p: management,
  },
  {
    name: "Facilities Available",
    p: facilities,
  },
  {
    name: "Extra Curricular Activities",
    p: extra,
  },
];


  return (
    <Box width={["100%", "75%", "100%", "25%"]}>
      <BarChart
        width={350}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 4" />
        <XAxis
          dataKey="name"
          angle={-20}
          textAnchor="end"
          tick={{ fontSize: 12}}
        />
        <YAxis />
        <Tooltip />
        <Legend />

        <Bar
          dataKey="p"
          fill="#40a2d8"
          activeBar={<Rectangle fill="#008170" stroke="white" />}
        />
      </BarChart>
    </Box>
  );
}

