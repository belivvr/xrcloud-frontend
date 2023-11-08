/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { EnterServiceButton, StyledAddIcon } from 'components/custom/styles/styled'
import { Project, Scene as SceneType } from 'types/project'
import { GridWrapper } from '../common'
import router from 'next/router'
import Scene from './Scene'
import BasicModal from '../common/BasicModal'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import { useScenes } from 'hooks/api/useScenes'

interface Props {
    project: Project | undefined
    sceneList: SceneType[] | undefined
    isDeleteMode: boolean
    setSceneList: React.Dispatch<React.SetStateAction<SceneType[] | undefined>>
}

const SceneList = ({ project, sceneList, isDeleteMode, setSceneList }: Props) => {
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedSceneId, setSelectedSceneId] = useState('')
    const { getScenes, deleteScene } = useScenes()

    const handleOpen = () => setModalOpen(true)
    const handleClose = () => setModalOpen(false)

    return (
        <GridWrapper>
            <BasicModal
                mainText={localization['delete-scene-modal']}
                buttonLeftText={localization['delete-project-modal-left-button']}
                buttonRightText={localization['delete-project-modal-right-button']}
                open={modalOpen}
                handleClose={handleClose}
                handleRightButton={async () => {
                    try {
                        await deleteScene(selectedSceneId)
                        const scenes = await getScenes()
                        setSceneList(scenes.items)
                        handleClose()
                    } catch (e) {
                        console.log(e)
                    }
                }}
            />
            {sceneList?.map((scene: SceneType) => {
                return (
                    <Scene
                        key={scene.id}
                        scene={scene}
                        isDeleteMode={isDeleteMode}
                        handleOpen={handleOpen}
                        setSelectedSceneId={setSelectedSceneId}
                    />
                )
            })}
            <EnterServiceButton
                onClick={async () => {
                    if (project) {
                        window.open(`${project.sceneCreationUrl}&callback=${window.location.host}${window.location.pathname}`)
                    }
                }}
            >
                <StyledAddIcon color="inherit" />
            </EnterServiceButton>
        </GridWrapper>
    )
}

export default SceneList
