import React, { createContext, useState } from 'react'
import { ProjectContextType } from 'types/auth'
import { Project } from 'types/project'

const Context = createContext<ProjectContextType | null>(null)

export function ChoicedProjectProvider({ children }: { children: React.ReactElement }) {
    const [choicedProject, setChoicedProject] = useState<Project>()
    const [choicedScene, setChoicedScene] = useState<string>()

    return <Context.Provider value={{ choicedProject, choicedScene, setChoicedProject, setChoicedScene }}>{children}</Context.Provider>
}

export default Context
