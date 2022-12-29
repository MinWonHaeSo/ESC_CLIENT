import { SearchStadiumContentType, stadiumApi } from '../api/stadiumApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface stadiumState {
  searchResults: SearchStadiumContentType[];
  markerInfo: SearchStadiumContentType;
}

const initialState: stadiumState = {
  searchResults: [],
  markerInfo: {} as SearchStadiumContentType,
};

export const stadiumMarkerSlice = createSlice({
  name: 'stadiumMarker',
  initialState,
  reducers: {
    clickMarker: (state, action: PayloadAction<any>) => {
      state.markerInfo = action.payload;
    },
    clearMarkerInfo: (state, action: PayloadAction) => initialState,
  },
  extraReducers: builder => {
    builder.addMatcher(stadiumApi.endpoints.searchStadium.matchFulfilled, (state, { payload }) => {
      state.searchResults = payload.content;
    });
  },
});

export const { clickMarker, clearMarkerInfo } = stadiumMarkerSlice.actions;

export const stadiumMarkerReducer = stadiumMarkerSlice.reducer;
