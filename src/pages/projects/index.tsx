import { ReactElement, useEffect, useState } from 'react'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import ProjectList from 'custom/projectList'
import { useRequest } from 'hooks/useRequest'
import { Project } from 'types/project'

const Projects = () => {
    const [projectList, setProjectList] = useState<Project[]>()
    const accessToken = localStorage.getItem('accessToken')
    const { get } = useRequest()

    useEffect(() => {
        get<{ items: Project[] }>('/api/projects/findAll', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                setProjectList([])
            })
            .catch((e) => {})
    }, [])

    return (
        <Page title="projects">
            <MainCard title="Projects">
                <ProjectList />
            </MainCard>
        </Page>
    )
}

Projects.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Projects
