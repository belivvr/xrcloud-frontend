import { useState } from 'react'

// material-ui
import { useTheme } from '@mui/material/styles'
import { Divider, FormControl, InputAdornment, MenuItem, TextField } from '@mui/material'

// project imports
import { GenericCardProps } from 'types'
import { Scene } from 'types/project'
import useChoicedProject from 'hooks/useChoicedProject'

// ==============================|| FORM CONTROL SELECT ||============================== //

interface FormControlSelectProps {
    captionLabel?: string
    currencies?: Scene[] | undefined
    formState?: string
    iconPrimary?: GenericCardProps['iconPrimary']
    iconSecondary?: GenericCardProps['iconPrimary']
    selected?: string | null
    textPrimary?: string
    textSecondary?: string
}

const FormControlSelectScene = ({
    captionLabel,
    currencies,
    formState,
    iconPrimary,
    iconSecondary,
    selected,
    textPrimary,
    textSecondary
}: FormControlSelectProps) => {
    const { setChoicedScene } = useChoicedProject()

    const theme = useTheme()
    const IconPrimary = iconPrimary!
    const primaryIcon = iconPrimary ? <IconPrimary fontSize="small" sx={{ color: theme.palette.grey[700] }} /> : null

    const IconSecondary = iconSecondary!
    const secondaryIcon = iconSecondary ? <IconSecondary fontSize="small" sx={{ color: theme.palette.grey[700] }} /> : null

    const errorState = formState === 'error'
    const val = selected || ''

    const [currency, setCurrency] = useState(val)
    const handleChange = async (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        const projectId = event?.target.value
        if (typeof projectId === 'string') {
            setCurrency(projectId)
            setChoicedScene(projectId)
        }
    }

    return (
        <FormControl fullWidth error={errorState}>
            <TextField
                id="outlined-select-currency"
                select
                fullWidth
                label={captionLabel}
                value={currency}
                onChange={handleChange}
                InputProps={{
                    startAdornment: (
                        <>
                            {primaryIcon && <InputAdornment position="start">{primaryIcon}</InputAdornment>}
                            {textPrimary && (
                                <>
                                    <InputAdornment position="start">{textPrimary}</InputAdornment>
                                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                </>
                            )}
                        </>
                    ),
                    endAdornment: (
                        <>
                            {secondaryIcon && <InputAdornment position="end">{secondaryIcon}</InputAdornment>}
                            {textSecondary && (
                                <>
                                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                    <InputAdornment position="end">{textSecondary}</InputAdornment>
                                </>
                            )}
                        </>
                    )
                }}
            >
                {currencies?.map((option, index) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.name}
                    </MenuItem>
                ))}
            </TextField>
        </FormControl>
    )
}

export default FormControlSelectScene
