import { createStore, combineReducers } from 'redux';
import noteReducer from './reducers/noteReducer';
import modalWindowReducer from './reducers/modalWindowReducer';

const rootReducer = combineReducers({
    notes: noteReducer,
    modalWindowVisiblity: modalWindowReducer,
});

const store = createStore(rootReducer);

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
