import { ReactElement, useState } from 'react'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'

// assets
import TwoWheelerTwoToneIcon from '@mui/icons-material/TwoWheelerTwoTone'
import AirportShuttleTwoToneIcon from '@mui/icons-material/AirportShuttleTwoTone'
import DirectionsBoatTwoToneIcon from '@mui/icons-material/DirectionsBoatTwoTone'
import { Grid } from '@mui/material'
import MainCard from 'ui-component/cards/MainCard'
import { gridSpacing } from 'constant'
import React from 'react'
import { Plan } from 'components/custom/price-plan/Plan'

export const mockPlans = [
    {
        id: '1',
        active: true,
        icon: <TwoWheelerTwoToneIcon fontSize="large" color="inherit" />,
        title: 'Standard',
        description:
            'Create one end product for a client, transfer that end product to your client, charge them for your services. The license is then transferred to the client.',
        price: 69,
        permission: [0, 1]
    },
    {
        id: '2',
        active: false,
        icon: <AirportShuttleTwoToneIcon fontSize="large" />,
        title: 'Standard Plus',
        description:
            'Create one end product for a client, transfer that end product to your client, charge them for your services. The license is then transferred to the client.',
        price: 129,
        permission: [0, 1, 2, 3]
    },
    {
        id: '3',
        active: false,
        icon: <DirectionsBoatTwoToneIcon fontSize="large" />,
        title: 'Extended',
        description:
            'You are licensed to use the CONTENT to create one end product for yourself or for one client (a “single application”), and the end product may be sold or distributed for free.',
        price: 599,
        permission: [0, 1, 2, 3, 4, 5, 6, 7]
    }
]

const PricePlan = () => {
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    const [plans] = useState(mockPlans)
    const [activeIndex, setActiveIndex] = useState('1')

    const onChangeActiveIndex = (index: string) => {
        setActiveIndex(index)
    }

    return (
        <Page title={localization.price}>
            <MainCard title={localization.price}>
                <Grid container spacing={gridSpacing}>
                    {plans.map((plan, index) => {
                        return (
                            <Plan key={plan.id} receivedPlan={plan} activeIndex={activeIndex} onChangeActiveIndex={onChangeActiveIndex} />
                        )
                    })}
                </Grid>
            </MainCard>
        </Page>
    )
}

PricePlan.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default PricePlan
