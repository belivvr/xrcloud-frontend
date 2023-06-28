import { Button, TableCell, TableRow, TextField } from '@mui/material'
import React from 'react'
import { Project } from 'types/project'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'

interface Props {
    project: Project
    setProject: React.Dispatch<React.SetStateAction<Project | undefined>>
    getProjectKey: (projectId: string) => Promise<Project | undefined>
}

export function GenerateProjectKey({ project, setProject, getProjectKey }: Props) {
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    return (
        <TableRow>
            <TableCell>{localization['project-key']}</TableCell>
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
                    {localization['get-issued']}
                </Button>
            </TableCell>
        </TableRow>
    )
}
