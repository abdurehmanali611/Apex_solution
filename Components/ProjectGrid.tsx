import Image from "next/image";
import ProjectItem from "./ProjectItem";
import SectionHeader from "./SectionHeader";
import Marquee from "react-fast-marquee";
import { Button } from "./ui/button";

interface Project {
  image: string;
  title: string;
  current: boolean;
  description: string;
}

interface ProjectProp {
  projects: Project[];
  screen: "Home" | "Project";
}

export default function ProjectGrid({ projects, screen }: ProjectProp) {
  const filteredContents = projects.filter((project) => {
    if (screen === "Project") {
      return project.current;
    }
    return;
  });
  return (
    <section className="w-full py-20">
      <div className="container mx-auto px-4 flex flex-col gap-12">
        <div className="text-center md:text-left">
          <SectionHeader subtitle="Projects" title="Now, We're Working on..." />
        </div>

        {projects && projects.length > 0 && (
          <div className="relative bg-linear-to-b from-transparent to-gray-50/50">
            <Marquee
              gradient={true}
              gradientColor="white"
              gradientWidth={100}
              speed={35}
              pauseOnHover={true}
              className="py-4"
            >
              {projects.map((project: Project, idx: number) => (
                <ProjectItem
                  key={idx}
                  image={project.image}
                  title={project.title}
                />
              ))}
            </Marquee>
          </div>
        )}
        {filteredContents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {filteredContents.map((project: Project, idx: number) => (
              <div
                key={idx}
                className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="mb-4 text-xl font-semibold text-amber-500 text-center md:text-left">
                  {project.title}
                </h3>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={180}
                    height={180}
                    loading="eager"
                    className="rounded-xl object-cover ring-1 ring-gray-200 group-hover:ring-amber-400 transition"
                  />

                  <p className="text-gray-600 text-sm leading-relaxed text-center sm:text-left">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 flex justify-center sm:justify-end">
                  <Button className="rounded-full px-6 py-2 text-sm font-medium bg-amber-500 hover:bg-amber-600 transition">
                    Download Latest Version
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
