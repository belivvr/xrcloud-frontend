import { useEffect, useState, ReactElement } from 'react'

// project imports
import Layout from 'layout'
import Page from 'ui-component/Page'
import { useModel } from './model'

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Seed = () => {
    const { loading } = useModel()

    if (loading) return <Page title="Default Seed">Loading...</Page>

    return <Page title="Default Seed">Seed</Page>
}

Seed.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Seed
