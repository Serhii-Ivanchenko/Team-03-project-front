import { createAsyncThunk } from "@reduxjs/toolkit";
import {axiosInstance} from '../../services/api.js'

// Операція для додвання порції води в поточний день
export const addWaterItem = createAsyncThunk(
  "water/addWaterItem",
  async ({ newWaterItem, selectedDate }, thunkAPI) => {
    try {
     const response = await axiosInstance.post("/water", {
       ...newWaterItem,
       date: selectedDate,
     });
      console.log('response data after addWater', response.data);
      
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Операція для видалення порції води
export const deleteWaterItem = createAsyncThunk(
  "water/deleteItem",
  async (waterItemId, thunkAPI) => {
    try {
      await axiosInstance.delete(`/water/${waterItemId}`);
      
      return { id: waterItemId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Операція для редагування порції води
export const editWaterItem = createAsyncThunk(
  "water/editWaterItem",
  async (waterItemToEdit, thunkAPI) => {
    try {
      const { waterItemId, ...waterItemWithoutId } = waterItemToEdit;

      const response = await axiosInstance.patch(
        `/water/${waterItemId}`,
        waterItemWithoutId
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Операція для отримання даних за поточний день
// export const getDayWater = createAsyncThunk(
//   "water/getDayWater",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axiosInstance.get("/water/day");      
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// Операція для отримання даних за конкретну дату
export const getDayWaterByDate = createAsyncThunk(
  "water/getDayWaterByDate",
  async (date, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/water/day/${date}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Операція для отримання даних за поточний місяць
// export const getMonthWater = createAsyncThunk(
//   "water/getMonthWater",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axiosInstance.get("/water/month");
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// Операція для отримання даних за конкретний місяць
export const getMonthWaterByMonth = createAsyncThunk(
  "water/getMonthWaterByMonth",
  async (month, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`water/month/${month}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
