import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  applications: [],
  application: [],
  task:[],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // allow changing of mode from light to dark vice versa
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setApplications: (state, action) => {
      if (state.applications.length === 0) {
        state.applications = action.payload.applications;
      } else {
        state.applications = [
          ...state.applications,
          action.payload.applications,
        ];
      }
    },
    setApplication: (state, action) => {
      state.applications = action.payload.applications;
    },
    setOneApplication: (state, action) => {
      state.application = action.payload.application;
    },
    delApplications: (state, action) => {
      const delAppIds = action.payload.applications; // Assuming action.payload.applications is an array of _id values
      state.applications = state.applications.filter(
        (application) => !delAppIds.includes(application._id)
      );
    },
    setTask: (state, action) => {
      state.task = action.payload.task;
    },
  }
  ,
});

export const {
  setMode,
  setLogin,
  setLogout,
  setApplications,
  setApplication,
  setOneApplication,
  delApplications,
  setTask,
} = authSlice.actions;

export default authSlice.reducer;
