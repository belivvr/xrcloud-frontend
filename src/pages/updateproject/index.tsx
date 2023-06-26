import React, { ReactElement, useEffect, useState } from 'react'
import Page from 'ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import ProjectPage from 'custom/updateproject'
import Layout from 'layout'
import { useRouter } from 'next/router'
import { useRequest } from 'hooks/useRequest'
import { Project } from 'types/project'
import Loading from 'custom/common/Loading'

const UpdateProject = () => {
    const [project, setProject] = useState<Project>()

    const router = useRouter()
    const { get } = useRequest()
    const accessToken = localStorage.getItem('accessToken')

    useEffect(() => {
        const projectId = router.query.id
        if (projectId) {
            get<Project>(`api/projects/findById`, {
                params: {
                    projectId
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then((res) => {
                    setProject(res)
                })
                .catch((e) => {})
        }
    }, [router])

    if (!project) {
        return <Loading title="Project" />
    }

    return (
        <Page title="Project">
            <MainCard title="Project">
                <ProjectPage project={project} />
            </MainCard>
        </Page>
    )
}

UpdateProject.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default UpdateProject
