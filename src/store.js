import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  messageListReducer,
  messageDeleteReducer
} from "./reducers/messageReducers";
import {
  eventCreateReducer,
  eventDeleteReducer,
  eventListReducer,
  eventUpdateReducer,
} from "./reducers/eventsReducers";
import {
  userLoginReducer,
  userUpdateReducer
} from "./reducers/userReducers";
import {
  memberCreateReducer,
  memberDeleteReducer,
  memberListReducer,
  memberUpdateReducer,
} from "./reducers/memberReducers";
import {
  galleryCreateReducer,
  galleryDeleteReducer,
  galleryListReducer
} from "./reducers/galleryReducers";

const reducer = combineReducers({
  eventList: eventListReducer,
  messageList: messageListReducer,
  memberList: memberListReducer,
  galleryList: galleryListReducer,
  userLogin: userLoginReducer,
  eventCreate: eventCreateReducer,
  memberCreate: memberCreateReducer,
  pictureCreate: galleryCreateReducer,
  eventDelete: eventDeleteReducer,
  messageDelete: messageDeleteReducer,
  memberDelete: memberDeleteReducer,
  pictureDelete: galleryDeleteReducer,
  eventUpdate: eventUpdateReducer,
  userUpdate: userUpdateReducer,
  memberUpdate: memberUpdateReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
