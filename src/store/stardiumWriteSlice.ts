import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type tagType = { id: number; name: string };

export type rentalItemType = { id: string; img: string; name: string; price: number; };

export type imagesType = { id: number; url: string };

export type timeType = { hh: number, mm: number };

export interface stardiumWriteState {
  id: number;
  name: string;
  address: string;
  detailAddress: string;
  price: number;
  images: imagesType[];
  tags: string[];
  startTime: timeType;
  endTime: timeType;
  rentalItems:  rentalItemType[];
  lat: string;
  lng: string;

  [key: string]: string | string[] | timeType | number | imagesType[] | tagType[] | rentalItemType[];
}

const initialState: stardiumWriteState = {
  id: 0,
  name: '',
  address: '',
  detailAddress: '',
  price: 0,
  images: [],
  tags: [],
  startTime: { hh: 9, mm: 0 },
  endTime: { hh: 22, mm: 0 },
  rentalItems: [
    {
      id: '',
      img: '',
      name: '',
      price: 0
    },
  ],
  lat: '',
  lng:''
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
    changeAddress: (state, action: PayloadAction<{address: string, lat:string, lng: string}>) => {
      state.address = action.payload.address;
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
    addTags: (state, action: PayloadAction<string>) => {
      state.tags.push(action.payload);
    },
    removeTags: (state, action: PayloadAction<number>) => {
      state.tags.splice(action.payload, 1);
    },
    changeTimes: (state, action: PayloadAction<{ name: 'startTime' | 'endTime' } & timeType>) => {
      state[action.payload.name].hh = action.payload.hh;
      state[action.payload.name].mm = action.payload.mm;
    },
    addRentalItem: (state, action: PayloadAction<rentalItemType>) => {
      state.rentalItems.push(action.payload);
    },
    removeRentalItem: (state, action: PayloadAction<string>) => {
      const filterRentalItems = state.rentalItems.filter(item => item.id !== action.payload);
      state.rentalItems = filterRentalItems;
    },
    changeRentalItemName: (state, action: PayloadAction<{ id: string, value: string }>) => {
      const idx = state.rentalItems.findIndex(item => item.id === action.payload.id);
      state.rentalItems[idx].name = action.payload.value;
    },
    changeRentalItemPrice: (state, action: PayloadAction<{ id: string, value: number }>) => {
      const idx = state.rentalItems.findIndex(item => item.id === action.payload.id);
      state.rentalItems[idx].price = action.payload.value;
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
  changeRentalItemName,
  changeRentalItemPrice,
  changeRentalItemImage,
} = staridumWriteSlice.actions;

export const stardiumWriteReducer = staridumWriteSlice.reducer;
