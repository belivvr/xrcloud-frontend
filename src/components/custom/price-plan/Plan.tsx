import React, { useEffect, useState } from 'react'
import { Icon, Title } from 'components/custom/price-plan'
import { PriceTag } from 'components/custom/price-plan/PriceTag'
import { CheckOptions } from 'components/custom/price-plan/CheckOptions'
import { Button, Grid, useTheme } from '@mui/material'
import MainCard from 'ui-component/cards/MainCard'
import { PricePlan } from 'types/config'
import Link from 'next/link'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'

interface Props {
    plans: PricePlan[]
    setPlans: React.Dispatch<React.SetStateAction<PricePlan[] | undefined>>
    plan: PricePlan
    activeIndex: string
    onChangeActiveIndex: (index: string) => void
}

export function Plan({ plans, setPlans, plan, activeIndex, onChangeActiveIndex }: Props) {
    const theme = useTheme()
    const darkBorder = theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary[200] + 75
    const { locale } = useConfig()
    const localization = useLocalization(locale)

    useEffect(() => {
        if (!plan) return
        if (activeIndex === plan.id) {
            const newPlans = plans.map((item) => (item.id === activeIndex ? { ...item, active: true } : { ...item, active: false }))
            setPlans(newPlans)
        }
    }, [activeIndex])

    return (
        <Grid item xs={12} sm={6} md={4}>
            <MainCard
                onClick={() => onChangeActiveIndex(plan.id)}
                boxShadow
                sx={{
                    pt: '10px',
                    border: plan.active ? '2px solid' : '1px solid',
                    borderColor: plan.active ? 'secondary.main' : darkBorder,
                    backgroundColor: plan.id === '4' ? 'secondary.main' : theme.palette.background.default,
                    color: plan.id === '4' ? 'white' : theme.palette.text.primary
                }}
            >
                {plan.id === '4' ? (
                    <div
                        style={{
                            display: 'flex',
                            height: '500px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: '20px',
                            textAlign: 'center'
                        }}
                    >
                        <h1>Business</h1>
                        <div>{localization['price-business-description']}</div>
                        <Button
                            component="a"
                            href="mailto:dev_team@belivvr.com"
                            style={{ backgroundColor: theme.palette.background.default, color: '#000' }}
                            variant="contained"
                        >
                            {localization['price-business-button']}
                        </Button>
                    </div>
                ) : (
                    <Grid style={{ height: '500px' }} container textAlign="center">
                        <Icon icon={plan.icon} />
                        <Title title={plan.title} />
                        <PriceTag price={plan.price} />
                        <CheckOptions plan={plan} />
                        <Grid item xs={12}>
                            {plan.id === '1' ? (
                                <Button variant="outlined" component={Link} href="/projects">
                                    시작하기
                                </Button>
                            ) : (
                                <Button disabled variant="contained">
                                    예정
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                )}
            </MainCard>
        </Grid>
    )
}
