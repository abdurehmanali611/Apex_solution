import SectionHeader from "./SectionHeader";
import ServiceItem from "./ServiceItem";

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface ServiceProps {
  services: Service[];
}

export default function ServiceGrid({ services }: ServiceProps) {
  return (
    <div className="w-full py-5">
      <div className="container mx-auto px-4 py-5 flex flex-col gap-5">
        <SectionHeader
          subtitle="Services"
          title="Our Software and Tech Deliverables"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 items-center">
          {services &&
            services.length > 0 &&
            services.map((service: Service, idx: number) => (
              <ServiceItem
                key={idx}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
