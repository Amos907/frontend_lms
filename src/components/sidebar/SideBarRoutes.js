import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../../pages/home/Home";
import ProductList from "../../pages/loanProducts/LoanProducts";
import LoanList from "../../pages/loans/LoanList";
import B2C from "../../pages/transactions/B2C";
import C2B from "../../pages/transactions/C2B";
import NewLoan from "../../pages/loans/NewLoan";
import NewProduct from "../../pages/loanProducts/NewProduct";
import NewB2C from "../../pages/transactions/NewB2C";
import NewC2B from "../../pages/transactions/NewC2B";
import PaymentsToday from "../../pages/paymentTracker/PaymentsToday";
import Sidebar from "./Sidebar";
import AllOverdue from "../../pages/paymentTracker/AllOverdue";
const SideBarRoutes = () => (
  <Router>
    <Sidebar />
    <Switch>
      <ProtectedRoute exact path="/">
        <Home />
      </ProtectedRoute>

      <ProtectedRoute path="/loan-products">
        <ProductList />
      </ProtectedRoute>

      <ProtectedRoute path="/all-loans">
        <LoanList />
      </ProtectedRoute>

      <ProtectedRoute path="/transactions-c2b">
        <C2B />
      </ProtectedRoute>

      <ProtectedRoute path="/transactions-b2c">
        <B2C />
      </ProtectedRoute>

      <ProtectedRoute path="/new-loan">
        <NewLoan />
      </ProtectedRoute>

      <ProtectedRoute path="/new-loan-product">
        <NewProduct />
      </ProtectedRoute>

      <ProtectedRoute path={"/new-b2c-transaction"}>
        <NewB2C />
      </ProtectedRoute>

      <ProtectedRoute path={"/new-c2b-transaction"}>
        <NewC2B />
      </ProtectedRoute>

      <ProtectedRoute path={"/overdue-payments"}>
        <AllOverdue />
      </ProtectedRoute>

      <ProtectedRoute path={"/payments-due-today"}>
        <PaymentsToday />
      </ProtectedRoute>
    </Switch>
  </Router>
);

export default SideBarRoutes;
