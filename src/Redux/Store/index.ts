import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { AppReducer, AuthReducer, CompanyReducer, AdminReducer } from '@Redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


import rootSaga from '../Sagas';

const persistConfig = {
  key: 'quanta-business',
  storage,
}

const rootReducer = combineReducers({
  AppReducer,
  AuthReducer,
  CompanyReducer,
  AdminReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persistedReducer,
  {},
  compose(applyMiddleware(sagaMiddleware)),
);

let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, sagaMiddleware, rootSaga, persistor };
