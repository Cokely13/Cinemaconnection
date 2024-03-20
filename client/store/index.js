import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import singleQuarterbackReducer from './singleQuarterbackStore'
import allQuarterbacksReducer from './allQuarterbacksStore'
import allReceiversReducer from './allReceiverStore'
import singleReceiverReducer from './singleReceiverStore'

const reducer = combineReducers({ auth,
singleQuarterback: singleQuarterbackReducer,
allQuarterbacks: allQuarterbacksReducer,
allReceivers: allReceiversReducer,
singleReceiver: singleReceiverReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
