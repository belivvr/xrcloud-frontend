import { ReactElement, useEffect, useState } from 'react'

// material-ui

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import { mockRoom, roomFields } from 'config'
import { Room as RoomType, Scene } from 'types/project'
import { SelectChangeEvent } from '@mui/material'
import Contents from 'components/custom/room/Contents'
import Buttons from 'components/custom/room/Buttons'
import { Loading } from 'components/custom/common'
import { useRouter } from 'next/router'
import { useProject } from 'hooks/api/useProject'
import useChoicedProject from 'hooks/useChoicedProject'
import { useRoom } from 'hooks/api/useRoom'
import { useScenes } from 'hooks/api/useScenes'

const RoomUpdate = () => {
    const [scene, setScene] = useState('')
    const [room, setRoom] = useState<RoomType | null>()
    const [sceneList, setSceneList] = useState<Scene[]>([])
    const projectId = localStorage.getItem('projectId')

    const router = useRouter()
    const { getRoom } = useRoom()
    const { getScenes } = useScenes()
    const { findById } = useProject()
    const { choicedProject, setChoicedProject } = useChoicedProject()

    const selectChange = (event: SelectChangeEvent) => {
        setScene(event.target.value as string)
    }

    const roomEnter = () => {}

    const roomUpdate = () => {}

    const roomDelete = () => {}

    useEffect(() => {
        if (!projectId) return

        findById(projectId) //
            .then((res) => setChoicedProject(res))
            .catch((err) => console.log(err))
    }, [router])

    useEffect(() => {
        if (!choicedProject) return

        setRoom(mockRoom)
        getScenes().then((res) => {
            setSceneList(res.items)
        })
    }, [choicedProject])

    if (!room) {
        return <Loading title="Room" />
    }

    return (
        <Page title="Room">
            <MainCard sx={{ overflow: 'scroll' }} title="Room">
                {sceneList && <Contents room={room} fields={roomFields} sceneList={sceneList} selectChange={selectChange} />}
                <Buttons roomEnter={roomEnter} roomUpdate={roomUpdate} roomDelete={roomDelete} />
            </MainCard>
        </Page>
    )
}

RoomUpdate.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default RoomUpdate
