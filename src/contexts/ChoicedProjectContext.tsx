import React, { createContext, useEffect, useState } from 'react'
import { ProjectContextType } from 'types/auth'
import { Project } from 'types/project'

const ChoicedProjectContext = createContext<ProjectContextType | null>(null)

export function ProjectChoicedProjectProvider({ children }: { children: React.ReactElement }) {
    const [choicedProject, setChoicedProject] = useState<Project>()

    return <ChoicedProjectContext.Provider value={{ choicedProject, setChoicedProject }}>{children}</ChoicedProjectContext.Provider>
}

export default ChoicedProjectContext
