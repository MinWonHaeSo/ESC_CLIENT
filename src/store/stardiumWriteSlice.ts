import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type tagType = { id: number; name: string };

export type rentalItemType = { id: number; img: string; name: string; price: number; description: string };

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
  rentalItems: rentalItemType[];

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
  rentalItems: [],
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
    removeImage: (state, action: PayloadAction<number>) => {},
    changeAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
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
    clearStardiumWrite: () => initialState,
  },
});

export const { clearStardiumWrite, changeFiled, addImages, removeImage, changeAddress, addTags, removeTags, changeTimes } =
  staridumWriteSlice.actions;

export const stardiumWriteReducer = staridumWriteSlice.reducer;
