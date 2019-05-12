import {
  LOAD_CONF_SUCCESS, LOAD_CONF_ERROR, LOAD_NEW_QUERY_START,
  LOAD_NEW_QUERY_SUCCESS, LOAD_NEW_QUERY_ERROR, LOAD_NEW_PAGE_START,
  LOAD_NEW_PAGE_SUCCESS, LOAD_NEW_PAGE_ERROR,
} from './actionTypes';
// import createParamsFromState from '../misc/createParamsFromState';

export function getConf(data) {
  console.log(data);
  return {
    type: LOAD_CONF_SUCCESS,
    data,
  };
}

export function errConf() {
  // console.log(e);
  return {
    type: LOAD_CONF_ERROR,
  };
}

export function startQuery() {
  return {
    type: LOAD_NEW_QUERY_START,
  };
}

export function loadedQuery(data) {
  return {
    type: LOAD_NEW_QUERY_SUCCESS,
    data,
  };
}

export function errQuery() {
  return {
    type: LOAD_NEW_QUERY_ERROR,
  };
}

export function startPage() {
  return {
    type: LOAD_NEW_PAGE_START,
  };
}

export function loadedPage(data) {
  return {
    type: LOAD_NEW_PAGE_SUCCESS,
    data,
  };
}

export function errPage() {
  return {
    type: LOAD_NEW_PAGE_ERROR,
  };
}
