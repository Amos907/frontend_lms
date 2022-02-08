import { configureStore } from "@reduxjs/toolkit";
import loanReducer from "../features/loanSlice";
import transactionReducer from "../features/transactionSlice";
import paymentTrackerReducer from "../features/paymentTrackerSlice";
import loginSlice from "../features/loginSlice";
export const store = configureStore({
  reducer: {
    loans: loanReducer,
    transactions: transactionReducer,
    paymentTracker: paymentTrackerReducer,
    login: loginSlice.reducer,
  },
});
