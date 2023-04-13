import {
    GALLERY_CREATE_FAIL,
    GALLERY_CREATE_REQUEST,
    GALLERY_CREATE_SUCCESS,
    GALLERY_DELETE_FAIL,
    GALLERY_DELETE_REQUEST,
    GALLERY_DELETE_SUCCESS,
    GALLERY_LIST_FAIL,
    GALLERY_LIST_REQUEST,
    GALLERY_LIST_SUCCESS
  } from "../constants/galleryConstants";
  import axios from "axios";
  
  const uri = "https://foss-backend.onrender.com/api/gallery/";
  // const uri = "http://localhost:5000/api/gallery/";
  
  export const listGallery = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: GALLERY_LIST_REQUEST,
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
        type: GALLERY_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: GALLERY_LIST_FAIL,
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
        type: GALLERY_CREATE_REQUEST,
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
      console.log(pic);
  
      const { data } = await axios.post(
        uri,
        { pic },
        config
      );
  
      dispatch({
        type: GALLERY_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: GALLERY_CREATE_FAIL,
        payload: message,
      });
    }
  };
  
  export const deletePictureAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GALLERY_DELETE_REQUEST,
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
        type: GALLERY_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: GALLERY_DELETE_FAIL,
        payload: message,
      });
    }
  };