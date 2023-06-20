import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  node: [],
};

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNotes: (state, action) => {
      state.node = [...state.node, action.payload];
    },
    deleteNotes: (state, action) => {
      state.node = state.node.filter((e) => e.title !== action.payload);
    },
    update: (state, action) => {
      // const index = action.payload.i
      // state.node[index] = action.payload.e;
      for (let note of state.node) {
        if (note.id === action.payload.id) {
          note.title = action.payload.title;
          note.content = action.payload.content;
        }
      }
      // console.log(action.payload)
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNotes, deleteNotes, update } = noteSlice.actions;

export default noteSlice.reducer;
