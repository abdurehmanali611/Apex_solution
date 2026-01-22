import PortfolioGrid from "@/Components/PortfolioGrid";
import { Portfolios } from "@/constants";

export default function Portfolio() {
    return (
        <div>
            <PortfolioGrid portfolios={Portfolios}/>
        </div>
    )
}