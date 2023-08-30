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
    setLogout: () => initialState,
    setApplications: (state, action) => {
      const newApplications = action.payload.applications.filter(
        (newApp) => !state.applications.some((app) => app._id === newApp._id)
      );

      if (state.applications.length === 0) {
        state.applications = newApplications;
      } else {
        state.applications = [
          ...state.applications,
          ...newApplications,
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
  },
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
