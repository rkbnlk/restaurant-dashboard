import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchRestaurants, fetchTrends } from "./api";
import RestaurantCard from "./components/RestaurantCard";
import TrendsChart from "./components/TrendsChart";
import TopRestaurants from "./components/TopRestaurants";

interface Restaurant {
  id: number;
  name: string;
  location: string;
  cuisine: string;
}

interface Trend {
  date: string;
  count: number;
  revenue: number;
  avg_order_value: number;
  peak_hour: string;
}

interface TrendApiResponse {
  [date: string]: {
    count: number;
    revenue: number;
    avg_order_value: number;
    peak_hour: string;
  };
}

const App: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );
  const [selected, setSelected] = useState<Restaurant | null>(null);
  const [trends, setTrends] = useState<Trend[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"name" | "cuisine" | "location">(
    "name"
  );

  // --- Date range filter ---
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    fetchRestaurants().then((res) => {
      setRestaurants(res.data);
      setFilteredRestaurants(res.data);
    });
  }, []);

  useEffect(() => {
    const filtered: Restaurant[] = restaurants.filter(
      (r) =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (a[sortField] < b[sortField]) return -1;
      if (a[sortField] > b[sortField]) return 1;
      return 0;
    });

    setFilteredRestaurants(filtered);
  }, [searchTerm, sortField, restaurants]);

  useEffect(() => {
    if (!selected) return;

    const start = startDate ? startDate.toLocaleDateString("en-CA") : undefined;
    const end = endDate ? endDate.toLocaleDateString("en-CA") : undefined;

    fetchTrends(selected.id, start, end).then(
      (res: { data: TrendApiResponse }) => {
        const chartData: Trend[] = Object.entries(res.data)
          .map(([date, value]) => ({
            date,
            count: value.count,
            revenue: value.revenue,
            avg_order_value: value.avg_order_value,
            peak_hour: value.peak_hour || "-",
          }))
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          ); // <-- SORT BY DATE

        setTrends(chartData);
      }
    );
  }, [selected, startDate, endDate]);

  const clearDateFilter = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-5 text-center">
        Restaurant Lists & Order Trends
      </h1>

      {/* --- Filters --- */}
      <div className="flex flex-col md:flex-row gap-3 mb-5 justify-center items-center">
        
        <input
          type="text"
          placeholder="Search by name, location, cuisine..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/3"
        />

        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value as any)}
          className="border p-2 rounded-md w-full md:w-1/4"
        >
          <option value="name">Sort by Name</option>
          <option value="cuisine">Sort by Cuisine</option>
          <option value="location">Sort by Location</option>
        </select>
      </div>

      {/* --- Restaurant List --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
        {filteredRestaurants.map((r) => (
          <RestaurantCard
            key={r.id}
            {...r}
            onClick={() => setSelected(r)}
            isSelected={selected?.id === r.id}
          />
        ))}
      </div>

      {/* --- Selected Restaurant Trends --- */}
      {selected && (
        <div className="bg-white p-5 rounded-xl shadow-lg mb-5">
          {/* Title + Filter Row */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold">{selected.name} - Trends</h2>

            {/* --- Date Range Picker for Trends --- */}
            <div className="flex gap-3 items-center">
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) =>
                  setStartDate(date ?? undefined)
                }
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start Date"
                className="border p-2 rounded-md"
                dateFormat="yyyy-MM-dd"
              />
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date ?? undefined)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="End Date"
                className="border p-2 rounded-md"
                dateFormat="yyyy-MM-dd"
              />
              <button
                onClick={clearDateFilter}
                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
              >
                Clear Dates
              </button>
            </div>
          </div>

          <TrendsChart data={trends} />
        </div>
      )}

      <TopRestaurants />
    </div>
  );
};

export default App;
