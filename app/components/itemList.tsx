import * as React from "react";
import VehicleItem from "./item";
import { Vehicle } from "@prisma/client";

type Props = {
    items: Vehicle[];
};

const List = ({ items }: Props) => (
    <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]"> 
        {items.map((item) => (
            <li className="mb-2" key={item.id}>
                <VehicleItem data={item}/>
            </li>
        ))}
    </ol>
)

export default List;