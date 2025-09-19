import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    date: string;
    count: number;
    revenue: number;
    avg_order_value: number;
  }[];
}

const TrendsChart: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#4f46e5" name="Orders" />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#14b8a6"
          name="Revenue"
        />
        <Line
          type="monotone"
          dataKey="avg_order_value"
          stroke="#f59e0b"
          name="Avg Order"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TrendsChart;
