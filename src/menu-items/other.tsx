// third-party
import { FormattedMessage } from 'react-intl'

// assets
import { IconBrandChrome, IconDoor, IconAccessible, IconSitemap, IconRocket, IconFileDollar } from '@tabler/icons'
import { NavItemType } from 'types'

// constant
const icons = {
    IconBrandChrome,
    IconDoor,
    IconAccessible,
    IconSitemap,
    IconRocket,
    IconFileDollar
}

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other: NavItemType = {
    id: 'sample-docs-roadmap',
    icon: IconBrandChrome,
    type: 'group',
    children: [
        {
            id: 'scenes',
            title: <FormattedMessage id="scenes" />,
            type: 'item',
            url: '/scenes',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'rooms',
            title: <FormattedMessage id="rooms" />,
            type: 'item',
            url: '/rooms',
            icon: icons.IconDoor,
            breadcrumbs: false
        }
    ]
}

export default other
