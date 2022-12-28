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

    const { data } = await axios.get(`https://foss-backend.onrender.com/api/events`, config);

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

export const createEventAction = (title, content, category, date, time, venue, link, materials, speaker, pic) => async (
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
      `https://foss-backend.onrender.com/api/events/create`,
      { title, content, category, date, time, venue, link, materials, speaker, pic },
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

    const { data } = await axios.delete(`https://foss-backend.onrender.com/api/events/${id}`, config);

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

export const updateEventAction = (id, title, content, category, eventDate, time, venue, link, materials, speaker, pic) => async (
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
      `https://foss-backend.onrender.com/api/events/${id}`,
      { title, content, category, eventDate, time, venue, link, materials, speaker, pic },
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
