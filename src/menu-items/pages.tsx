// third-party
import { FormattedMessage } from 'react-intl'

// assets
import { IconKey, IconBug } from '@tabler/icons'
import { NavItemType } from 'types'

// constant
const icons = {
    IconKey,
    IconBug
}

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages: NavItemType = {
    id: 'pages',
    title: <FormattedMessage id=" " />,
    icon: icons.IconKey,
    type: 'group',
    children: [
        {
            id: 'project-manage',
            title: <FormattedMessage id="project-manage" />,
            type: 'item',
            url: '/project-manage',
            icon: icons.IconBug,
            breadcrumbs: false,
            children: []
        }
    ]
}

export default pages
