import React from "react";
import { Vehicle } from "@prisma/client";

type Props = {
    data: Vehicle;
}

const VehicleItem = ({data}: Props) => (
    <div className="item-container">
        <h2 className="item-make-model">{data.make} {data.model}</h2>
        <h3 className="item-info">{data.year}</h3>
        <h3 className="item-info">{data.fuel_type}</h3>
        <h3 className="item-info">{data.transmission}</h3>
        <h3 className="item-info">{data.mileage} miles</h3>
        <h3 className="item-info">{data.price}£</h3>
    </div>
);

export default VehicleItem;

