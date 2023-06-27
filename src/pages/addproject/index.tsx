import React, { ReactElement } from 'react'
import Page from 'ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import Layout from 'layout'
import { AddProjectForm } from 'components/custom/addprojectForm'

const AddProject = () => {
    return (
        <Page title="Add project">
            <MainCard title="Add project">
                <AddProjectForm />
            </MainCard>
        </Page>
    )
}

AddProject.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default AddProject
