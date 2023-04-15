import {
    MEMBERS_GALLERY_CREATE_FAIL,
    MEMBERS_GALLERY_CREATE_REQUEST,
    MEMBERS_GALLERY_CREATE_SUCCESS,
    MEMBERS_GALLERY_DELETE_FAIL,
    MEMBERS_GALLERY_DELETE_REQUEST,
    MEMBERS_GALLERY_DELETE_SUCCESS,
    MEMBERS_GALLERY_LIST_FAIL,
    MEMBERS_GALLERY_LIST_REQUEST,
    MEMBERS_GALLERY_LIST_SUCCESS,
  } from "../constants/membersGalleryConstants";
  
  export const membersGalleryListReducer = (state = { membersGallery: [] }, action) => {
    switch (action.type) {
      case MEMBERS_GALLERY_LIST_REQUEST:
        return { loading: true };
      case MEMBERS_GALLERY_LIST_SUCCESS:
        return { loading: false, membersGallery: action.payload };
      case MEMBERS_GALLERY_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const membersGalleryCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case MEMBERS_GALLERY_CREATE_REQUEST:
        return { loading: true };
      case MEMBERS_GALLERY_CREATE_SUCCESS:
        return { loading: false, success: true };
      case MEMBERS_GALLERY_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const membersGalleryDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case MEMBERS_GALLERY_DELETE_REQUEST:
        return { loading: true };
      case MEMBERS_GALLERY_DELETE_SUCCESS:
        return { loading: false, success: true };
      case MEMBERS_GALLERY_DELETE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };