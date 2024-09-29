import { Vehicle } from "@prisma/client";
import React, { useState } from "react";

type VehicleCardProps = {
  vehicle: Vehicle;
};

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className=" flex flex-col gap-2 content-center border p-2 rounded-lg shadow-md cursor-pointer w-full sm:flex-row" onClick={() => setIsExpanded(!isExpanded)}>
      <p className="font-bold">
        {vehicle.make} {vehicle.model} ({vehicle.year})
      </p>
      <p className="text-gray-700">
        <strong>Price:</strong> £{vehicle.price.toLocaleString()}
      </p>

      {/* Show additional details only if the card is expanded */}
      {isExpanded && (
        <div className="flex flex-col gap-2 sm:flex-row">
          <p><strong>Fuel Type:</strong> {vehicle.fuel_type}</p>
          <p><strong>Mileage:</strong> {vehicle.mileage.toLocaleString()} miles</p>
          <p><strong>Transmission:</strong> {vehicle.transmission}</p>
        </div>
      )}
    </div>
  );
};

export default VehicleCard;
