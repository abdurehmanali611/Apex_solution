import ProjectGrid from "@/Components/ProjectGrid";
import { project } from "@/constants";

export default function Projects() {
    return (
        <div>
            <ProjectGrid projects={project} screen="Project"/>
        </div>
    )
}