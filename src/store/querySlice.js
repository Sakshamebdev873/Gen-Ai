import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentQuery: '',
  queryHistory: [],
  isLoading: false,
  error: null,
  results: null,
  suggestions: [
    'Show me sales trends for last quarter',
    'Compare revenue by region',
    'What are the top performing products?',
    'Analyze customer satisfaction scores'
  ]
};

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setCurrentQuery: (state, action) => {
      state.currentQuery = action.payload;
    },
    addToHistory: (state, action) => {
      state.queryHistory.unshift(action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    }
  }
});

export const { setCurrentQuery, addToHistory, setLoading, setError, setResults } = querySlice.actions;
export default querySlice.reducer;