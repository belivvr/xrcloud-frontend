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
import { Room } from 'types/project'

const Rooms = () => {
    const [roomList, setRoomList] = useState<Room[]>()
    const { projectList } = useProjects()
    const { choicedProject } = useChoicedProject()
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    const { getRooms } = useRoom()

    useEffect(() => {
        if (!choicedProject) return
        getRooms()
            .then((res) => {
                setRoomList(res.items)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [choicedProject])

    return (
        <Page title="Rooms">
            <MainCard
                title="Rooms"
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
                {choicedProject ? <RoomList roomList={roomList} /> : <NeedChoiceProject />}
            </MainCard>
        </Page>
    )
}

Rooms.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Rooms
