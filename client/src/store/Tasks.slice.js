import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasksData(state, action) {
      state.tasks = action.payload;
    },
  },
});

export const { setTasksData } = tasksSlice.actions;

export default tasksSlice.reducer;
