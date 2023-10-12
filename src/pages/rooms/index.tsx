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
import RoomDetailModal from 'components/custom/room/RoomDetailModal'
import router from 'next/router'
import { validateURL } from 'utils/validateUrl'

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
    const [selectedRoom, setSelectedRoom] = useState<Room>()
    const [selectedRoomType, setSelectedRoomType] = useState('')
    const [selectedRoomName, setSelectedRoomName] = useState('')
    const [selectedRoomReturnUrl, setSelectedRoomReturnUrl] = useState<string>('')

    const { projectList } = useProject()
    const { choicedProject, choicedScene, setChoicedScene } = useChoicedProject()
    const { locale: configLocale } = useConfig()
    const localization = useLocalization(configLocale)
    const { getScenes } = useScenes()
    const { getRooms, updateRoom } = useRoom()

    const handleSelectRoomDefault = () => {
        setSelectedRoomType('')
        setSelectedRoomReturnUrl('')
        setSelectedRoom(undefined)
    }

    const handleSelectRoomType = (event: { target: { value: string } }) => {
        setSelectedRoomType(event.target.value)
    }

    const updateSelectedRoom = async () => {
        if (!selectedRoom) return null

        if (validateURL(selectedRoomReturnUrl)) {
            enqueueSnackbar(localization['room-return-url-validation'], { variant: 'error' })
            return null
        }

        if (!selectedRoomName) {
            enqueueSnackbar(localization['error-create-room2'], {
                variant: 'error'
            })
            return null
        }

        try {
            const data = await updateRoom({
                roomId: selectedRoom.id,
                roomSize: selectedRoom.roomSize,
                roomName: selectedRoomName,
                returnUrl: selectedRoomReturnUrl
            })
            const { items } = await getRooms()
            setRoomList(items)
            setSelectedRoom(data)
            return data
        } catch (err: any) {
            if (err.response && err.response.data[0]) {
                enqueueSnackbar(localization['error-create-room1'], {
                    variant: 'error'
                })
            }
            return null
        }
    }

    const handleUpdateRoom = async () => {
        const data = await updateSelectedRoom()
        if (data) {
            enqueueSnackbar(localization['room-update-success'], {
                variant: 'success'
            })
        }
    }

    const handleEnterRoomByHost = async () => {
        const data = await updateSelectedRoom()
        if (data) router.push(data.roomUrl.host)
    }

    const handleEnterRoomByGuest = async () => {
        const data = await updateSelectedRoom()
        if (data) router.push(data.roomUrl.guest)
    }

    const handleClickRoom = (room: Room) => {
        if (selectedRoom) {
            return setSelectedRoom(undefined)
        }
        setSelectedRoom(room)
    }

    useEffect(() => {
        if (!selectedRoom) return
        setSelectedRoomName(selectedRoom.name)
        setSelectedRoomReturnUrl(selectedRoom.returnUrl)
    }, [selectedRoom])

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
            <RoomDetailModal
                roomType={selectedRoomType}
                selectedRoom={selectedRoom}
                selectedRoomName={selectedRoomName}
                selectedRoomReturnUrl={selectedRoomReturnUrl}
                setSelectedRoomName={setSelectedRoomName}
                handleSelectRoomDefault={handleSelectRoomDefault}
                handleSelectRoomType={handleSelectRoomType}
                setRoomReturnUrl={setSelectedRoomReturnUrl}
                handleEnterRoomByHost={handleEnterRoomByHost}
                handleUpdateRoom={handleUpdateRoom}
                handleEnterRoomByGuest={handleEnterRoomByGuest}
            />
            <MainCard
                title="Rooms"
                secondary={
                    <div style={{ width: '500px', display: 'flex', alignItems: 'center', zIndex: 1000 }}>
                        {projectList && (
                            <div style={{ width: '500px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <MainCardTrashIcon
                                    onClick={() => {
                                        if (!roomList?.length) return
                                        setIsDeleteMode(!isDeleteMode)
                                    }}
                                />
                                <div style={{ display: 'flex', width: '100%', gap: '1rem' }}>
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
                            </div>
                        )}
                    </div>
                }
            >
                {roomList ? (
                    <RoomList
                        isDeleteMode={isDeleteMode}
                        roomList={roomList}
                        sceneId={choicedScene}
                        setRoomList={setRoomList}
                        handleClickRoom={handleClickRoom}
                    />
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
