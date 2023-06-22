import React from 'react'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { openDrawer } from 'store/slices/menu'
import { ProjectListStyle } from 'custom/styles/styled'
import { selectProjectList } from 'store/slices/project'
import { useRouter } from 'next/router'

interface ProjectName {
    id: number
    name: string
}

const ProjectList = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const projectList = useSelector(selectProjectList)
    const handleClick = () => {
        dispatch(openDrawer(true))
        router.push(`/addproject`)
    }

    const handleProjectClick = (projectId: number | string) => {
        router.push(`/updateproject?id=${projectId}`)
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClick}>
                프로젝트 추가
            </Button>
            {projectList.map((project: ProjectName) => (
                //handleProjectClick 에 id 값 추가해야해..
                <ProjectListStyle key={project.id} onClick={() => handleProjectClick(project.id)}>
                    {project.name}
                </ProjectListStyle>
            ))}
        </div>
    )
}

export default ProjectList
