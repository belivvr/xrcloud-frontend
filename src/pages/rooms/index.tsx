import React, { ReactElement, useEffect, useState } from 'react'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import RoomList from 'components/custom/room/roomList'
import FormControlSelect from 'ui-component/extended/Form/FormControlSelect'
import { useProjects } from 'hooks/useProjects'
import useChoicedProject from 'hooks/useChoicedProject'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import { NeedChoiceProject } from 'components/custom/common/NeedChoiceProject'
import { useRoom } from 'hooks/api/useRoom'
import { Room, Scene } from 'types/project'
import { useScenes } from 'hooks/api/useScenes'
import FormControlSelectScene from 'ui-component/extended/Form/FormControlSelectScene'
import { enqueueSnackbar } from 'notistack'

const Rooms = () => {
    const [roomList, setRoomList] = useState<Room[]>()
    const [sceneList, setSceneList] = useState<Scene[]>()

    const { projectList } = useProjects()
    const { choicedProject, choicedScene } = useChoicedProject()
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    const { getScenes } = useScenes()
    const { getRooms } = useRoom()

    useEffect(() => {
        if (!choicedProject) return
        getScenes()
            .then((res) => {
                if (res.items.length === 0) {
                    enqueueSnackbar(localization['room-no-scenes'], {
                        variant: 'error'
                    })
                }
                setSceneList(res.items)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [choicedProject])

    useEffect(() => {
        if (!choicedScene) return
        getRooms()
            .then((res) => {
                setRoomList(res.items)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [choicedScene])

    return (
        <Page title="Rooms">
            <MainCard
                title="Rooms"
                secondary={
                    <div style={{ width: '300px' }}>
                        {projectList && (
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <FormControlSelect
                                    selected={choicedProject?.id}
                                    currencies={projectList}
                                    captionLabel={localization['select-project-id']}
                                />
                                <FormControlSelectScene
                                    selected={choicedScene}
                                    currencies={sceneList}
                                    captionLabel={localization['select-scene-id']}
                                />
                            </div>
                        )}
                    </div>
                }
            >
                {roomList ? (
                    <RoomList roomList={roomList} />
                ) : (
                    <NeedChoiceProject title={`우측 상단에서 \n Project 선택 후 Scene ID를 선택해주세요.`} />
                )}
            </MainCard>
        </Page>
    )
}

Rooms.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Rooms
