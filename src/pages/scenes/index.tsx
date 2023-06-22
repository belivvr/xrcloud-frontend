import { ReactElement } from 'react'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import SceneList from 'custom/scenes/sceneList'
import FormControlSelect from 'ui-component/extended/Form/FormControlSelect'

const currencies = [
    { value: '', label: 'None' },
    { value: '1', label: '프로젝트1' }
]

const Scenes = () => {
    return (
        <Page title="Scenes">
            <MainCard
                title="Scenes"
                secondary={
                    <div style={{ width: '300px' }}>
                        <FormControlSelect currencies={currencies} captionLabel="ProjectId선택" />
                    </div>
                }
            >
                <SceneList />
            </MainCard>
        </Page>
    )
}

Scenes.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Scenes
