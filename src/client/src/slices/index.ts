import { combineReducers, Reducer } from 'redux'

import authReducer from './auth';
import countReducer from './count';
import { RootState } from 'src/types'

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  authState: authReducer,
  countState: countReducer,
})

export default rootReducer