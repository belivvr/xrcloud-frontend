import { ReactElement, useEffect } from 'react'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import SceneList from 'custom/scenes/sceneList'
import FormControlSelect from 'ui-component/extended/Form/FormControlSelect'
import { useProjects } from 'hooks/useProjects'
import useChoicedProject from 'hooks/useChoicedProject'

const Scenes = () => {
    const { projectList } = useProjects()
    const { choicedProject } = useChoicedProject()

    return (
        <Page title="Scenes">
            <MainCard
                title="Scenes"
                secondary={
                    <div style={{ width: '300px' }}>
                        <FormControlSelect currencies={projectList} captionLabel="ProjectId선택" />
                    </div>
                }
            >
                {choicedProject ? (
                    <SceneList />
                ) : (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 'calc(100vh - 268px)',
                            fontSize: '60px',
                            fontWeight: '700'
                        }}
                    >
                        우측 상단에서 프로젝트를 선택해주세요.
                    </div>
                )}
            </MainCard>
        </Page>
    )
}

Scenes.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Scenes
