import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import singleMovieReducer from './singleMovieStore'
import singleActorReducer from './singleActorStore'
import actorsReducer from './allActorsStore'
import moviesReducer from './allMoviesStore'

const reducer = combineReducers({ auth,
singleActor: singleActorReducer,
allActors: actorsReducer,
allMovies: moviesReducer,
singleMovie: singleMovieReducer,
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
