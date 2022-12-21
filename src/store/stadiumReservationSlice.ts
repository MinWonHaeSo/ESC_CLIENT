import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type RentalItemsType = {
  count: number;
  itemId: string;
};

interface stadiumReservationState {
  data: {
    headCount: number;
    items: RentalItemsType[];
    paymentType: number;
    reservingDate: string;
    reservingTimes: string[];
  };
  step: number;
}

const initialState: stadiumReservationState = {
  data: {
    headCount: 1,
    items: [],
    paymentType: 0,
    reservingDate: '',
    reservingTimes: [],
  },
  step: 1,
};

export const stadiumReservationSlice = createSlice({
  name: 'stadiumReservation',
  initialState,
  reducers: {
    nextStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    selectDate: (state, action: PayloadAction<string>) => {
      const isInclude = state.data.reservingTimes.includes(action.payload);
      state.data.reservingTimes = isInclude
        ? state.data.reservingTimes.filter(time => time !== action.payload)
        : [...state.data.reservingTimes, action.payload];
    },
    clearReservation: () => initialState,
  },
});

export const { nextStep, selectDate, clearReservation } = stadiumReservationSlice.actions;

export const stadiumReservationReducer = stadiumReservationSlice.reducer;
