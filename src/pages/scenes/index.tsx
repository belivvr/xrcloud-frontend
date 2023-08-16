import { ReactElement, useEffect, useState } from 'react'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import SceneList from 'components/custom/scenes/sceneList'
import FormControlSelect from 'ui-component/extended/Form/FormControlSelect'
import useChoicedProject from 'hooks/useChoicedProject'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import { useScenes } from 'hooks/api/useScenes'
import { Scene } from 'types/project'
import { NeedChoiceProject } from 'components/custom/common/NeedChoiceProject'
import { useProject } from 'hooks/api/useProject'

const Scenes = () => {
    const [sceneList, setSceneList] = useState<Scene[]>()
    const { projectList, findById } = useProject()
    const { getScenes, createScene, updateScene } = useScenes()
    const { choicedProject, setChoicedProject } = useChoicedProject()

    const [loading, setLoading] = useState(true)

    const { locale } = useConfig()
    const localization = useLocalization(locale)
    const selectedProjectId = localStorage.getItem('projectId')
    const apiKey = localStorage.getItem('apiKey')

    useEffect(() => {
        if (!choicedProject) return
        getScenes()
            .then((res) => {
                setSceneList(res.items)
            })
            .catch((err) => {
                setSceneList(undefined)
                setChoicedProject(undefined)
            })
    }, [choicedProject])

    useEffect(() => {
        if (!selectedProjectId) return
        findById(selectedProjectId)
            .then((project) => {
                setChoicedProject(project)
            })
            .catch((err) => {
                setChoicedProject(undefined)
                localStorage.removeItem('projectId')
            })
    }, [selectedProjectId])

    useEffect(() => {
        setLoading(false)
    }, [])

    // if (loading) {
    //     return <></>
    // }

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
                {sceneList ? <SceneList project={choicedProject} updateScene={updateScene} sceneList={sceneList} /> : <NeedChoiceProject />}
            </MainCard>
        </Page>
    )
}

Scenes.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Scenes
