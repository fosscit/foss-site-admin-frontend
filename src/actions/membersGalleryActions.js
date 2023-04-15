import {
    MEMBERS_GALLERY_CREATE_FAIL,
    MEMBERS_GALLERY_CREATE_REQUEST,
    MEMBERS_GALLERY_CREATE_SUCCESS,
    MEMBERS_GALLERY_DELETE_FAIL,
    MEMBERS_GALLERY_DELETE_REQUEST,
    MEMBERS_GALLERY_DELETE_SUCCESS,
    MEMBERS_GALLERY_LIST_FAIL,
    MEMBERS_GALLERY_LIST_REQUEST,
    MEMBERS_GALLERY_LIST_SUCCESS
  } from "../constants/membersGalleryConstants";
  import axios from "axios";
  import API from "../API/api";
  
  const uri = `${API}membersgallery/`;
  
  export const listGallery = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBERS_GALLERY_LIST_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(uri, config);
  
      dispatch({
        type: MEMBERS_GALLERY_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: MEMBERS_GALLERY_LIST_FAIL,
        payload: message,
      });
    }
  };
  
  export const createPictureAction = (pic) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: MEMBERS_GALLERY_CREATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(
        uri,
        { pic },
        config
      );
  
      dispatch({
        type: MEMBERS_GALLERY_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: MEMBERS_GALLERY_CREATE_FAIL,
        payload: message,
      });
    }
  };
  
  export const deletePictureAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBERS_GALLERY_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.delete(`${uri}${id}`, config);
  
      dispatch({
        type: MEMBERS_GALLERY_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: MEMBERS_GALLERY_DELETE_FAIL,
        payload: message,
      });
    }
  };