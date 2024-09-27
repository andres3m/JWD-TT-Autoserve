import React, { useState } from "react";
import { Vehicle } from "@prisma/client";
import Image from "next/image";

interface SearchBarProps {
  getAllVehicles: () => Promise<void>;
  getVehicleById: (id: number) => Promise<void>;
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  getAllVehicles,
  getVehicleById,
  setVehicles,
}) => {
  const [searchParams, setSearchParams] = useState({
    id: "",
    make: "",
    model: "",
    year: "",
    fuel_type: "",
    transmission: "",
  });

  // Update state when the user types in the input fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handles the search operation by filtering through vehicles
  const handleSearch = async () => {
    const { id, make, model, year, fuel_type, transmission } = searchParams;

      //Perform a general search/filter
      const response = await fetch("/api/vehicles");
      if (response.ok) {
        const data: Vehicle[] = await response.json();
        const filteredVehicles = data.filter((vehicle) => {
          return (
            (id ? vehicle.id === parseInt(id) : true) &&
            (make
              ? vehicle.make.toLowerCase().includes(make.toLowerCase())
              : true) &&
            (model
              ? vehicle.model.toLowerCase().includes(model.toLowerCase())
              : true) &&
            (year ? vehicle.year === parseInt(year) : true) &&
            (fuel_type
              ? vehicle.fuel_type.toLowerCase() === fuel_type.toLowerCase()
              : true) &&
            (transmission
              ? vehicle.transmission.toLowerCase() ===
                transmission.toLowerCase()
              : true)
          );
        });
        setVehicles(filteredVehicles);
      }
    
  };

  const handleReset = async () => {
    setSearchParams({
      id: "",
      make: "",
      model: "",
      year: "",
      fuel_type: "",
      transmission: "",
    });
    await getAllVehicles();
  };

  return (
    <div className="container">
      <div className="sticky flex flex-row justify-end gap-8">
        <div>
          <input
            type="text"
            name="id"
            value={searchParams.id}
            placeholder="Vehicle ID"
            onChange={handleChange}
            className=""
          />
          <input
            type="text"
            name="make"
            value={searchParams.make}
            placeholder="Make"
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="model"
            value={searchParams.model}
            placeholder="Model"
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="year"
            value={searchParams.year}
            placeholder="Year"
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="fuel_type"
            value={searchParams.fuel_type}
            placeholder="Fuel Type"
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="transmission"
            value={searchParams.transmission}
            placeholder="Transmission"
            onChange={handleChange}
            className="input-field"
          />          
        </div>
        <Image
          src="/autoserve-logo.png"
          alt="Autoserve logo"
          width={192}
          height={32.5}
          priority
        />
      </div>
      <button onClick={handleSearch} className="btn-search">
        Search
      </button>
      <br />
      <button onClick={handleReset} className="btn-reset">
        Reset
      </button>
    </div>
  );
};

export default SearchBar;
