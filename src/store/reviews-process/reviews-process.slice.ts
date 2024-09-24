import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { getReviewsThunk } from '../extra/offers-actions';
import { ReviewsProcess } from '../../types/state';

const initialState: ReviewsProcess = {
  reviews: []
};

export const reviewsProcess = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviewsThunk.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  }
});
