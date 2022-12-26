import { ManagerListStadium, RentalStadium, stadiumApi } from '@/api/stadiumApi';
import { createSlice } from '@reduxjs/toolkit';

interface pagingState {
  content: RentalStadium[];
  currentPage: number;
  nextPage: number;
  totalPage: number;
  isLast: boolean;
}

const initialState: pagingState = {
  content: [],
  currentPage: 0,
  nextPage: 0,
  totalPage: 0,
  isLast: false,
};

export const pagingSlice = createSlice({
  name: 'stadiumReview',
  initialState,
  reducers: {
    clearPaging: () => initialState,
  },
  extraReducers: builder => {
    builder.addMatcher(stadiumApi.endpoints.getStadiumManagerList.matchFulfilled, (state, { payload }) => {
      state.content = [...state.content, ...payload.content];
      state.currentPage = payload.number;
      state.nextPage = payload.number + 1;
      state.totalPage = payload.totalPages;
      state.isLast = payload.last;
    });
  },
});

export const { clearPaging } = pagingSlice.actions;

export const pagingReducer = pagingSlice.reducer;
