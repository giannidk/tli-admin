import { createStore, applyMiddleware, compose } from 'redux'

import { persistStore } from 'redux-persist'

import thunk from 'redux-thunk'
import rootReducer from './reducers'

const enhancers = []
const middleware = [thunk]





//const persistedReducer = persistReducer(persistConfig, rootReducer)
const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

export default () => {
  const store = createStore(rootReducer, {}, composedEnhancers)
  return { store, persistor: persistStore(store) }
}