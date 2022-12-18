import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface stadiumReviewState {
  comment: string;
  star: number;
}

const initialState: stadiumReviewState = {
  comment: '',
  star: 5,
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
});

export const { changeComment, changeStar, clearReview } = stadiumReviewSlice.actions;

export const stadiumReviewReducer = stadiumReviewSlice.reducer;
