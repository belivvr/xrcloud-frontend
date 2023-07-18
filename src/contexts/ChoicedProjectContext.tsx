import React, { createContext, useState } from 'react'
import { ProjectContextType } from 'types/auth'
import { Project } from 'types/project'

const ChoicedProjectContext = createContext<ProjectContextType | null>(null)

export function ProjectChoicedProjectProvider({ children }: { children: React.ReactElement }) {
    const [choicedProject, setChoicedProject] = useState<Project>()
    const [choicedScene, setChoicedScene] = useState<string>()

    return (
        <ChoicedProjectContext.Provider value={{ choicedProject, choicedScene, setChoicedProject, setChoicedScene }}>
            {children}
        </ChoicedProjectContext.Provider>
    )
}

export default ChoicedProjectContext
