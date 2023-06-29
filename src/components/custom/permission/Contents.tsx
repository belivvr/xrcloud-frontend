import React from 'react'
import styled from '@emotion/styled'
import { Checkbox, TextField, Button } from '@mui/material'
import { Content, ContentTitle } from '../styles/styled'
import { PermissionCheckField } from 'types/project'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import { useSnackbar } from 'notistack'

interface permissionFields {
    title: string
    id: string
    label: string
    isDisabled: boolean
}

interface Props {
    fields: permissionFields[]
    checkfields: PermissionCheckField[]
}

const ContentTextField = styled(TextField)`
    width: 100%;
`

const PermissionContents = ({ fields, checkfields }: Props) => {
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    const { enqueueSnackbar } = useSnackbar()

    const localizedFields = fields.map((field) => ({
        ...field,
        title: localization[field.title] || field.title,
        label: localization[field.label] || field.label
    }))

    const localizedCheckfields = checkfields.map((check) => ({
        ...check,

        title: localization[check.title] || check.title
    }))

    return (
        <>
            {localizedFields.map((field) => (
                <Content key={field.id}>
                    <ContentTitle>{field.title}</ContentTitle>
                    <ContentTextField disabled={field.isDisabled} id="outlined-required" label={field.label} defaultValue={field.label} />
                </Content>
            ))}
            {localizedCheckfields.map((check) => (
                <Content key={check.id}>
                    <ContentTitle>{check.title}</ContentTitle>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Checkbox />
                    </div>
                </Content>
            ))}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px' }}>
                <Button
                    onClick={() => {
                        // enqueueSnackbar(localization['scene-select-no-project'], {
                        //     variant: 'error'
                        // })
                    }}
                    variant="contained"
                >
                    {localization.create}
                </Button>
            </div>
        </>
    )
}

export default PermissionContents
