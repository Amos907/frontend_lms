import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getC2BTransactionsAsync = createAsyncThunk(
  "payments/getC2BTransactionsAsync",
  async () => {
    const resp = await fetch(
      "https://lms-api-testing.herokuapp.com/payments/c2b/"
    );
    if (resp.ok) {
      const C2BTransactions = await resp.json();
      return { C2BTransactions };
    }
  }
);

export const addC2BTransactionsAsync = createAsyncThunk(
  "payments/addC2BTransactionsAsync",
  async (payload) => {
    const res = await fetch(
      "https://lms-api-testing.herokuapp.com/payments/c2b/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mpesa: payload.mpesa_code,
          full_name: payload.full_name,
          name: payload.name,
          amount: payload.amount,
          phone_number: payload.phone_number,
          week: payload.week,
        }),
      }
    );

    if (res.ok) {
      const C2BTransaction = await res.json();
      return { C2BTransaction };
    }
  }
);

export const getB2CTransactionsAsync = createAsyncThunk(
  "payments/getB2CTransactionsAsync",
  async () => {
    const resp = await fetch(
      "https://lms-api-testing.herokuapp.com/payments/b2c/"
    );
    if (resp.ok) {
      const B2CTransactions = await resp.json();
      return { B2CTransactions };
    }
  }
);

export const addB2CTransactionsAsync = createAsyncThunk(
  "payments/addB2CTransactionsAsync",
  async (payload) => {
    const res = await fetch(
      "https://lms-api-testing.herokuapp.com/payments/b2c/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mpesa: payload.mpesa_code,
          full_name: payload.full_name,
          amount: payload.amount,
          phone_number: payload.phone_number,
        }),
      }
    );

    if (res.ok) {
      const B2CTransaction = await res.json();
      return { B2CTransaction };
    }
  }
);

export const transactionSlice = createSlice({
  name: "transactions",
  initialState: [],
  reducers: {},

  extraReducers: {
    [getC2BTransactionsAsync.fulfilled]: (state, action) => {
      return action.payload.C2BTransactions;
    },

    [addC2BTransactionsAsync.fulfilled]: (state, action) => {
      state.push(action.payload.C2BTransaction);
    },

    [getB2CTransactionsAsync.fulfilled]: (state, action) => {
      return action.payload.B2CTransactions;
    },

    [addB2CTransactionsAsync.fulfilled]: (state, action) => {
      state.push(action.payload.B2CTransaction);
    },
  },
});

export default transactionSlice.reducer;
