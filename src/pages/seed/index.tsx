import { useEffect, useState, ReactElement } from 'react'

// project imports
import Layout from 'layout'
import Page from 'ui-component/Page'

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Seed = () => {
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(false)
    }, [])

    return <Page title="Default Seed">Seed</Page>
}

Seed.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Seed
