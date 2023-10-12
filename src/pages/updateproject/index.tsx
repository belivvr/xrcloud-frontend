import React, { ReactElement, useEffect, useState } from 'react'
import Page from 'ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import { UpdateProjectForm } from 'components/custom/updateproject/UpdateProjectForm'
import Layout from 'layout'
import { useRouter } from 'next/router'
import { useProject } from 'hooks/api/useProject'
import { Project } from 'types/project'
import { Loading } from 'components/custom/common'

const UpdateProject = () => {
    const [project, setProject] = useState<Project>()

    const router = useRouter()
    const { findById, updateProject, deleteProject } = useProject()

    useEffect(() => {
        const projectId = router.query.id
        if (typeof projectId === 'string') {
            findById(projectId).then((res) => setProject(res))
        }
    }, [router])

    if (!project) {
        return <Loading title="Project" />
    }

    return (
        <Page title="Project">
            <MainCard title="Project">
                <UpdateProjectForm project={project} updateProject={updateProject} deleteProject={deleteProject} />
            </MainCard>
        </Page>
    )
}

UpdateProject.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default UpdateProject
