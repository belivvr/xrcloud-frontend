// third-party
import { FormattedMessage } from 'react-intl'

// assets
import { IconKey, IconSitemap } from '@tabler/icons'
import { NavItemType } from 'types'

// constant
const icons = {
    IconKey,
    IconSitemap
}

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages: NavItemType = {
    id: 'pages',
    title: <FormattedMessage id=" " />,
    icon: icons.IconKey,
    type: 'group',
    children: [
        {
            id: 'Projects',
            title: <FormattedMessage id="projects" />,
            type: 'item',
            url: '/projects',
            icon: icons.IconSitemap,
            breadcrumbs: false,
            children: []
        }
    ]
}

export default pages
