import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseUrl = "https://watertracker-app-spy2.onrender.com";

// Операція для додвання порції води в поточний день
export const addWaterItem = createAsyncThunk(
  "water/addWaterItem",
  async (newWaterItem, thunkAPI) => {
    try {
      const response = await axios.post("/water", newWaterItem);
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
      const response = await axios.delete(`/water/${waterItemId}`);
      return response.data;
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

      const response = await axios.patch(
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
export const getDayWater = createAsyncThunk(
  "water/getDayWater",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/water/day");
      console.log('getDayWater', response.data);
      
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Операція для отримання даних за конкретну дату
export const getDayWaterByDate = createAsyncThunk(
  "water/getDayWaterByDate",
  async (date, thunkAPI) => {
    try {
      const response = await axios.get(`/water/day/${date}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Операція для отримання даних за поточний місяць
export const getMonthWater = createAsyncThunk(
  "water/getMonthWater",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/water/month");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Операція для отримання даних за конкретний місяць
export const getMonthWaterByMonth = createAsyncThunk(
  "water/getMonthWaterByMonth",
  async (month, thunkAPI) => {
    try {
      const response = await axios.get(`water/month/${month}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
