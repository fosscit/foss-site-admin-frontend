import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  eventCreateReducer,
  eventDeleteReducer,
  eventListReducer,
  eventUpdateReducer,
} from "./reducers/eventsReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
  userListReducer,
  userDeleteReducer
} from "./reducers/userReducers";

const reducer = combineReducers({
  eventList: eventListReducer,
  userList: userListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  eventCreate: eventCreateReducer,
  eventDelete: eventDeleteReducer,
  userDelete: userDeleteReducer,
  eventUpdate: eventUpdateReducer,
  userUpdate: userUpdateReducer,
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
