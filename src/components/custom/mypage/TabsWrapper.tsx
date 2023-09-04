import { CardContent, Grid, Tab, Tabs, Typography, useTheme } from '@mui/material'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import React from 'react'
import { allyProps } from 'utils/allyProps'
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone'
import TuneIcon from '@mui/icons-material/Tune'

interface Props {
    value: number
    handleChange: (event: React.SyntheticEvent, newValue: number) => void
}

export default function TabsWrapper({ value, handleChange }: Props) {
    const theme = useTheme()
    const { locale, borderRadius } = useConfig()
    const localization = useLocalization(locale)

    const tabsOption = [
        {
            label: localization.profile,
            icon: <PersonOutlineTwoToneIcon />,
            caption: localization['profile-caption']
        },
        {
            label: localization.account,
            icon: <TuneIcon />,
            caption: localization['account-caption']
        }
    ]

    const style = {
        '& .MuiTabs-flexContainer': {
            borderBottom: 'none'
        },
        '& button': {
            color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[600],
            minHeight: 'auto',
            minWidth: '100%',
            py: 1.5,
            px: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            textAlign: 'left',
            justifyContent: 'flex-start',
            borderRadius: `${borderRadius}px`
        },
        '& button.Mui-selected': {
            color: theme.palette.primary.main,
            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50]
        },
        '& button > svg': {
            marginBottom: '0px !important',
            marginRight: 1.25,
            marginTop: 1.25,
            height: 20,
            width: 20
        },
        '& button > div > span': {
            display: 'block'
        },
        '& > div > span': {
            display: 'none'
        }
    }

    return (
        <Grid item xs={12} lg={3}>
            <CardContent>
                <Tabs value={value} onChange={handleChange} orientation="vertical" variant="scrollable" sx={{ ...style }}>
                    {tabsOption.map((tab, index) => (
                        <Tab
                            key={index}
                            icon={tab.icon}
                            label={
                                <Grid container direction="column">
                                    <Typography variant="subtitle1" color="inherit">
                                        {tab.label}
                                    </Typography>
                                    <Typography component="div" variant="caption" sx={{ textTransform: 'capitalize' }}>
                                        {tab.caption}
                                    </Typography>
                                </Grid>
                            }
                            {...allyProps(index)}
                        />
                    ))}
                </Tabs>
            </CardContent>
        </Grid>
    )
}
