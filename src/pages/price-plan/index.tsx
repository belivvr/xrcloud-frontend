import { ReactElement, useEffect, useState } from 'react'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'

// assets
import TwoWheelerTwoToneIcon from '@mui/icons-material/TwoWheelerTwoTone'
import AirportShuttleTwoToneIcon from '@mui/icons-material/AirportShuttleTwoTone'
import DirectionsBoatTwoToneIcon from '@mui/icons-material/DirectionsBoatTwoTone'
import { Grid, useMediaQuery, useTheme } from '@mui/material'
import MainCard from 'ui-component/cards/MainCard'
import React from 'react'
import { Plan } from 'components/custom/price-plan/Plan'
import mailgo from 'mailgo'
import { Locale, PricePlan as PricePlanType, StaticProps } from 'types/config'
import Metatag from 'components/custom/common/Metatag'

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

const PricePlan = ({ locale }: Props) => {
    const { locale: configLocale } = useConfig()
    const localization = useLocalization(configLocale)

    const [plans, setPlans] = useState<PricePlanType[]>()
    const [loading, setLoading] = useState(true)
    const [activeIndex, setActiveIndex] = useState('1')
    const theme = useTheme()
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'))

    const onChangeActiveIndex = (index: string) => {
        setActiveIndex(index)
    }

    useEffect(() => {
        mailgo()
        setLoading(false)
    }, [])

    useEffect(() => {
        const mockPlans: PricePlanType[] = [
            {
                id: '1',
                active: true,
                icon: <TwoWheelerTwoToneIcon fontSize="large" color="inherit" />,
                title: configLocale === 'en' ? 'Starter' : '스타트',
                price: '0',
                permission: [0, 1]
            },
            {
                id: '2',
                active: false,
                icon: <AirportShuttleTwoToneIcon fontSize="large" />,
                title: configLocale === 'en' ? 'Personal' : '퍼스널',
                price: configLocale === 'en' ? '6.66' : '8,800',
                permission: [0, 1]
            },
            {
                id: '3',
                active: false,
                icon: <DirectionsBoatTwoToneIcon fontSize="large" />,
                title: configLocale === 'en' ? 'Professional' : '프로페셔널',
                price: configLocale === 'en' ? '77' : '99,000',
                permission: [0, 1, 2]
            },
            {
                id: '4',
                active: false,
                icon: <DirectionsBoatTwoToneIcon fontSize="large" />,
                title: 'Extended',
                price: '599',
                permission: [0, 1, 2]
            }
        ]
        setPlans(mockPlans)
    }, [configLocale])

    if (loading) {
        return (
            <Page title={localization.price}>
                <Metatag locale={locale} />
            </Page>
        )
    }

    return (
        <Page title={localization.price}>
            <MainCard title={localization.price}>
                <div style={{ marginBottom: '1rem', fontSize: '12px', fontWeight: '600' }}>{localization['price-warning']}</div>
                <Grid style={{ display: 'grid', gridTemplateColumns: !matchDownMd ? '1fr 1fr 1fr 1fr' : '1fr 1fr', gap: '8px' }}>
                    {plans?.map((plan, index) => {
                        return (
                            <Plan
                                key={plan.id}
                                plan={plan}
                                plans={plans}
                                setPlans={setPlans}
                                activeIndex={activeIndex}
                                onChangeActiveIndex={onChangeActiveIndex}
                            />
                        )
                    })}
                </Grid>
            </MainCard>
        </Page>
    )
}

PricePlan.getLayout = function getLayout(page: ReactElement) {
    return <Layout variant="landing">{page}</Layout>
}

export default PricePlan
