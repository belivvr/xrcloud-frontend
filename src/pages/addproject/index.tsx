import React, { ReactElement } from 'react'
import Page from 'ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import Layout from 'layout'
import { AddProjectForm } from 'components/custom/addprojectForm'

const AddProject = () => {
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        setLoading(false)
    }, [])

    if (loading) {
        return <></>
    }

    return (
        <Page title="Add project">
            <MainCard title="Project 추가">
                <AddProjectForm />
            </MainCard>
        </Page>
    )
}

AddProject.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default AddProject
