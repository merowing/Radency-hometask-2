import { createStore, combineReducers } from 'redux';
import noteReducer from './reducers/noteReducer';
import modalWindowReducer from './reducers/modalWindowReducer';
import showArchivesReducer from './reducers/showArchivesReducer';

const rootReducer = combineReducers({
    notes: noteReducer,
    modalWindow: modalWindowReducer,
    showArchives: showArchivesReducer,
});

const store = createStore(rootReducer);

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
