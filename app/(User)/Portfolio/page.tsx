import PortfolioPageClient from "@/Components/PortfolioPageClient";
import { defaultPortfolios } from "@/constants";
import { fetchPortfolios } from "@/lib/fetch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Apex Solution",
  description: "Browse Apex Solution's portfolio of completed projects including websites, hotel systems, CCTV installations, and network infrastructure.",
};

export default async function Portfolio() {
  const fetched = await fetchPortfolios();
  const portfolios = fetched ? defaultPortfolios.concat(fetched) : defaultPortfolios;
  return <PortfolioPageClient portfolios={portfolios} />;
}
