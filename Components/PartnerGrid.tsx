import Image from "next/image";
import PartnerItem from "./PartnerItem";
import SectionHeader from "./SectionHeader";
import Marquee from "react-fast-marquee";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";

interface partners {
  image: string;
  title: string;
  description: string;
  location: string;
  phone: string[];
}

interface ProjectProp {
  partners: partners[];
  screen: "Home" | "Partner";
}

export default function PartnerGrid({ partners, screen }: ProjectProp) {
  return (
    <section className="w-full py-20">
      <div className="px-4 flex flex-col gap-12">
        <div className="text-center md:text-left">
          <SectionHeader subtitle="Partners" title="Our Partners are..." />
        </div>

        {partners && partners.length > 0 && screen !== "Partner" && (
          <div>
            <Marquee
              gradient={true}
              gradientColor="white"
              gradientWidth={100}
              speed={35}
              pauseOnHover={true}
            >
              {partners.map((partner: partners, idx: number) => (
                <PartnerItem
                  key={idx}
                  image={partner.image}
                  title={partner.title}
                />
              ))}
            </Marquee>
          </div>
        )}
        {screen === "Partner" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {partners.map((partner: partners, idx: number) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-xl font-serif font-semibold text-center">
                    {partner.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex gap-5 items-center">
                  <Image
                    src={partner.image}
                    alt={partner.title}
                    width={200}
                    height={200}
                    loading="eager"
                    className="rounded-xl"
                  />
                  <p className="font-serif text-lg">{partner.description}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <Badge>{partner.location}</Badge>
                    {partner.phone.map((item, index) => (
                      <Link
                        key={index}
                        href={`tel:${item}`}
                        className="underline"
                      >
                        {item}
                      </Link>
                    ))}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
