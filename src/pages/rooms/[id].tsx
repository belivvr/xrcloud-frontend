import { ReactElement, useEffect, useState } from 'react'

// material-ui

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import { Room as RoomType, Scene } from 'types/project'
import Contents from 'components/custom/room/Contents'
import Buttons from 'components/custom/room/Buttons'
import { Loading } from 'components/custom/common'
import { useRouter } from 'next/router'
import { useProject } from 'hooks/api/useProject'
import useChoicedProject from 'hooks/useChoicedProject'
import { useRoom } from 'hooks/api/useRoom'
import { useScenes } from 'hooks/api/useScenes'

const RoomUpdate = () => {
    const [room, setRoom] = useState<RoomType | null>()
    const [sceneList, setSceneList] = useState<Scene[]>([])
    const [choiceSceneId, setChoiceSceneId] = useState('')
    const [roomName, setRoomName] = useState('')
    const [customData, setCustomData] = useState('')
    const [roomSize, setRoomSize] = useState('')
    const [isAutoScale, setIsAutoScale] = useState(false)
    const projectId = localStorage.getItem('projectId')

    const router = useRouter()
    const { getRoom } = useRoom()
    const { getScenes } = useScenes()
    const { findById } = useProject()
    const { choicedProject, setChoicedProject } = useChoicedProject()

    const roomEnter = () => {}

    const roomUpdate = () => {
        console.log(choiceSceneId, roomName, customData, roomSize, isAutoScale)
    }

    const roomDelete = () => {}

    useEffect(() => {
        if (!projectId) return

        findById(projectId) //
            .then((res) => setChoicedProject(res))
            .catch((err) => console.log(err))
    }, [router])

    useEffect(() => {
        if (!choicedProject) return
        const roomId = router.query.id as string
        getScenes()
            .then((res) => setSceneList(res.items))
            .catch((err) => console.log(err))

        getRoom(roomId)
            .then((res) => {
                setRoomName(res.name)
                setCustomData(res.customData)
                setRoomSize(String(res.roomSize))
                setIsAutoScale(res.autoScale)
                setRoom(res)
            })
            .catch((err) => console.log(err))
    }, [choicedProject])

    if (!room) {
        return <Loading title="Room" />
    }

    return (
        <Page title="Room">
            <MainCard sx={{ overflow: 'scroll' }} title="Room">
                {sceneList && (
                    <Contents
                        room={room}
                        sceneList={sceneList}
                        setChoiceSceneId={setChoiceSceneId}
                        setRoomName={setRoomName}
                        setCustomData={setCustomData}
                        setRoomSize={setRoomSize}
                        setIsAutoScale={setIsAutoScale}
                    />
                )}
                <Buttons roomEnter={roomEnter} roomUpdate={roomUpdate} roomDelete={roomDelete} />
            </MainCard>
        </Page>
    )
}

RoomUpdate.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default RoomUpdate
