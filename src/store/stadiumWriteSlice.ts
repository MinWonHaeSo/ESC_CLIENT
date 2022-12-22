import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type tagType = { id: number; name: string };

export type rentalItemType = { publicId: string; imgUrl: string; name: string; price: string };

export type imagesType = { publicId: string; imgUrl: string };

export interface stadiumWriteState {
  id: number;
  name: string;
  address: string;
  detailAddress: string;
  phone: string;
  weekdayPricePerHalfHour: string;
  holidayPricePerHalfHour: string;
  imgs: imagesType[];
  tags: string[];
  openTime: string;
  closeTime: string;
  rentalItems: rentalItemType[];
  lat: string;
  lnt: string;

  [key: string]: string | string[] | number | imagesType[] | tagType[] | rentalItemType[];
}

const initialState: stadiumWriteState = {
  id: 0,
  name: '',
  address: '',
  phone: '',
  detailAddress: '',
  weekdayPricePerHalfHour: '',
  holidayPricePerHalfHour: '',
  imgs: [],
  tags: [],
  openTime: '09:00',
  closeTime: '22:00',
  rentalItems: [],
  lat: '',
  lnt: '',
};

export const stadiumWriteSlice = createSlice({
  name: 'stadium',
  initialState,
  reducers: {
    updateStadium: (state, action: PayloadAction<stadiumWriteState>) => action.payload,
    changeFiled: (state, action: PayloadAction<{ name: string; value: string }>) => {
      state[action.payload.name] = action.payload.value;
    },
    addImages: (state, action: PayloadAction<imagesType[]>) => {
      state.imgs = action.payload;
    },
    removeImage: (state, action: PayloadAction<string>) => {
      const filterImages = state.imgs.filter(image => image.publicId !== action.payload);
      state.imgs = filterImages;
    },
    changeAddress: (state, action: PayloadAction<{ address: string; lat: string; lnt: string }>) => {
      state.address = action.payload.address;
      state.lat = action.payload.lat;
      state.lnt = action.payload.lnt;
    },
    addTags: (state, action: PayloadAction<string>) => {
      state.tags.push(action.payload);
    },
    removeTags: (state, action: PayloadAction<number>) => {
      state.tags.splice(action.payload, 1);
    },
    changeTimes: (state, action: PayloadAction<{ name: 'openTime' | 'closeTime'; time: string }>) => {
      state[action.payload.name] = action.payload.time;
    },
    addRentalItem: (state, action: PayloadAction<rentalItemType>) => {
      state.rentalItems.push(action.payload);
    },
    removeRentalItem: (state, action: PayloadAction<string>) => {
      const filterRentalItems = state.rentalItems.filter(item => item.publicId !== action.payload);
      state.rentalItems = filterRentalItems;
    },
    changeRentalItemInput: (state, action: PayloadAction<{ id: string; name: 'name' | 'price'; value: string }>) => {
      const idx = state.rentalItems.findIndex(item => item.publicId === action.payload.id);
      state.rentalItems[idx][action.payload.name] = action.payload.value;
    },
    changeRentalItemImage: (state, action: PayloadAction<{ id: string; imgUrl: string }>) => {
      const idx = state.rentalItems.findIndex(item => item.publicId === action.payload.id);
      state.rentalItems[idx].imgUrl = action.payload.imgUrl;
    },
    clearStadiumWrite: () => initialState,
  },
});

export const {
  updateStadium,
  clearStadiumWrite,
  changeFiled,
  addImages,
  removeImage,
  changeAddress,
  addTags,
  removeTags,
  changeTimes,
  addRentalItem,
  removeRentalItem,
  changeRentalItemInput,
  changeRentalItemImage,
} = stadiumWriteSlice.actions;

export const stadiumWriteReducer = stadiumWriteSlice.reducer;
