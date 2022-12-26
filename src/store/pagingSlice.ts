import { ManagerListStadium, RentalStadium, stadiumApi } from '@/api/stadiumApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  name: 'paging',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<{ id: string; value: boolean }>) => {
      // const findIdx = state.content.findIndex(item => item.);
    },
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
    builder.addMatcher(stadiumApi.endpoints.getRentalStadiumList.matchFulfilled, (state, { payload }) => {
      state.content = [...state.content, ...payload.content];
      state.currentPage = payload.number;
      state.nextPage = payload.number + 1;
      state.totalPage = payload.totalPages;
      state.isLast = payload.last;
    });
    builder.addMatcher(stadiumApi.endpoints.getLikeStadiumList.matchFulfilled, (state, { payload }) => {
      console.log(payload);
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
