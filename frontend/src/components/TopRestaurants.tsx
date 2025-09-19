import React, { useEffect, useState } from "react";
import { fetchTopRestaurants } from "../api";

interface Restaurant {
  id: number;
  name: string;
  location: string;
  cuisine: string;
  revenue: number;
}

const TopRestaurants: React.FC = () => {
  const [top, setTop] = useState<Restaurant[]>([]);

  useEffect(() => {
    fetchTopRestaurants().then(res => setTop(res.data));
  }, []);

  return (
    <div className="bg-white p-5 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-3">Top 3 Restaurants</h2>
      {top.map(r => (
        <div key={r.id} className="flex justify-between mb-2">
          <span>{r.name}</span>
          <span className="font-semibold">${r.revenue}</span>
        </div>
      ))}
    </div>
  );
};

export default TopRestaurants;
