import { createSlice } from '@reduxjs/toolkit';
import { ReviewsSlice } from './type';
import { FetchStatus, NameSpace } from '../../../const';
import { getReviewsThunk, postReviewThunk } from './reviews.thunks';

const initialState: ReviewsSlice = {
  reviews: [],
  postStatus: FetchStatus.Idle
};

export const reviewsProcess = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviewsThunk.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(postReviewThunk.pending, (state) => {
        state.postStatus = FetchStatus.Pending;
      })
      .addCase(postReviewThunk.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.postStatus = FetchStatus.Fullfilled;
      })
      .addCase(postReviewThunk.rejected, (state) => {
        state.postStatus = FetchStatus.Rejected;
      });
  }
});
