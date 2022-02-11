import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getLoansAsync = createAsyncThunk(
  "loans/getLoansAsync",
  async () => {
    const resp = await fetch("http://localhost:8000/all-loans/loans/");
    if (resp.ok) {
      const loans = await resp.json();
      return { loans };
    }
  }
);

export const addLoanAsync = createAsyncThunk(
  "loans/addLoanAsync",
  async (payload) => {
    const resp = await fetch("http://localhost:8000/all-loans/loans/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: payload.id_number,
        full_name: payload.full_name,
        payment_plan: payload.loan_plan,
        loan_amount: payload.amount,
        installment: payload.installment,
        initial_installment: payload.installment,
      }),
    });

    if (resp.ok) {
      const loan = await resp.json();
      return { loan };
    }
  }
);

export const getLoanTypesAsync = createAsyncThunk(
  "loan-types/getLoanTypesAsync",
  async () => {
    const resp = await fetch("http://localhost:8000/all-loans/loan-products/");
    if (resp.ok) {
      const loan_types = await resp.json();
      return { loan_types };
    }
  }
);

export const addLoanTypeAsync = createAsyncThunk(
  "loan-types/addLoanTypeAsync",
  async (payload) => {
    const resp = await fetch("http://localhost:8000/all-loans/loan-products/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        loan_amount: payload.loan_amount,
        four_weeks: payload.four_weeks,
        five_weeks: payload.five_weeks,
        seven_weeks: payload.seven_weeks,
        eight_weeks: payload.eight_weeks,
        ten_weeks: payload.ten_weeks,
      }),
    });

    if (resp.ok) {
      const loan_type = await resp.json();
      return { loan_type };
    }
  }
);

export const deleteLoanTypeAsync = createAsyncThunk(
  "loan-types/deleteLoanTypeAsync",
  async (payload) => {
    const res = await fetch(
      "http://localhost:8000/all-loans/loan-products/delete/" + payload.id,
      {
        mode: "no-cors",
        method: "DELETE",
      }
    );

    if (res.ok) {
      return { id: payload.id };
    }
  }
);

export const loanSlice = createSlice({
  name: "loans",
  initialState: [],
  reducers: {},

  extraReducers: {
    [getLoansAsync.fulfilled]: (state, action) => {
      return action.payload.loans;
    },

    [addLoanAsync.fulfilled]: (state, action) => {
      state.push(action.payload.loan);
    },

    [getLoanTypesAsync.fulfilled]: (state, action) => {
      return action.payload.loan_types;
    },

    [addLoanTypeAsync.fulfilled]: (state, action) => {
      state.push(action.payload.loan_type);
    },

    [deleteLoanTypeAsync.fulfilled]: (state, action) => {
      return state.filter((loan_type) => loan_type.id !== action.payload.id);
    },
  },
});

export default loanSlice.reducer;
