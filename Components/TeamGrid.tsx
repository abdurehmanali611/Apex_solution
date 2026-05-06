import SectionHeader from "./SectionHeader";
import TeamItem from "./TeamItem";

interface Team {
  image: string;
  name: string;
  position: string;
  title: string;
  description: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  telegram: string;
  portfolio?: string;
  objectPosition?: string;
}

export default function TeamGrid({ teams }: { teams: Team[] }) {
  return (
    <section className="section-padding px-4 sm:px-6 bg-[#0D0D0D]">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          subtitle="Our Team"
          title="The Experts Behind Our Success"
          description="Meet the founders and leaders who make Apex Solution's vision a reality every day."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team, idx) => (
            <TeamItem
              key={idx}
              {...team}
              objectPosition={
                team.name === "Tedros Milion" ? "center 20%" : "center"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
