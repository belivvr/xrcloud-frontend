import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import React from 'react'

interface Props {
    title?: string
    style?: React.CSSProperties
}

export function NeedChoiceProject({ title, style }: Props) {
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'calc(100vh - 268px)',
                fontSize: '36px',
                fontWeight: '700',
                lineHeight: 1.5,
                textAlign: 'center',
                whiteSpace: 'pre-line',
                ...style
            }}
        >
            {title || localization['click-project']}
        </div>
    )
}
