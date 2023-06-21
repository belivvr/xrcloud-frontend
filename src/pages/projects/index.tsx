import { ReactElement, useState } from 'react'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import ProjectManages from 'custom/projectList'

const Projects = () => {
    const [isProject, setIsProject] = useState(false)

    return (
        <Page title="projects">
            <MainCard title="Projects">
                <ProjectManages setIsProject={setIsProject} isProject={isProject} />
            </MainCard>
        </Page>
    )
}

Projects.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Projects
