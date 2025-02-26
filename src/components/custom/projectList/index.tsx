/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { openDrawer } from 'store/slices/menu'
import { ProjectListStyle } from 'components/custom/styles/styled'
import { useRouter } from 'next/router'
import { Project } from 'types/project'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'

interface Props {
    projectList: Project[] | undefined
}

const ProjectList = ({ projectList }: Props) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { locale } = useConfig()
    const localization = useLocalization(locale)

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
                {localization['create-project']}
            </Button>

            {projectList?.map((project: Project) => (
                <ProjectListStyle
                    key={project.id}
                    style={{ textTransform: 'none' }}
                    onClick={() =>
                        setTimeout(() => {
                            handleProjectClick(project.id)
                        }, 150)
                    }
                >
                    <img
                        style={{ width: '50px', height: '50px', objectFit: 'contain', marginRight: '16px' }}
                        src={`${project.faviconUrl}?timestamp=${Date.now()}`}
                        alt={project.faviconUrl}
                    />
                    {project.name}
                </ProjectListStyle>
            ))}
        </div>
    )
}

export default ProjectList
