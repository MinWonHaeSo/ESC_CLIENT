import { ContentType, reviewApi } from '@/api/reviewApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface stadiumReviewState {
  comment: string;
  star: number;
  list: ContentType[];
  currentPage: number;
  nextPage: number;
  totalPage: number;
  isLast: boolean;
}

const initialState: stadiumReviewState = {
  comment: '',
  star: 5,
  list: [],
  currentPage: 0,
  nextPage: 0,
  totalPage: 0,
  isLast: false,
};

export const stadiumReviewSlice = createSlice({
  name: 'stadiumReview',
  initialState,
  reducers: {
    changeComment: (state, action: PayloadAction<string>) => {
      state.comment = action.payload;
    },
    changeStar: (state, action: PayloadAction<number>) => {
      state.star = action.payload;
    },
    clearReview: () => initialState,
  },
  extraReducers: builder => {
    builder.addMatcher(reviewApi.endpoints.getReviewList.matchFulfilled, (state, { payload }) => {
      state.list = [...state.list, ...payload.content];
      state.currentPage = payload.number;
      state.nextPage = payload.number + 1;
      state.totalPage = payload.totalPages;
      state.isLast = payload.last;
    });
  },
});

export const { changeComment, changeStar, clearReview } = stadiumReviewSlice.actions;

export const stadiumReviewReducer = stadiumReviewSlice.reducer;
