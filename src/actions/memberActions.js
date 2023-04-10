import {
    MEMBERS_CREATE_FAIL,
    MEMBERS_CREATE_REQUEST,
    MEMBERS_CREATE_SUCCESS,
    MEMBERS_DELETE_FAIL,
    MEMBERS_DELETE_REQUEST,
    MEMBERS_DELETE_SUCCESS,
    MEMBERS_LIST_FAIL,
    MEMBERS_LIST_REQUEST,
    MEMBERS_LIST_SUCCESS,
    MEMBERS_UPDATE_FAIL,
    MEMBERS_UPDATE_REQUEST,
    MEMBERS_UPDATE_SUCCESS,
  } from "../constants/memberConstants";
  import axios from "axios";
  
  const uri = "https://foss-backend.onrender.com/api/members/";
  // const uri = "http://localhost:5000/api/members/";
  
  export const listMembers = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBERS_LIST_REQUEST,
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
        type: MEMBERS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: MEMBERS_LIST_FAIL,
        payload: message,
      });
    }
  };
  
  export const createMemberAction = ( name, email, position, department, pic, year, linkedin, startYear, endYear ) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: MEMBERS_CREATE_REQUEST,
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
        { name, email, position, department, pic, year, linkedin, startYear, endYear },
        config
      );
  
      dispatch({
        type: MEMBERS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: MEMBERS_CREATE_FAIL,
        payload: message,
      });
    }
  };
  
  export const deleteMemberAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBERS_DELETE_REQUEST,
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
        type: MEMBERS_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: MEMBERS_DELETE_FAIL,
        payload: message,
      });
    }
  };
  
  export const updateMemberAction = ( id, name, email, position, department, pic, year, linkedin, startYear, endYear ) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: MEMBERS_UPDATE_REQUEST,
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
  
      const { data } = await axios.put(
        `${uri}profile`,
        { id, name, email, position, department, pic, year, linkedin, startYear, endYear },
        config
      );
  
      dispatch({
        type: MEMBERS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: MEMBERS_UPDATE_FAIL,
        payload: message,
      });
    }
  };
  