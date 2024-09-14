import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState.js";
import {
  addWaterItem,
  deleteWaterItem,
  editWaterItem,
  getDayWater,
  getDayWaterByDate,
  getMonthWater,
  getMonthWaterByMonth,
} from "./operations.js";
import { logOut } from "../user/operations.js";

const waterSlice = createSlice({
  name: "water",
  initialState: initialState.water,
  extraReducers: (builder) =>
    builder
      .addCase(addWaterItem.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(addWaterItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items.day.push(action.payload);
      })
      .addCase(addWaterItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteWaterItem.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(deleteWaterItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items.day = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        state.items.month = state.items.month.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(deleteWaterItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editWaterItem.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(editWaterItem.fulfilled, (state, action) => {
        state.loading = false;

        const updatedItem = action.payload;

        const dayItemIndex = state.items.day.findIndex(
          (item) => item.id === updatedItem.id
        );
        if (dayItemIndex !== -1) {
          state.waterData.day[dayItemIndex] = updatedItem;
        }

        const monthItemIndex = state.items.month.findIndex(
          (item) => item.id === updatedItem.id
        );

        if (monthItemIndex !== -1) {
          state.waterData.month[monthItemIndex] = updatedItem;
        }
      })
      .addCase(editWaterItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDayWater.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getDayWater.fulfilled, (state, action) => {
        state.loading = false;
        state.items.day = action.payload;
      })
      .addCase(getDayWater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDayWaterByDate.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getDayWaterByDate.fulfilled, (state, action) => {
        state.loading = false;
        state.items.day = action.payload;
      })
      .addCase(getDayWaterByDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMonthWater.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getMonthWater.fulfilled, (state, action) => {
        state.loading = false;
        state.items.month = action.payload;
      })
      .addCase(getMonthWater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMonthWaterByMonth.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getMonthWaterByMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.items.month = action.payload;
      })
      .addCase(getMonthWaterByMonth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.loading = false;
        state.error = null;
      }),
});

export default waterSlice.reducer;
