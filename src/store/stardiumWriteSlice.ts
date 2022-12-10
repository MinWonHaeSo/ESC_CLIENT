import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type tagType = { id: number; name: string };

export type rentalItemType = { id: string; img: string; name: string; price: string; [key: string] : string; };

export type imagesType = { id: number; url: string };


export interface stardiumWriteState {
  id: number;
  name: string;
  address: string;
  detailAddress: string;
  weekdayPricePerHalfHour: number;
  images: imagesType[];
  tags: string[];
  openTime: string;
  closeTime: string;
  rentalItems: rentalItemType[];
  lat: string;
  lnt: string;

  [key: string]: string | string[] | number | imagesType[] | tagType[] | rentalItemType[];
}

const initialState: stardiumWriteState = {
  id: 0,
  name: '',
  address: '',
  detailAddress: '',
  weekdayPricePerHalfHour: 0,
  images: [],
  tags: [],
  openTime: '09:00:00',
  closeTime: '22:00:00',
  rentalItems: [
    {
      id: '',
      img: '',
      name: '',
      price: '',
    },
  ],
  lat: '',
  lnt: '',
};

export const staridumWriteSlice = createSlice({
  name: 'stardium',
  initialState,
  reducers: {
    changeFiled: (state, action: PayloadAction<{ name: string; value: string }>) => {
      state[action.payload.name] = action.payload.value;
    },
    addImages: (state, action: PayloadAction<imagesType[]>) => {
      state.images = action.payload;
    },
    removeImage: (state, action: PayloadAction<number>) => {
      const filterImages = state.images.filter(image => image.id !== action.payload);
      state.images = filterImages;
    },
    changeAddress: (state, action: PayloadAction<{address: string, lat:string, lnt: string}>) => {
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
    changeTimes: (state, action: PayloadAction<{ name: 'openTime' | 'closeTime' , time : string}>) => {
      state[action.payload.name] = action.payload.time;
    },
    addRentalItem: (state, action: PayloadAction<rentalItemType>) => {
      state.rentalItems.push(action.payload);
    },
    removeRentalItem: (state, action: PayloadAction<string>) => {
      const filterRentalItems = state.rentalItems.filter(item => item.id !== action.payload);
      state.rentalItems = filterRentalItems;
    },
    changeRentalItemInput: (state, action: PayloadAction<{ id: string, name: 'name' | 'price', value: string }>) => {
      const idx = state.rentalItems.findIndex(item => item.id === action.payload.id);
      state.rentalItems[idx][action.payload.name] = action.payload.value;
    },
    changeRentalItemImage: (state, action: PayloadAction<{ id: string, url: string }>) => {
      const idx = state.rentalItems.findIndex(item => item.id === action.payload.id);
      state.rentalItems[idx].img = action.payload.url;
    },
    clearStardiumWrite: () => initialState,
  },
});

export const {
  clearStardiumWrite,
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
} = staridumWriteSlice.actions;

export const stardiumWriteReducer = staridumWriteSlice.reducer;
