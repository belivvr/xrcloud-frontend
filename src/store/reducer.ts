// third-party
import { combineReducers } from 'redux'

// project imports
import snackbarReducer from './slices/snackbar'
import menuReducer from './slices/menu'
import projectReducer from './slices/project'

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    snackbar: snackbarReducer,
    menu: menuReducer,
    project: projectReducer
})

export default reducer
