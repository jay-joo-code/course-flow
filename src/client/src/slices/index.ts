import { combineReducers, Reducer } from 'redux'

import authReducer from './auth';
import countReducer from './count';
import tokenReducer from './token';
import { RootState } from 'src/types'

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  authState: authReducer,
  countState: countReducer,
  tokenState: tokenReducer,
})

export default rootReducer