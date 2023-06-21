import { ReactElement } from 'react'

// material-ui
import { Typography } from '@mui/material'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import SceneList from 'custom/scenes/sceneList'

const Scenes = () => (
    <Page title="Scenes">
        <MainCard title="Scenes">
            <SceneList />
        </MainCard>
    </Page>
)

Scenes.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Scenes
