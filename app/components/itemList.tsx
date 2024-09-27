import * as React from "react";
import VehicleItem from "./item";
import { Vehicle } from "@prisma/client";

type Props = {
    items: Vehicle[];
};


const List = ({ items }: Props) => (
    <div className="grid grid-cols-2 max-w-2xl text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] mx-auto">
        {items.map((item, index) => (           
            <div key={item.id || index}>
                <VehicleItem data={item}/>                
            </div> 
        ))}
    </div>
)



export default List;