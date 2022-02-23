import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getOverdueAsync = createAsyncThunk(
  "paymentsTracker/overdue",
  async () => {
    const resp = await fetch(
      "https://lms-api-testing.herokuapp.com/payments/overdue/"
    );
    if (resp.ok) {
      const overdue = await resp.json();
      return { overdue };
    }
  }
);

export const getPaymentsTodayAsync = createAsyncThunk(
  "paymentsTracker/payments-today",
  async () => {
    const resp = await fetch(
      "https://lms-api-testing.herokuapp.com/payments/payments-today/"
    );
    if (resp.ok) {
      const payments_today = await resp.json();
      return { payments_today };
    }
  }
);

export const paymentTrackerSlice = createSlice({
  name: "paymentsTracker",
  initialState: [],
  reducers: {},

  extraReducers: {
    [getOverdueAsync.fulfilled]: (state, action) => {
      return action.payload.overdue;
    },

    [getPaymentsTodayAsync.fulfilled]: (state, action) => {
      return action.payload.payments_today;
    },
  },
});

export default paymentTrackerSlice.reducer;
