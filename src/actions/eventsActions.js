import {
  EVENTS_CREATE_FAIL,
  EVENTS_CREATE_REQUEST,
  EVENTS_CREATE_SUCCESS,
  EVENTS_DELETE_FAIL,
  EVENTS_DELETE_REQUEST,
  EVENTS_DELETE_SUCCESS,
  EVENTS_LIST_FAIL,
  EVENTS_LIST_REQUEST,
  EVENTS_LIST_SUCCESS,
  EVENTS_UPDATE_FAIL,
  EVENTS_UPDATE_REQUEST,
  EVENTS_UPDATE_SUCCESS,
} from "../constants/eventsConstants";
import axios from "axios";

const uri = "https://foss-backend.onrender.com/api/events/event/";
// const uri = "http://localhost:5000/api/events/event/";

export const listEvents = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENTS_LIST_REQUEST,
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
      type: EVENTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: EVENTS_LIST_FAIL,
      payload: message,
    });
  }
};

export const createEventAction = (title, content, category, date, time, venue, link, materials, speaker, pic, startYear, endYear) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: EVENTS_CREATE_REQUEST,
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
      `${uri}create`,
      { title, content, category, date, time, venue, link, materials, speaker, pic, startYear, endYear },
      config
    );

    dispatch({
      type: EVENTS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: EVENTS_CREATE_FAIL,
      payload: message,
    });
  }
};

export const deleteEventAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENTS_DELETE_REQUEST,
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
      type: EVENTS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: EVENTS_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateEventAction = (id, title, content, category, eventDate, time, venue, link, materials, speaker, pic, startYear, endYear) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: EVENTS_UPDATE_REQUEST,
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
      `${uri}${id}`,
      { title, content, category, eventDate, time, venue, link, materials, speaker, pic, startYear, endYear },
      config
    );

    dispatch({
      type: EVENTS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: EVENTS_UPDATE_FAIL,
      payload: message,
    });
  }
};
