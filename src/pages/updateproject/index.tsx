import React, { ReactElement } from 'react'
import Page from 'ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import ProjectPage from 'custom/updateproject'
import Layout from 'layout'

const UpdateProject = () => {
    return (
        <Page title="ProjectPage">
            <MainCard title="ProjectPage">
                <ProjectPage />
            </MainCard>
        </Page>
    )
}

UpdateProject.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default UpdateProject
