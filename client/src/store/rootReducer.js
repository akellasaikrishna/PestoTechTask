import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storageSession from "redux-persist/lib/storage/session";
import TasksSlice from "./Tasks.slice";

const rootReducer = combineReducers({
  tasks: TasksSlice,
});

export default rootReducer;
