// material-ui
import { Grid, IconButton, Stack, Typography } from '@mui/material'

// project imports
import MainCard from './MainCard'
import { GenericCardProps } from 'types'

// ============================|| ROUND ICON CARD ||============================ //

interface Props {
    primary: string
    secondary: string
    content: string
    iconPrimary: GenericCardProps['iconPrimary']
    color: string
    bgcolor: string
}

const RoundIconCard = ({ primary, secondary, content, iconPrimary, color, bgcolor }: Props) => {
    const IconPrimary = iconPrimary!
    const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null

    return (
        <MainCard>
            <Grid container alignItems="center" spacing={0} justifyContent="space-between">
                <Grid item>
                    <Stack spacing={1}>
                        <Typography variant="h5" color="inherit">
                            {primary}
                        </Typography>
                        <Typography variant="h3">{secondary}</Typography>
                        <Typography variant="subtitle2" color="inherit">
                            {content}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item>
                    <IconButton
                        sx={{ bgcolor, color, '& .MuiSvgIcon-root': { fontSize: '1.5rem' } }}
                        size="large"
                        aria-label="more-options"
                    >
                        {primaryIcon}
                    </IconButton>
                </Grid>
            </Grid>
        </MainCard>
    )
}

export default RoundIconCard
