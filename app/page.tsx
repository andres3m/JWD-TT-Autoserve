"use client";
import React, { useState, useEffect } from "react";
import { Vehicle } from "@prisma/client";
import VehicleCard from "./components/VehicleCard";
import { ThreeDots } from "react-loader-spinner";
import Image from "next/image";

export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // State for multi-attribute search
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [year, setYear] = useState<number | "">("");
  const [fuelType, setFuelType] = useState<string>("");
  const [transmission, setTransmission] = useState<string>("");
  const [mileage, setMileage] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [searchById, setSearchById] = useState<string>("");

  // Fetch all vehicles
  const getAllVehicles = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/vehicles");
      if (response.ok) {
        const data: Vehicle[] = await response.json();
        setVehicles(data);
      } else {
        console.error("Failed to fetch vehicles:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a vehicle by ID
  const getVehicleById = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/vehicles/${id}`);
      if (response.ok) {
        const data: Vehicle = await response.json();
        setVehicles([data]);
      } else {
        console.error("Failed to fetch vehicle:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while fetching vehicle:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearInputs = () => {
    setMake("");
    setModel("");
    setYear("");
    setFuelType("");
    setTransmission("");
    setMileage("");
    setPrice("");
    setSearchById("");
    // Get all vehicles with all filters cleared
    getAllVehicles();
  };


  // Handle Search by ID
  const handleSearchById = () => {
    const id = parseInt(searchById, 10);
    setVehicles([]);
    if (typeof id === 'number' && id > 0 && Number.isInteger(id)) {
      setLoading(true);
      getVehicleById(id);
    } else {
      alert("Please enter a valid vehicle ID.");
      clearInputs();
    }
    setLoading(false);
  };

  // Filter vehicles based on multiple attributes
  const filterVehicles = async () => {
    setLoading(true);

    // Fetch all vehicles and store them in a temporary variable for filtering
    let allVehicles: Vehicle[] = [];
    try {
      const response = await fetch("/api/vehicles");
      if (response.ok) {
        allVehicles = await response.json();
      } else {
        console.error("Failed to fetch vehicles:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while fetching vehicles:", error);
    }

    // Apply filters based on attributes
    let filtered = allVehicles;

    if (make)
      filtered = filtered.filter((vehicle) =>
        vehicle.make.toLowerCase().includes(make.toLowerCase())
      );
    if (model)
      filtered = filtered.filter((vehicle) =>
        vehicle.model.toLowerCase().includes(model.toLowerCase())
      );
    if (fuelType)
      filtered = filtered.filter((vehicle) =>
        vehicle.fuel_type.toLowerCase().includes(fuelType.toLowerCase())
      );
    if (transmission)
      filtered = filtered.filter((vehicle) =>
        vehicle.transmission.toLowerCase().includes(transmission.toLowerCase())
      );
    if (mileage)
      filtered = filtered.filter((vehicle) => vehicle.mileage <= mileage);
    if (price) filtered = filtered.filter((vehicle) => vehicle.price <= price);
    if (year) filtered = filtered.filter((vehicle) => vehicle.year === year);

    // Set the filtered vehicles
    setVehicles(filtered);
    setLoading(false);
  };

  // Get all vehicles on page load
  useEffect(() => {
    getAllVehicles();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col-reverse sm:flex-row justify-between pb-4">
        <h1 className="place-self-center text-2xl font-bold">
          Vehicle Inventory
        </h1>
        <Image
          className="place-self-center pb-2 justify-end sm:pb-0"
          src="/autoserve-logo.png"
          alt="Autoserve logo"
          width={192}
          height={32.5}
          priority
        />
      </div>
      
      {/* Search by ID */}
      <div className="flex flex-row justify-center pb-2">
        <input
          type="number"
          value={searchById}
          onChange={(e) => setSearchById(e.target.value)}
          className="font-medium border rounded p-2 mb-2 w-28 h-10"
          placeholder="Vehicle ID"
        />

        <button
          onClick={handleSearchById}
          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded ml-2 h-10"
        >
          Search by ID
        </button>
      </div>

      {/* Search by Attributes */}
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div>
          <input
            type="text"
            value={make}
            maxLength={20}
            onChange={(e) => setMake(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Make: Toyota, Ford..."            
          />
        </div>
        <div>
          <input
            type="text"
            value={model}
            maxLength={20}
            onChange={(e) => setModel(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Model: Corolla, Mondeo..."
          />
        </div>
        <div>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.valueAsNumber)}
            min={2000}            
            step={1}
            className="border p-2 rounded w-full"
            placeholder="Year"
          />
        </div>
        <div>
          <input
            type="text"
            value={fuelType}
            maxLength={15}
            onChange={(e) => setFuelType(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Fuel Type: Petrol, Diesel..."
          />
        </div>
        <div>
          <input
            type="text"
            value={transmission}
            maxLength={15}
            onChange={(e) => setTransmission(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Transmission: Manual, Automatic"
          />
        </div>
        <div>
          <input
            type="number"
            value={mileage}
            onChange={(e) => setMileage(e.target.valueAsNumber)}
            min={0}
            step={5000}
            className="border p-2 rounded w-full"
            placeholder="Maximum Mileage"
          />
        </div>
        <div>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.valueAsNumber)}
            min={0}
            step={5000}
            className="border p-2 rounded w-full"
            placeholder="Maximum Price"
          />
      </div>

        <button
          className="flex place-self-center justify-center bg-green-500 text-white font-semibold px-4 py-2 rounded w-full"
          type="submit"
          onClick={filterVehicles}
        >
          Search
        </button>

        <button
          className="flex place-self-center justify-center bg-amber-400 text-white font-semibold px-4 py-2 rounded w-full"
          type="reset"
          onClick={clearInputs}
        >
          Clear All Filters
        </button>
      </div>

      {/* Display Vehicles */}
      {loading ? (
        <div className="flex justify-center">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#8d97b1"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="flex justify-center">
          {vehicles.length === 0 ? (
            <p className="mt-4">No vehicles found.</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-2 w-full">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
