import { Vehicle } from "@prisma/client";
import React, { useState } from "react";

type VehicleCardProps = {
  vehicle: Vehicle;
};

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border p-4 rounded-lg shadow-md mb-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
      <h2 className="text-lg font-bold">
        {vehicle.make} {vehicle.model} ({vehicle.year})
      </h2>
      <p className="text-gray-700">
        <strong>Price:</strong> £{vehicle.price}
      </p>

      {/* Show additional details only if the card is expanded */}
      {isExpanded && (
        <div className="mt-2">
          <p><strong>Fuel Type:</strong> {vehicle.fuel_type}</p>
          <p><strong>Mileage:</strong> {vehicle.mileage} miles</p>
          <p><strong>Transmission:</strong> {vehicle.transmission}</p>
        </div>
      )}
    </div>
  );
};

export default VehicleCard;
