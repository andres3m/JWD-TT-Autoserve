"use client";
import React from "react";
import { useEffect, useState } from "react";
import List from "./components/itemList";
import { Vehicle } from "@prisma/client";
import SearchBar from "./components/searchBar";


export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // fetch request to get all vehicles
  const getAllVehicles = async () => {
    setVehicles([]);
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

  // fetch request to get a vehicle by ID
  const getVehicleById = async (id: number) => {
    setVehicles([]);
    setLoading(true);
    try {
      const response = await fetch(`/api/vehicles/${id}`);
      if (response.ok) {
        const data: Vehicle = await response.json();
        setVehicles([data]); // Make sure to pass an array with a single vehicle
      } else {
        console.error("Failed to fetch vehicle:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while fetching vehicle:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllVehicles();
  }, []);

  return (    
	<div className="mx-auto p-4 top-3">
      <SearchBar getAllVehicles={getAllVehicles} getVehicleById={getVehicleById} setVehicles={setVehicles} />
    
      <h1>List of vehicles below</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <List items={vehicles} />
      )}
    </div>
  );
}
