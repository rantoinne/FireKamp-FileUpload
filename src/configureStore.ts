/**
 * Create the store with dynamic reducers
 */

 import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
 import ReduxThunk from 'redux-thunk';
 
 import fileReducer from './store/reducers/file.reducer';
 
 function createReducer() {
   const rootReducer = combineReducers({
     files: fileReducer,
   });
 
   return rootReducer;
 }
 
 const configStore = (initialState = {}): any => {
   let composeEnhancers = compose;
   if (__DEV__) {
     // @ts-ignore
     composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
   } else {
     composeEnhancers = compose;
   }
   const middlewares = [] as [];
 
   const enhancers = [...middlewares, applyMiddleware(ReduxThunk)];
 
   const store = createStore(createReducer(), initialState, composeEnhancers(...enhancers));
 
   return { store };
 };
 
 export default configStore;
 