import { SearchStadiumContent, stadiumApi } from '../api/stadiumApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface stadiumState {
  searchResults: SearchStadiumContent[];
  markerInfo: SearchStadiumContent;
}

const initialState: stadiumState = {
  searchResults: [],
  markerInfo: {} as SearchStadiumContent,
};

export const stadiumSlice = createSlice({
  name: 'stadium',
  initialState,
  reducers: {
    clickMarker: (state, action: PayloadAction<any>) => {
      state.markerInfo = action.payload;
    },
    clearMarkerInfo: (state, action: PayloadAction) => {
      // state.markerInfo = {};
    },
  },
  extraReducers: builder => {
    builder.addMatcher(stadiumApi.endpoints.searchStadium.matchFulfilled, (state, { payload }) => {
      state.searchResults = payload.content;
    });
  },
});

export const { clickMarker, clearMarkerInfo } = stadiumSlice.actions;

export const stadiumReducer = stadiumSlice.reducer;
