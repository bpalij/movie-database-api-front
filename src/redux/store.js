import { combineReducers, createStore } from 'redux';
import {
  LOAD_CONF_SUCCESS, LOAD_CONF_ERROR, LOAD_NEW_QUERY_START,
  LOAD_NEW_QUERY_SUCCESS, LOAD_NEW_QUERY_ERROR, LOAD_NEW_PAGE_START,
  LOAD_NEW_PAGE_SUCCESS, LOAD_NEW_PAGE_ERROR,
} from './actionTypes';

const defaultShowHide = {
  loadForm: true,
  showForm: false,
  errorForm: false,
  disableForm: true,
  specifySearch: false,
  showParams: false,
  loadResult: false,
  showResult: false,
  errorResult: false,
  showPagination: false,
  // disablePagination: true,
};

function showHide(state = defaultShowHide, action) {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_CONF_SUCCESS:
      newState.loadForm = false;
      newState.showForm = true;
      newState.disableForm = false;
      newState.specifySearch = true;
      return newState;
    case LOAD_CONF_ERROR:
      newState.loadForm = false;
      newState.errorForm = true;
      return newState;
    case LOAD_NEW_QUERY_START:
      newState.disableForm = true;
      newState.specifySearch = false;
      newState.showParams = false;
      newState.loadResult = true;
      newState.showResult = false;
      newState.showPagination = false;
      // newState.disablePagination = true;
      return newState;
    case LOAD_NEW_QUERY_SUCCESS:
      newState.disableForm = false;
      newState.specifySearch = false;
      newState.showParams = true;
      newState.loadResult = false;
      newState.showResult = true;
      newState.showPagination = true;
      // newState.disablePagination = false;
      return newState;
    case LOAD_NEW_QUERY_ERROR:
      newState.showForm = true;
      newState.disableForm = false;
      newState.loadResult = false;
      newState.specifySearch = false;
      newState.showParams = false;
      newState.showResult = false;
      newState.errorResult = true;
      newState.showPagination = false;
      return newState;
    case LOAD_NEW_PAGE_START:
      newState.disableForm = true;
      newState.showParams = true;
      newState.showResult = false;
      newState.loadResult = true;
      newState.specifySearch = false;
      newState.showPagination = true;
      // newState.disablePagination = true;
      return newState;
    case LOAD_NEW_PAGE_SUCCESS:
      newState.disableForm = false;
      newState.showParams = true;
      newState.showResult = true;
      newState.loadResult = false;
      newState.specifySearch = false;
      newState.showPagination = true;
      // newState.disablePagination = false;
      return newState;
    case LOAD_NEW_PAGE_ERROR:
      newState.showForm = true;
      newState.disableForm = false;
      newState.showResult = false;
      newState.loadResult = false;
      newState.specifySearch = false;
      newState.errorResult = true;
      newState.showPagination = false;
      return newState;
    default:
      return state;
  }
}

function conf(state = {}, action) {
  switch (action.type) {
    case LOAD_CONF_SUCCESS:
      return action.data;
    default:
      return state;
  }
}

function result(state = {}, action) {
  switch (action.type) {
    case LOAD_NEW_QUERY_SUCCESS:
      return action.data.result;
    case LOAD_NEW_PAGE_SUCCESS:
      return action.data.result;
    default:
      return state;
  }
}

const defaultPaginator = {
  currentPage: undefined,
  maxPage: undefined,
};

function paginator(state = defaultPaginator, action) {
  function updatePaginator() {
    const newState = { ...state };
    newState.currentPage = action.data.result.page;
    newState.maxPage = action.data.result.total_pages;
    return newState;
  }
  switch (action.type) {
    case LOAD_NEW_QUERY_SUCCESS:
      return updatePaginator();
    case LOAD_NEW_PAGE_SUCCESS:
      return updatePaginator();
    default:
      return state;
  }
}

function requestParams(state = {}, action) {
  switch (action.type) {
    case LOAD_NEW_QUERY_SUCCESS:
      return action.data.requestParams;
    case LOAD_NEW_PAGE_SUCCESS:
      return action.data.requestParams;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  showHide,
  conf,
  result,
  paginator,
  requestParams,
});

// have to disable eslint rule for devtools
/* eslint-disable no-underscore-dangle */
const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
/* eslint-enable */

export default store;
