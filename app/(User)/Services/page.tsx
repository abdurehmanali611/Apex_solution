import ServiceGrid from "@/Components/ServiceGrid";
import { defaultServices } from "@/constants";
import { GetService } from "@/lib/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Apex Solution",
  description:
    "Explore Apex Solution's full range of services: web development, mobile apps, hotel technology, CCTV, networking, and IT consulting.",
};

export default async function Services() {
  const fetched = await GetService().catch(() => null);
  const services = fetched ? defaultServices.concat(fetched) : defaultServices;

  return (
    <div>
      <ServiceGrid services={services} />
    </div>
  );
}
