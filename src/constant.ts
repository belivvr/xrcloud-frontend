import { ReactElement } from 'react'

export const LAYOUT_CONST = {
    VERTICAL_LAYOUT: 'vertical',
    HORIZONTAL_LAYOUT: 'horizontal',
    DEFAULT_DRAWER: 'default',
    MINI_DRAWER: 'mini-drawer'
}

export const LAYOUT: any = {
    main: 'main',
    noauth: 'noauth',
    minimal: 'minimal',
    landing: 'landing'
}
export interface Props {
    children: ReactElement
    variant?: 'main' | 'minimal' | 'noauth' | 'landing'
}

export const gridSpacing = 3
export const drawerWidth = 260
export const appDrawerWidth = 320

export default LAYOUT
