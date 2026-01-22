import ServiceGrid from "@/Components/ServiceGrid";
import { Service } from "@/constants";

export default function Services() {
    return(
        <div>
            <ServiceGrid services={Service}/>
        </div>
    )
}