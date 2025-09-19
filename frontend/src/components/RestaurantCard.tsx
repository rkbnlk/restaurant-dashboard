import React from "react";

interface Props {
  id: number;
  name: string;
  location: string;
  cuisine: string;
  onClick?: () => void;
  isSelected?: boolean;
}

const RestaurantCard: React.FC<Props> = ({ name, location, cuisine, onClick, isSelected = false }) => {
  return (
    <div
      className={`p-4 rounded-xl shadow-md cursor-pointer transition-all duration-300
        ${isSelected 
          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl scale-105" 
          : "bg-white text-gray-800 hover:shadow-lg"
        }
      `}
      onClick={onClick}
    >
      <h2 className="text-lg font-bold mb-1">{name}</h2>
      <p className="text-sm text-gray-500">{cuisine} · {location}</p>
    </div>
  );
};

export default RestaurantCard;
