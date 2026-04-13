import PartnerGrid from "@/Components/PartnerGrid";
import { Partner } from "@/constants";

export default function Partners() {
    return (
        <div>
            <PartnerGrid partners={Partner} screen="Partner"/>
        </div>
    )
}