import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { SortProcess } from '../../types/state';
import { OfferSortType } from '../../types/sort';

const initialState: SortProcess = {
  type: 'none'
};

export const sortProcess = createSlice({
  name: NameSpace.Sort,
  initialState,
  reducers: {
    changeSort: (state, action: PayloadAction<OfferSortType>) => {
      state.type = action.payload;
    }
  },
});

export const { changeSort } = sortProcess.actions;
