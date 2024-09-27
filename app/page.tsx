"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import List from "./components/itemList";
import { Vehicle } from "@prisma/client";


export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [vehicleId, setVehicleId] = useState<number | "">("");
  
  

  // fetch request to get all vehcicles
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
  
  useEffect(() => {
    getAllVehicles();
  }, []);
  

  const getVehicleById = async (id: number) => {
	setVehicles([]);
	setLoading(true);
    try {
      const response = await fetch(`/api/vehicles/${id}`);
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

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>List of vehicles below</h1>
        <button onClick={getAllVehicles}>All vehicles</button>
        {vehicles.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <List items={vehicles}/>
        )}
      </main>
    </div>
  );
}
