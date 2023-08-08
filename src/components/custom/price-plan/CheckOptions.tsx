import { Grid, List, useTheme } from '@mui/material'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import React from 'react'
import { PricePlan } from 'types/config'
import { OptionListItem } from './OptionListItem'

interface Props {
    plan: PricePlan
}

export function CheckOptions({ plan }: Props) {
    const theme = useTheme()
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    const starterList = [localization['price-starter-capacity'], localization['price-starter-user']]
    const personalList = [localization['price-personal-capacity'], localization['price-personal-user']]
    const professionalList = [
        localization['price-professional-capacity'],
        localization['price-professional-user'],
        localization['price-professional-domain']
    ]

    return (
        <Grid item xs={12}>
            <List
                sx={{
                    m: 0,
                    p: 0,
                    '&> li': {
                        px: 0,
                        py: 0.625,
                        '& svg': {
                            fill: theme.palette.success.dark
                        }
                    }
                }}
                component="ul"
            >
                {plan.id === '1' && starterList.map((list, index) => <OptionListItem key={index} index={index} plan={plan} list={list} />)}
                {plan.id === '2' && personalList.map((list, index) => <OptionListItem key={index} index={index} plan={plan} list={list} />)}
                {plan.id === '3' &&
                    professionalList.map((list, index) => <OptionListItem key={index} index={index} plan={plan} list={list} />)}
            </List>
        </Grid>
    )
}
