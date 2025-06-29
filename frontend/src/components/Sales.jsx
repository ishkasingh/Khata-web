import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { PieChart, Pie, Cell, Legend } from "recharts";

const data = [
  { month: "Jan", value: 0 },
  { month: "Feb", value: 15000 },
  { month: "Mar", value: 18000 },
  { month: "Apr", value: 22000 },
  { month: "May", value: 15000 },
  { month: "Jun", value: 30000 },
];

const pieData = [
  { name: "Product 1", value: 20 },
  { name: "Product 2", value: 3 },
  { name: "Product 3", value: 6 },
  { name: "Product 4", value: 29 },
  { name: "Product 5", value: 42 },
];

const COLORS = ["#3366CC", "#3399FF", "#66CC99", "#99CC33", "#00CCCC"];

const Sales = () => {
  return (
    <div className="flex justify-center items-center  fixed top-15 h-screen w-full overflow-hidden">
      {/* Line Chart Left */}
      <div style={{ width: "50%", height: 550 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#00aaff"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart Right */}
      <div className="w-[50%] h-[550px] flex justify-center items-center">
        <ResponsiveContainer width="80%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={90} // ⬅️ increased from 70
              outerRadius={130} // ⬅️ increased from 100
              fill="#8884d8"
              dataKey="value"
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Sales;
