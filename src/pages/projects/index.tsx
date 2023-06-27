import { ReactElement, useEffect, useState } from 'react'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import ProjectList from 'custom/projectList'
import { useProjects } from 'hooks/useProjects'

const Projects = () => {
    const { projectList } = useProjects()

    return (
        <Page title="projects">
            <MainCard title="Projects">
                <ProjectList projectList={projectList} />
            </MainCard>
        </Page>
    )
}

Projects.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Projects
