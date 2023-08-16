import React, { useState, useEffect } from 'react'

// third-party
import { IntlProvider, MessageFormatElement } from 'react-intl'
import useConfig from 'hooks/useConfig'
import { EN_JSON, KO_JSON } from './localeJSON'

// load locales files
const loadLocaleData = (locale: string) => {
    switch (locale) {
        case 'ko':
            return import('../../utils/locales/ko.json')
        default:
            return import('../../utils/locales/en.json')
    }
}

// ==============================|| LOCALIZATION ||============================== //
interface LocalsProps {
    children: React.ReactNode
}

const Locales = ({ children }: LocalsProps) => {
    const { locale } = useConfig()
    const [messages, setMessages] = useState<Record<string, string> | Record<string, MessageFormatElement[]> | undefined>(
        locale === 'ko' ? KO_JSON : EN_JSON
    )

    useEffect(() => {
        loadLocaleData(locale).then((d: { default: Record<string, string> | Record<string, MessageFormatElement[]> | undefined }) => {
            setMessages(d.default)
        })
    }, [locale])

    return (
        <>
            <IntlProvider locale={locale} defaultLocale="en" messages={messages}>
                {children}
            </IntlProvider>
        </>
    )
}

export default Locales
