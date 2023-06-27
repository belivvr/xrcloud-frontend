import React, { ReactElement } from 'react'
import Page from 'ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import AddProjectPage from 'components/custom/addproject'
import Layout from 'layout'

const AddProject = () => {
    return (
        <Page title="ProjectPage">
            <MainCard title="ProjectPage">
                <AddProjectPage />
            </MainCard>
        </Page>
    )
}

AddProject.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default AddProject
