import React, { ReactElement } from 'react'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import RoomList from 'components/custom/rooms/roomList'
import FormControlSelect from 'ui-component/extended/Form/FormControlSelect'
import { useProjects } from 'hooks/useProjects'
import useChoicedProject from 'hooks/useChoicedProject'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import { NeedChoiceProject } from 'components/custom/common/NeedChoiceProject'


const Rooms = () => {
    const { projectList } = useProjects()
    const { choicedProject } = useChoicedProject()
    const { locale } = useConfig()
    const localization = useLocalization(locale)

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

                {choicedProject ? <RoomList /> : <NeedChoiceProject />}

            </MainCard>
        </Page>
    )
}

Rooms.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Rooms
