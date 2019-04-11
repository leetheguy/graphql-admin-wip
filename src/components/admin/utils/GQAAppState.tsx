import { createStore, Reducer, Store, combineReducers } from 'redux';

import _ from "lodash";
import { GQAWebService } from './GQAWebService';
import { GQAModel } from './GQAModel';

export class GQAAppState {
  public store: Store;

  constructor() {
    this.store = createStore(this.rootReducer);
  }

  webService(state = new GQAWebService) {
    return state;
  }

  models(state = [{}], action) {
    switch (action.type) {
      case 'push_model':
        state.push(action.model)
        return action.model;
      case 'pop_model':
        state.pop();
        return null;
      default: return state;
    }
  }

  // rightModel(state = {}, action) {
  //   switch (action.type) {
  //     case 'set_right_model': return action.model;
  //     case 'clear_right_model': return null;
  //     default: return state;
  //   }
  // }

  leftId(state = null, action) {
    switch (action.type) {
      case 'set_left_model': return action.id;
      case 'clear_left_model': return null;
      default: return state;
    }
  }

  rightId(state = null, action) {
    switch (action.type) {
      case 'set_right_model': return action.id;
      case 'clear_right_model': return null;
      default: return state;
    }
  }

  rootReducer: Reducer = combineReducers({
    webService: this.webService,
    model: this.models,
    // browserMode:         this.browserMode,
    // developerMode:       this.developerMode,
    // appBooting:       this.appBooting,
    // platformReady:       this.platformReady,
    // currentPage:      this.currentPage,
    // navParams:           this.navParams,
    // navViews:         this.navViews,
    // canGoBack:        this.canGoBack,
    // authenticated:       this.authenticated,
    // authUser:            this.authUser,
    // currentUser:         this.currentUser,
    // currentUserVehicles: this.currentUserVehicles,
    // currentUserEmail:   this.currentUserEmail,
    // currentUserToken:   this.currentUserToken,
    // messages:            this.messages,
    // rawUser:            this.rawUser,
    // loading:             this.loading,
    // fcmToken:           this.fcmToken,
    // authToken:           this.authToken,
    // showModal:           this.showModal,
    // showAbout:           this.showAbout,
    // aboutDetailShowing: this.aboutDetailShowing,
    // registered:          this.registered,
    // comingSoon:          this.comingSoon,
  });
}
/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */
// function counter(state = 0, action) {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1
//     case 'DECREMENT':
//       return state - 1
//     default:
//       return state
//   }
// }

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
// let store = createStore(counter)

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

// store.subscribe(() => console.log(store.getState()))

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
// store.dispatch({ type: 'INCREMENT' })
// 1
// store.dispatch({ type: 'INCREMENT' })
// 2
// store.dispatch({ type: 'DECREMENT' })
// 1