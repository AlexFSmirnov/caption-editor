import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import localforage from 'localforage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { rootReducer } from './state';
import { State, Action } from './types';

const persistConfig = {
    key: 'root',
    storage: localforage,
    stateReconciler: autoMergeLevel2,
    blacklist: [],
};

export const store = createStore(
    persistReducer<State, Action>(persistConfig, rootReducer),
    composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
