import { RentalItemsType, reservationApi } from '@/api/reservationApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RentalItemsToggleType extends RentalItemsType {
  toggle?: boolean;
}

export interface StadiumReservationStateData {
  headCount: number;
  items: RentalItemsToggleType[];
  paymentType: string;
  reservingDate: string;
  reservingTimes: string[];
  reservedTimes: string[];
  pricePerHalfHour: number;
}

export interface StadiumReservationState {
  id: string;
  data: StadiumReservationStateData;
  step: number;
}

const initialState: StadiumReservationState = {
  id: '0',
  data: {
    headCount: 1,
    items: [],
    paymentType: '',
    reservingDate: '',
    reservingTimes: [],
    reservedTimes: [],
    pricePerHalfHour: 0,
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
    changeCount: (state, action: PayloadAction<number>) => {
      state.data.headCount = action.payload;
    },
    toggleRentalItem: (state, action: PayloadAction<RentalItemsToggleType>) => {
      const findIdx = state.data.items.findIndex(item => item.id === action.payload.id);
      state.data.items[findIdx].toggle = !state.data.items[findIdx].toggle;
    },
    changeRentalItemCount: (state, action: PayloadAction<{ id: string; count: number }>) => {
      const findIdx = state.data.items.findIndex(item => item.id === action.payload.id);
      state.data.items[findIdx].count = action.payload.count;
    },
    setPaymentType: (state, action: PayloadAction<string>) => {
      state.data.paymentType = action.payload;
    },
    clearReservation: () => initialState,
  },
  extraReducers: builder => {
    builder.addMatcher(reservationApi.endpoints.getReservationStadiumTime.matchFulfilled, (state, { payload }) => {
      state.id = payload.stadium.id;
      state.data.items = payload.stadium.rentalItems.map(item => ({ ...item, toggle: false, count: 1 }));
      state.data.reservingDate = payload.date;
      state.data.reservingTimes = [] as string[];
      state.data.reservedTimes = payload.reservedTimes;
      state.data.pricePerHalfHour = payload.pricePerHalfHour;
    });
  },
});

export const {
  nextStep,
  selectDate,
  changeCount,
  changeRentalItemCount,
  toggleRentalItem,
  setPaymentType,
  clearReservation,
} = stadiumReservationSlice.actions;

export const stadiumReservationReducer = stadiumReservationSlice.reducer;
