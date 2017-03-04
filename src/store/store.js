import { createStore, combineReducers ,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk';


import AuthReducer from './reducer/authReducer'
import MainReducer from './reducer/mainReducer'

export const rootReducer = createStore(
    combineReducers({
        AuthReducer,
        MainReducer
    })
    , {},
    applyMiddleware(logger(), thunk)
)
export let store = rootReducer;