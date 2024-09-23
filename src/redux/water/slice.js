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
  reducers: {
    changeActualDate: (state, action) => {
      state.items.date = action.payload;
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(addWaterItem.pending, handlePending)
      .addCase(addWaterItem.fulfilled, (state, action) => {
        state.loading = false;
        const newItem = { ...action.payload.data, id: action.payload.data._id };
        state.items.day.push(newItem);
        state.items.totalValue += action.payload.data.value;
      })
      .addCase(addWaterItem.rejected, handleRejected)
      .addCase(deleteWaterItem.pending, handlePending)
      .addCase(deleteWaterItem.fulfilled, (state, action) => {
        state.loading = false;

        const itemToDelete = state.items.day.find(
          (item) => item.id === action.payload.id
        );

        if (itemToDelete) {
          state.items.totalValue -= itemToDelete.value;
        }

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

        const updatedItem = action.payload.data;

        const dayItemIndex = state.items.day.findIndex(
          (item) => item.id === updatedItem._id
        );

        if (dayItemIndex !== -1) {
          state.items.day[dayItemIndex] = {
            ...state.items.day[dayItemIndex],
            value: updatedItem.value,
            time: updatedItem.time,
          };
        }

        const monthItemIndex = state.items.month.findIndex(
          (item) => item.id === updatedItem._id
        );

        if (monthItemIndex !== -1) {
          state.items.month[monthItemIndex] = {
            ...state.items.month[monthItemIndex],
            value: updatedItem.value,
            time: updatedItem.time,
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

export const { changeActualDate } = waterSlice.actions;

export default waterSlice.reducer;
