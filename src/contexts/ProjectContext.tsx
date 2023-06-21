import React, { createContext, useEffect, useState } from 'react'
import { ProjectContextType } from 'types/auth'

const ProjectContext = createContext<ProjectContextType | null>(null)

export function ProjectContextProvider({ children }: { children: React.ReactElement }) {
    const [projects, setProjects] = useState<any[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        /**
         * If projects is empty
         */
        // setProjects([])

        /**
         * If projects is not empty
         */
        setProjects([{ id: 1, contents: "I'm a test" }])
    }, [])

    useEffect(() => {
        if (projects) {
            setLoading(false)
        }
    }, [projects])

    return <ProjectContext.Provider value={{ projects, loading }}>{children}</ProjectContext.Provider>
}

export default ProjectContext
