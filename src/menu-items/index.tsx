import pages from './pages'
import other from './other'
import { NavItemType } from 'types'

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[]; item: NavItemType[] } = {
    items: [pages, other],
    item: [pages]
}

export default menuItems
