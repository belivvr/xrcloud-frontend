import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TableCell, TableRow } from '@mui/material'
import React from 'react'

interface Props {
    productName: string
    selectProduct: (event: SelectChangeEvent) => void
}

export function SelectProducts({ productName, selectProduct }: Props) {
    return (
        <TableRow>
            <TableCell>제품</TableCell>
            <TableCell>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>제품</InputLabel>
                    <Select label="제품" value={productName} onChange={selectProduct}>
                        <MenuItem value={1}>hubs</MenuItem>
                    </Select>
                </FormControl>
            </TableCell>
        </TableRow>
    )
}
