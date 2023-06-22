import { createContext } from 'react'

export interface Project {
    id: number
    name: string
}

export interface ProjectContextProps {
    projectList: Project[]
    setProjectList: React.Dispatch<React.SetStateAction<Project[]>>
}

export const ProjectContext = createContext<ProjectContextProps>({
    projectList: [],
    setProjectList: () => {}
})
