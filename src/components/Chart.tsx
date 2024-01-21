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

const data = [
  {
    name: "Quality of Education",
    uv: 9,
    amt: 2400,
  },
  {
    name: "Management",
    uv: 10,
    amt: 2210,
  },
  {
    name: "Facilities Available",
    uv: 7,
    amt: 2290,
  },
  {
    name: "Extra Curricular Activities",
    uv: 8,
    amt: 2000,
  }
];

export default function Chart() {
    // console.log("chart");
  return (
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
  );
}
