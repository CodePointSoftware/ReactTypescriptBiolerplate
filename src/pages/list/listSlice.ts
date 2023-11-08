import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk('list/fetchData', async () => {
  try {
    const response = await fetch('https://swapi.dev/api/people');
    const data = await response.json();
    return data.results;
  } catch (err) {
    throw new Error('Error fetching data');
    }
});

const listSlice = createSlice({
  name: 'list',
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  reducers: {
    getDataStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getDataSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    },
  getDataError: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
},
});
      
  export const { getDataStart, getDataSuccess, getDataError } = listSlice.actions;
  export default listSlice.reducer;
