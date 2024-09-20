import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState.js";
import {
  addWaterItem,
  deleteWaterItem,
  editWaterItem,
  getDayWaterByDate,
  getMonthWaterByMonth,
} from "./operations.js";
import { logOut } from "../user/operations";
import { logoutAction } from "../user/slice.js";

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const waterSlice = createSlice({
  name: "water",
  initialState: initialState.water,
  extraReducers: (builder) =>
    builder
      .addCase(addWaterItem.pending, handlePending)
      .addCase(addWaterItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items.day.push(action.payload);
      })
      .addCase(addWaterItem.rejected, handleRejected)
      .addCase(deleteWaterItem.pending, handlePending)
      .addCase(deleteWaterItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items.day = state.items.day.filter(
          (item) => item.id !== action.payload.id
        );
        state.items.month = state.items.month.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(deleteWaterItem.rejected, handleRejected)
      .addCase(editWaterItem.pending, handlePending)
      .addCase(editWaterItem.fulfilled, (state, action) => {
        state.loading = false;

        const updatedItem = action.payload;

        const dayItemIndex = state.items.day.findIndex(
          (item) => item.id === updatedItem.id
        );

        if (dayItemIndex !== -1) {
          state.items.day[dayItemIndex] = {
            ...state.items.day[dayItemIndex],
            ...updatedItem,
          };
        }

        const monthItemIndex = state.items.month.findIndex(
          (item) => item.id === updatedItem.id
        );

        if (monthItemIndex !== -1) {
          state.waterData.month[monthItemIndex] = {
            ...state.water.items.month[monthItemIndex],
            ...updatedItem,
          };
        }
      })
      .addCase(editWaterItem.rejected, handleRejected)
      .addCase(getDayWaterByDate.pending, handlePending)
      .addCase(getDayWaterByDate.fulfilled, (state, action) => {
       
        state.items.date = action.payload.date;
        state.items.totalValue = action.payload.totalValue;
        state.loading = false;
        state.items.day = action.payload.data;
      })
      .addCase(getDayWaterByDate.rejected, handleRejected)
      .addCase(getMonthWaterByMonth.pending, handlePending)
      .addCase(getMonthWaterByMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.items.month = action.payload.data;
      })
      .addCase(getMonthWaterByMonth.rejected, handleRejected)
      .addCase(logOut.fulfilled, (state) => {
        state.items.day = [];
        state.items.month = [];
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutAction, (state) => {
        state = initialState.water;
      }),
});

export default waterSlice.reducer;
