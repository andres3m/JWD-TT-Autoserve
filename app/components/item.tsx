import React, { useState } from "react";
import { Vehicle } from "@prisma/client";

type Props = {
    data: Vehicle;
}

const VehicleItem = ({ data }: Props) => {
    const [showDetails, setShowDetails] = useState(false);

    const handleToggle = () => {
        setShowDetails((prevState) => !prevState);
    };

    return (
        <div className="mb-2 ml-2 max-w-xs bg-yellow-400" onClick={handleToggle} style={{ cursor: 'pointer' }}>
            <h2 className="info">{data.make} {data.model}</h2>
            <h3 className="info">{data.year}</h3>
            <h3 className="info">£{data.price}</h3>

            {showDetails && (
                <>
                    <h3 className="info">{data.fuel_type}</h3>
                    <h3 className="info">{data.transmission}</h3>
                    <h3 className="info">{data.mileage} miles</h3>
                </>
            )}
        </div>
    );
};

export default VehicleItem;
