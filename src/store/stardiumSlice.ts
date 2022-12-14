import { SearchStadiumContent, stardiumApi } from './../api/stardiumApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface stardiumState {
  searchResults: SearchStadiumContent[];
  markerInfo: SearchStadiumContent;
}

const initialState: stardiumState = {
  searchResults: [],
  markerInfo: {} as SearchStadiumContent,
};

export const staridumSlice = createSlice({
  name: 'stardium',
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
    builder.addMatcher(
      stardiumApi.endpoints.searchStadium.matchFulfilled, (state, { payload }) => {
        state.searchResults = payload.content
    })
  },
});

export const { clickMarker, clearMarkerInfo } = staridumSlice.actions;

export const stardiumReducer = staridumSlice.reducer;
