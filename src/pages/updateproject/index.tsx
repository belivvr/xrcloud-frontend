import React, { ReactElement, useEffect, useState } from 'react'
import Page from 'ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import ProjectPage from 'components/custom/updateproject'
import Layout from 'layout'
import { useRouter } from 'next/router'
import { useProject } from 'hooks/useProject'
import { Project } from 'types/project'
import { Loading } from 'components/custom/common'

const UpdateProject = () => {
    const [project, setProject] = useState<Project>()

    const router = useRouter()
    const { findById, updateProject, deleteProject, getProjectKey } = useProject()

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
                <ProjectPage
                    project={project}
                    setProject={setProject}
                    updateProject={updateProject}
                    deleteProject={deleteProject}
                    getProjectKey={getProjectKey}
                />
            </MainCard>
        </Page>
    )
}

UpdateProject.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default UpdateProject
