import {
  LOAD_CONF_SUCCESS, LOAD_CONF_ERROR, LOAD_NEW_QUERY_START,
  LOAD_NEW_QUERY_SUCCESS, LOAD_NEW_QUERY_ERROR, LOAD_NEW_PAGE_START,
  LOAD_NEW_PAGE_SUCCESS, LOAD_NEW_PAGE_ERROR,
} from './actionTypes';


export function getConf(data) {
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
