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
        <div className="container" onClick={handleToggle} style={{ cursor: 'pointer' }}>
            <h2 className="item-make-model">{data.make} {data.model}</h2>
            <h3 className="item-info">{data.year}</h3>
            <h3 className="item-info">£{data.price}</h3>

            {showDetails && (
                <>
                    <h3 className="item-info ">{data.fuel_type}</h3>
                    <h3 className="item-info">{data.transmission}</h3>
                    <h3 className="item-info">{data.mileage} miles</h3>
                </>
            )}
        </div>
    );
};

export default VehicleItem;
