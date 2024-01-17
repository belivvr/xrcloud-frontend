import { PaletteMode } from '@mui/material'

export type ConfigProps = {
    layout: string
    drawerType: string
    fontFamily: string
    borderRadius: number
    outlinedFilled: boolean
    navType: PaletteMode
    presetColor: string
    locale: 'ko' | 'en'
    rtlLayout: boolean
    container: boolean
}

export type CustomizationProps = {
    layout: string
    drawerType: string
    fontFamily: string
    borderRadius: number
    outlinedFilled: boolean
    navType: PaletteMode
    presetColor: string
    locale: 'ko' | 'en'
    rtlLayout: boolean
    container: boolean
    onChangeLayout: (layout: string) => void
    onChangeDrawer: (drawerType: string) => void
    onChangeMenuType: (navType: PaletteMode) => void
    onChangePresetColor: (presetColor: string) => void
    onChangeLocale: (locale: string) => void
    onChangeRTL: (rtlLayout: boolean) => void
    onChangeContainer: () => void
    onChangeFontFamily: (fontFamily: string) => void
    onChangeBorderRadius: (event: Event, newValue: number | number[]) => void
    onChangeOutlinedField: (outlinedFilled: boolean) => void
}

export interface PricePlan {
    id: string
    active: boolean
    icon: JSX.Element
    title: string
    price: string
    permission: number[]
}

export interface MediumPost {
    author: string
    categories: string[]
    content: string
    description: string
    enclosure: any
    guid: URL
    link: string
    pubDate: string
    thumbnail: string
    title: string
}

export type Locale = 'ko'

export interface StaticProps {
    locales: Locale[]
    locale: Locale
    defaultLocale: Locale
}
