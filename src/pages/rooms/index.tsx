import React, { ReactElement, useEffect, useState } from 'react'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import RoomList from 'components/custom/room/roomList'
import FormControlSelect from 'ui-component/extended/Form/FormControlSelect'
import useChoicedProject from 'hooks/useChoicedProject'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import { NeedChoiceProject } from 'components/custom/common/NeedChoiceProject'
import { useRoom } from 'hooks/api/useRoom'
import { Room, Scene } from 'types/project'
import { useScenes } from 'hooks/api/useScenes'
import FormControlSelectScene from 'ui-component/extended/Form/FormControlSelectScene'
import { enqueueSnackbar } from 'notistack'
import { useProject } from 'hooks/api/useProject'
import { Locale, StaticProps } from 'types/config'
import Metatag from 'components/custom/common/Metatag'
import MainCardTrashIcon from 'components/custom/common/MainCardTrashIcon'

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

const Rooms = ({ locale }: Props) => {
    const [roomList, setRoomList] = useState<Room[]>()
    const [sceneList, setSceneList] = useState<Scene[]>()
    const [loading, setLoading] = useState(true)
    const [isDeleteMode, setIsDeleteMode] = useState(false)

    const { projectList } = useProject()
    const { choicedProject, choicedScene, setChoicedScene } = useChoicedProject()
    const { locale: configLocale } = useConfig()
    const localization = useLocalization(configLocale)
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
        if (!choicedScene) {
            setSceneList(undefined)
            setRoomList(undefined)
            setChoicedScene('')
            return
        }
        getRooms()
            .then((res) => {
                setRoomList(res.items)
            })
            .catch((err) => {})
    }, [choicedScene])

    useEffect(() => {
        setLoading(false)
    }, [])

    if (loading) {
        return (
            <Page title="Rooms">
                <Metatag locale={locale} />
            </Page>
        )
    }

    return (
        <Page title="Rooms">
            <MainCard
                title="Rooms"
                secondary={
                    <div style={{ width: '500px', display: 'flex', alignItems: 'center' }}>
                        <MainCardTrashIcon
                            onClick={() => {
                                if (!roomList?.length) return
                                setIsDeleteMode(!isDeleteMode)
                            }}
                        />
                        {projectList && (
                            <div style={{ width: '500px', display: 'flex', gap: '12px' }}>
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
                    <RoomList isDeleteMode={isDeleteMode} roomList={roomList} sceneId={choicedScene} setRoomList={setRoomList} />
                ) : (
                    <NeedChoiceProject title={localization['room-guide']} />
                )}
            </MainCard>
        </Page>
    )
}

Rooms.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Rooms
