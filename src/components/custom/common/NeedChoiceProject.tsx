import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import React from 'react'

export function NeedChoiceProject() {
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'calc(100vh - 268px)',
                fontSize: '60px',
                fontWeight: '700',
                lineHeight: 1.5,
                textAlign: 'center',
                whiteSpace: 'pre-line'
            }}
        >
            {localization['click-project']}
        </div>
    )
}
