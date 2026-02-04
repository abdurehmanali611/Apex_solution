import Image from "next/image";
import PartnerItem from "./PartnerItem";
import SectionHeader from "./SectionHeader";
import Marquee from "react-fast-marquee";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface partners {
  image: string;
  title: string;
  description: string;
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
              <Card key={idx} className="dark:bg-slate-950">
                <CardHeader>
                  <CardTitle className="text-xl font-serif font-semibold text-center text-slate-700 dark:text-slate-300">
                    {partner.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={partner.image}
                      alt={partner.title}
                      fill
                      loading="eager"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <p className="font-serif text-lg text-center">
                    {partner.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
