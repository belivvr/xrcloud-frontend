import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TableCell, TableRow } from '@mui/material'
import React from 'react'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'

interface Props {
    productName: string
    selectProduct: (event: SelectChangeEvent) => void
}

export function SelectProducts({ productName, selectProduct }: Props) {
    const { locale } = useConfig()
    const localization = useLocalization(locale)

    return (
        <TableRow>
            <TableCell>{localization.product}</TableCell>
            <TableCell>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>{localization.product}</InputLabel>
                    <Select id="product" label={localization.product} value={'1'} onChange={selectProduct}>
                        <MenuItem value={1}>hubs</MenuItem>
                    </Select>
                </FormControl>
            </TableCell>
        </TableRow>
    )
}
