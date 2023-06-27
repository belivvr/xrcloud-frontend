import React, { createContext, useState } from 'react'
import { ProjectContextType } from 'types/auth'
import { Project } from 'types/project'

const ProjectChoicedProjectContext = createContext<ProjectContextType | null>(null)

export function ProjectChoicedProjectProvider({ children }: { children: React.ReactElement }) {
    const [choicedProject, setChoicedProject] = useState<Project>()

    return (
        <ProjectChoicedProjectContext.Provider value={{ choicedProject, setChoicedProject }}>
            {children}
        </ProjectChoicedProjectContext.Provider>
    )
}

export default ProjectChoicedProjectContext
