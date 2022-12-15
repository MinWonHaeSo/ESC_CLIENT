import { SearchStadiumContent, stadiumApi } from '../api/stadiumApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface stadiumDetailState {
  searchResults: SearchStadiumContent[];
  markerInfo: SearchStadiumContent;
}

const initialState: stadiumDetailState = {
  searchResults: [],
  markerInfo: {} as SearchStadiumContent,
};

export const stadiumDetailSlice = createSlice({
  name: 'stadiumDetail',
  initialState,
  reducers: {
    clearDetail: () => initialState,
  },
  extraReducers: builder => {
    builder.addMatcher(stadiumApi.endpoints.searchStadium.matchFulfilled, (state, { payload }) => {
      state.searchResults = payload.content;
    });
  },
});

export const { clearDetail } = stadiumDetailSlice.actions;

export const stadiumDetailReducer = stadiumDetailSlice.reducer;
