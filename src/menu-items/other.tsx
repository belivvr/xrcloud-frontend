// third-party
import { FormattedMessage } from 'react-intl'

// assets
import { IconBrandChrome, IconHelp, IconAccessible, IconSitemap } from '@tabler/icons'
import { NavItemType } from 'types'

// constant
const icons = {
    IconBrandChrome,
    IconHelp,
    IconAccessible,
    IconSitemap
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
            icon: icons.IconHelp,
            breadcrumbs: false
        },
        {
            id: 'permissions',
            title: <FormattedMessage id="permissions" />,
            type: 'item',
            url: '/permissions',
            icon: icons.IconSitemap,
            breadcrumbs: false
        }
    ]
}

export default other
