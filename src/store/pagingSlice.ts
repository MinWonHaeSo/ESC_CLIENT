import { ReservationStatus, stadiumApi } from '@/api/stadiumApi';
import { RentalStadiumType } from '@/types/stadiumType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StatdiumData extends RentalStadiumType {
  like?: boolean;
}

interface pagingState {
  content: StatdiumData[];
  currentPage: number;
  nextPage: number;
  totalPage: number;
  totalElements: number;
  isLast: boolean;
  type: string;
}

const pagingDispatch = (state: pagingState, payload: any) => {
  state.content = [...state.content, ...payload.content];
  state.currentPage = payload.number;
  state.nextPage = payload.number + 1;
  state.totalPage = payload.totalPages;
  state.totalElements = payload.totalElements;
  state.isLast = payload.last;
};

const initialState: pagingState = {
  content: [],
  currentPage: 0,
  nextPage: 0,
  totalPage: 0,
  totalElements: 0,
  isLast: false,
  type: '',
};

export const pagingSlice = createSlice({
  name: 'paging',
  initialState,
  reducers: {
    changeStatus: (state, action: PayloadAction<{ id: string; status: ReservationStatus }>) => {
      const findIdx = state.content.findIndex(item => item.reservationId === action.payload.id);
      state.content[findIdx].status = action.payload.status;
    },
    removeStadium: (state, action: PayloadAction<{ id: string }>) => {
      const findIdx = state.content.findIndex(item => item.reservationId === action.payload.id);
      state.totalElements = state.totalElements - 1;
      console.log(findIdx);
      state.content.splice(findIdx, 1);
    },
    toggleLike: (state, action: PayloadAction<{ id: string }>) => {
      const findIdx = state.content.findIndex(item => item.stadiumId === action.payload.id);
      state.content.splice(findIdx, 1);
    },
    clearPaging: () => initialState,
  },
  extraReducers: builder => {
    builder.addMatcher(stadiumApi.endpoints.getStadiumManagerList.matchFulfilled, (state, { payload }) => {
      pagingDispatch(state, payload);
      state.type = 'managerStadiumList';
    });
    builder.addMatcher(stadiumApi.endpoints.getMoreStadiumManagerList.matchFulfilled, (state, { payload }) => {
      pagingDispatch(state, payload);
      state.type = 'managerStadiumList';
    });
    builder.addMatcher(stadiumApi.endpoints.getRentalStadiumList.matchFulfilled, (state, { payload }) => {
      pagingDispatch(state, payload);
      state.type = 'rentalStadiumList';
    });
    builder.addMatcher(stadiumApi.endpoints.getMoreRentalStadiumList.matchFulfilled, (state, { payload }) => {
      pagingDispatch(state, payload);
      state.type = 'rentalStadiumList';
    });
    builder.addMatcher(stadiumApi.endpoints.getLikeStadiumList.matchFulfilled, (state, { payload }) => {
      pagingDispatch(state, payload);
      state.type = 'likeStadiumList';
    });
    builder.addMatcher(stadiumApi.endpoints.getMoreLikeStadiumList.matchFulfilled, (state, { payload }) => {
      pagingDispatch(state, payload);
      state.type = 'likeStadiumList';
    });
  },
});

export const { changeStatus, removeStadium, toggleLike, clearPaging } = pagingSlice.actions;

export const pagingReducer = pagingSlice.reducer;
