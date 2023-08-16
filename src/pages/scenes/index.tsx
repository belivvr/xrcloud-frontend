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
import Metatag from 'components/custom/common/Metatag'
import { Locale, StaticProps } from 'types/config'

export const getServerSideProps = async (data: StaticProps) => {
    try {
        return {
            props: { locale: data.locale }
        }
    } catch (err) {
        console.error(err)
        return {
            props: {},
            notFound: true
        }
    }
}

interface Props {
    locale: Locale
}

const Scenes = ({ locale }: Props) => {
    const [sceneList, setSceneList] = useState<Scene[]>()
    const { projectList, findById } = useProject()
    const { getScenes, createScene, updateScene } = useScenes()
    const { choicedProject, setChoicedProject } = useChoicedProject()

    const [loading, setLoading] = useState(true)

    const { locale: configLocale } = useConfig()
    const localization = useLocalization(configLocale)

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
        const selectedProjectId = localStorage.getItem('projectId')

        if (!selectedProjectId) return
        findById(selectedProjectId)
            .then((project) => {
                setChoicedProject(project)
            })
            .catch((err) => {
                setChoicedProject(undefined)
                localStorage.removeItem('projectId')
            })
    }, [])

    useEffect(() => {
        setLoading(false)
    }, [])

    if (loading) {
        return (
            <Page title="Scenes">
                <Metatag locale={locale} />
            </Page>
        )
    }

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
