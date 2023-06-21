import ProjectContext from 'contexts/ProjectContext'
import { useContext } from 'react'

const useProjects = () => {
    const context = useContext(ProjectContext)

    if (!context) throw new Error('context must be use inside provider')

    return context
}

export default useProjects
