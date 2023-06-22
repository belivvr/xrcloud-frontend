import React, { useContext, useState } from 'react'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { openDrawer } from 'store/slices/menu'
import { ProjectListStyle } from 'custom/styles/styled'
import { ProjectContext } from 'custom/ProjectContext'

interface ProjectProps {
    isProject: boolean
    setIsProject: React.Dispatch<React.SetStateAction<boolean>>
}

const ProjectManages = ({ isProject, setIsProject }: ProjectProps) => {
    const dispatch = useDispatch()
    // const [projectList, setProjectList] = useState<Array<{ id: number; name: string }>>([])
    const { projectList, setProjectList } = useContext(ProjectContext)
    const handleClick = () => {
        dispatch(openDrawer(true))
        setIsProject(true)
        const newProject = { id: projectList.length + 1, name: `프로젝트 ${projectList.length + 1}` }
        setProjectList([...projectList, newProject])
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClick}>
                프로젝트 추가
            </Button>
            {projectList.map((project) => (
                <ProjectListStyle key={project.id}>{project.name}</ProjectListStyle>
            ))}
        </div>
    )
}

export default ProjectManages
