import { createSlice } from '@reduxjs/toolkit';
import { ReviewsSlice } from './type';
import { NameSpace } from '../../../const';
import { getReviewsThunk } from './reviews.thunks';

const initialState: ReviewsSlice = {
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
