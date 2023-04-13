import {
    GALLERY_CREATE_FAIL,
    GALLERY_CREATE_REQUEST,
    GALLERY_CREATE_SUCCESS,
    GALLERY_DELETE_FAIL,
    GALLERY_DELETE_REQUEST,
    GALLERY_DELETE_SUCCESS,
    GALLERY_LIST_FAIL,
    GALLERY_LIST_REQUEST,
    GALLERY_LIST_SUCCESS,
  } from "../constants/galleryConstants";
  
  export const galleryListReducer = (state = { gallery: [] }, action) => {
    switch (action.type) {
      case GALLERY_LIST_REQUEST:
        return { loading: true };
      case GALLERY_LIST_SUCCESS:
        return { loading: false, gallery: action.payload };
      case GALLERY_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const galleryCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case GALLERY_CREATE_REQUEST:
        return { loading: true };
      case GALLERY_CREATE_SUCCESS:
        return { loading: false, success: true };
      case GALLERY_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const galleryDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case GALLERY_DELETE_REQUEST:
        return { loading: true };
      case GALLERY_DELETE_SUCCESS:
        return { loading: false, success: true };
      case GALLERY_DELETE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };