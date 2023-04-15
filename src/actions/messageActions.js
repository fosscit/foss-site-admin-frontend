import {
    MESSAGE_DELETE_FAIL,
    MESSAGE_DELETE_REQUEST,
    MESSAGE_DELETE_SUCCESS,
    MESSAGE_LIST_FAIL,
    MESSAGE_LIST_REQUEST,
    MESSAGE_LIST_SUCCESS
  } from "../constants/messageConstants";
  import axios from "axios";
  import API from "../API/api";
  
  const uri = `${API}messages/`;
  
  export const listMessages = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: MESSAGE_LIST_REQUEST,
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
        type: MESSAGE_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: MESSAGE_LIST_FAIL,
        payload: message,
      });
    }
  };
  
  export const deleteMessageAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MESSAGE_DELETE_REQUEST,
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
        type: MESSAGE_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: MESSAGE_DELETE_FAIL,
        payload: message,
      });
    }
  };