import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as notifications } from 'react-notification-system-redux';
import { reducer as form } from 'redux-form';
import planSelection from 'modules/planSelection';
import currentUser from 'modules/currentUser';
import payment from 'modules/payment';
import keywords from 'modules/keywords';

import layout from 'layouts/DefaultLayout/modules/layout';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    planSelection,
    keywords,
    currentUser,
    payment,
    layout,
    router,
    form,
    notifications,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
