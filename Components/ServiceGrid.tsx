import SectionHeader from "./SectionHeader";
import ServiceItem from "./ServiceItem";

interface Service {
  icon: string;
  title: string;
  description: string;
}

export default function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <section className="section-padding px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          subtitle="What We Do"
          title="Our Services"
          description="From software to infrastructure — we deliver end-to-end technology solutions that drive real business results."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, idx) => (
            <ServiceItem
              key={idx}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
