import PartnerGrid from "@/Components/PartnerGrid";
import { defaultPartners } from "@/constants";
import { fetchPartners } from "@/lib/fetch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners — Apex Solution",
  description: "Meet the trusted partners and collaborators who help Apex Solution deliver world-class IT and technology solutions.",
};

export default async function Partners() {
  const fetched = await fetchPartners();
  const partners = fetched ? defaultPartners.concat(fetched) : defaultPartners;
  return <div><PartnerGrid partners={partners} screen="Partner" /></div>;
}
