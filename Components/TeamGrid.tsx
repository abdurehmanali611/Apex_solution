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
  telegram: string
}

interface TeamProp {
  teams: Team[];
}
export default function TeamGrid({ teams }: TeamProp) {
  return (
    <div className="w-full py-12">
      <div className="px-4 py-5 flex flex-col gap-5">
        <SectionHeader subtitle="Teams" title="The Experts behind our Success" />
        <div className="flex flex-col sm:flex-row items-center gap-10 justify-center">
          {teams &&
            teams.length > 0 &&
            teams.map((team: Team, idx: number) => (
              <TeamItem
                key={idx}
                image={team.image}
                name={team.name}
                position={team.position}
                facebook={team.facebook}
                instagram={team.instagram}
                linkedin={team.linkedin}
                telegram={team.telegram}
                title={team.title}
                description={team.description}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
