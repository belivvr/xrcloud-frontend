// types
import { MenuProps } from 'types/menu'
import { createSlice } from '@reduxjs/toolkit'

// project imports
import { dispatch } from '../index'
import axios from 'utils/axios'

// initial state
const initialState: MenuProps = {
    selectedItem: ['dashboard'],
    selectedID: null,
    drawerOpen: false,
    error: null,
    menuDashboard: {}
}

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        activeItem(state, action) {
            state.selectedItem = action.payload
        },

        activeID(state, action) {
            state.selectedID = action.payload
        },

        openDrawer(state, action) {
            state.drawerOpen = action.payload
        },

        // has error
        hasError(state, action) {
            state.error = action.payload
        },

        // get dashboard menu
        getMenuListSuccess(state, action) {
            state.menuDashboard = action.payload
        }
    }
})

export default menu.reducer

export const { activeItem, openDrawer, activeID } = menu.actions

export function getDashboard() {
    return async () => {
        try {
            const response = await axios.get('/api/dashboard')
            dispatch(menu.actions.getMenuListSuccess(response.data.dashboard))
        } catch (error) {
            dispatch(menu.actions.hasError(error))
        }
    }
}
