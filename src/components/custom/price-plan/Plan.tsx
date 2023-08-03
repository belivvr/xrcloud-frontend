import React, { useEffect, useState } from 'react'
import { Icon, Title } from 'components/custom/price-plan'
import { CenterTypo } from 'components/custom/common'
import { PriceTag } from 'components/custom/price-plan/PriceTag'
import { CheckOptions } from 'components/custom/price-plan/CheckOptions'
import { Button, Grid, useTheme } from '@mui/material'
import MainCard from 'ui-component/cards/MainCard'
import { PricePlan } from 'types/config'
import { gridSpacing } from 'constant'

interface Props {
    receivedPlan: PricePlan
    activeIndex: string
    onChangeActiveIndex: (index: string) => void
}

export function Plan({ receivedPlan, activeIndex, onChangeActiveIndex }: Props) {
    const theme = useTheme()
    const [plan, setPlan] = useState<PricePlan>(receivedPlan)
    const darkBorder = theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary[200] + 75

    useEffect(() => {
        if (!plan) return
        if (activeIndex === plan.id) {
            setPlan({ ...plan, active: true })
        } else {
            setPlan({ ...plan, active: false })
        }
    }, [activeIndex])

    return (
        <Grid item xs={12} sm={6} md={4}>
            <MainCard
                onClick={() => onChangeActiveIndex(plan.id)}
                boxShadow
                sx={{
                    pt: 1.75,
                    border: plan.active ? '2px solid' : '1px solid',
                    borderColor: plan.active ? 'secondary.main' : darkBorder
                }}
            >
                <Grid container textAlign="center" spacing={gridSpacing}>
                    <Icon icon={plan.icon} />
                    <Title title={plan.title} />
                    <CenterTypo description={plan.description} />
                    <PriceTag price={plan.price} />
                    <CheckOptions plan={plan} />
                    <Grid item xs={12}>
                        <Button variant="outlined">Order Now</Button>
                    </Grid>
                </Grid>
            </MainCard>
        </Grid>
    )
}
