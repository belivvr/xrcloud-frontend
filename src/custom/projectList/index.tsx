import React from 'react'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { openDrawer } from 'store/slices/menu'
import { ProjectListStyle } from 'custom/styles/styled'
import { useRouter } from 'next/router'
import { Project } from 'types/project'
import Image from 'next/image'

interface Props {
    projectList: Project[] | undefined
}

const ProjectList = ({ projectList }: Props) => {
    const dispatch = useDispatch()
    const router = useRouter()
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

            {projectList?.map((project: Project) => (
                <ProjectListStyle key={project.id} onClick={() => handleProjectClick(project.id)}>
                    <Image
                        width={50}
                        height={50}
                        style={{ objectFit: 'contain', marginRight: '16px' }}
                        src={project.faviconUrl}
                        alt={project.faviconUrl}
                    />
                    {project.name}
                </ProjectListStyle>
            ))}
        </div>
    )
}

export default ProjectList
