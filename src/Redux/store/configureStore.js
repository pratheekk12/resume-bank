import {combineReducers,createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {logReducer} from '../reducers/logReducer'
import {profilesReducer} from '../reducers/profileReducer'


const root = {
    log : logReducer,
    profiles : profilesReducer
}

const configureStore =()=>{
    const store = createStore(combineReducers(root),applyMiddleware(thunk))
    return store

}

export default configureStore