import { Button, TableCell, TableRow, TextField } from '@mui/material'
import React from 'react'
import { Project } from 'types/project'

interface Props {
    project: Project
    setProject: React.Dispatch<React.SetStateAction<Project | undefined>>
    getProjectKey: (projectId: string) => Promise<Project | undefined>
}

export function GenerateProjectKey({ project, setProject, getProjectKey }: Props) {
    return (
        <TableRow>
            <TableCell>Project Key</TableCell>
            <TableCell style={{ display: 'flex', gap: '16px' }}>
                <TextField disabled value={project.projectKey} fullWidth />
                <Button
                    variant="outlined"
                    onClick={async () => {
                        const response = await getProjectKey(project.id)
                        setProject(response)
                    }}
                    style={{ minWidth: '200px', backgroundColor: '#fff', fontSize: '18px', fontWeight: '600' }}
                >
                    발급 받기
                </Button>
            </TableCell>
        </TableRow>
    )
}
