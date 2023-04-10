import {
    MEMBERS_UPDATE_REQUEST,
    MEMBERS_UPDATE_SUCCESS,
    MEMBERS_UPDATE_FAIL,
    MEMBERS_CREATE_FAIL,
    MEMBERS_CREATE_REQUEST,
    MEMBERS_CREATE_SUCCESS,
    MEMBERS_DELETE_FAIL,
    MEMBERS_DELETE_REQUEST,
    MEMBERS_DELETE_SUCCESS,
    MEMBERS_LIST_FAIL,
    MEMBERS_LIST_REQUEST,
    MEMBERS_LIST_SUCCESS,
  } from "../constants/memberConstants";
  
  export const memberListReducer = (state = { members: [] }, action) => {
    switch (action.type) {
      case MEMBERS_LIST_REQUEST:
        return { loading: true };
      case MEMBERS_LIST_SUCCESS:
        return { loading: false, members: action.payload };
      case MEMBERS_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const memberCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case MEMBERS_CREATE_REQUEST:
        return { loading: true };
      case MEMBERS_CREATE_SUCCESS:
        return { loading: false, success: true };
      case MEMBERS_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const memberDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case MEMBERS_DELETE_REQUEST:
        return { loading: true };
      case MEMBERS_DELETE_SUCCESS:
        return { loading: false, success: true };
      case MEMBERS_DELETE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
  
  export const memberUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case MEMBERS_UPDATE_REQUEST:
        return { loading: true };
      case MEMBERS_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case MEMBERS_UPDATE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
  