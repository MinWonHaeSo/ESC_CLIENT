import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MemberType = 'user' | 'manager';
interface MemberTypeState {
  memberType: MemberType;
}

const initialState: MemberTypeState = {
  memberType: 'user',
};

const memberCheckSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    changeMemberType: (state, action: PayloadAction<MemberType>) => {
      state.memberType = action.payload;
    },
  },
});

export const { changeMemberType } = memberCheckSlice.actions;

export const memberTypeReducer = memberCheckSlice.reducer;
