import { ReactElement, useEffect, useState } from 'react'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import SceneList from 'components/custom/scenes/sceneList'
import FormControlSelect from 'ui-component/extended/Form/FormControlSelect'
import { useProjects } from 'hooks/useProjects'
import useChoicedProject from 'hooks/useChoicedProject'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import { useScenes } from 'hooks/useScenes'
import { useSnackbar } from 'notistack'
import { Scene } from 'types/project'
import { NeedChoiceProject } from 'components/custom/common/NeedChoiceProject'

const Scenes = () => {
    const [sceneList, setSceneList] = useState<Scene[]>()
    const { projectList } = useProjects()
    const { getScenes } = useScenes()
    const { choicedProject } = useChoicedProject()
    const { enqueueSnackbar } = useSnackbar()

    const { locale } = useConfig()
    const localization = useLocalization(locale)

    useEffect(() => {
        if (!choicedProject) return
        getScenes()
            .then((res) => {
                setSceneList(res.items)
            })
            .catch((err) => {
                enqueueSnackbar(err.message, {
                    variant: 'error'
                })
            })
    }, [choicedProject])

    return (
        <Page title="Scenes">
            <MainCard
                title="Scenes"
                secondary={
                    <div style={{ width: '300px' }}>
                        {projectList && (
                            <FormControlSelect
                                selected={choicedProject?.id}
                                currencies={projectList}
                                captionLabel={localization['select-project-id']}
                            />
                        )}
                    </div>
                }
            >
                {choicedProject ? <SceneList sceneList={sceneList} /> : <NeedChoiceProject />}
            </MainCard>
        </Page>
    )
}

Scenes.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Scenes
