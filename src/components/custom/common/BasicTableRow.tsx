import { TableCell, TableRow, TextField } from '@mui/material'

interface Props {
    tableName: string
    value: string | Date
}

export function BasicTableRow({ tableName, value }: Props) {
    return (
        <TableRow>
            <TableCell>{tableName}</TableCell>
            <TableCell>
                <TextField disabled value={value} fullWidth />
            </TableCell>
        </TableRow>
    )
}
