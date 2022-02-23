import "./newLoan.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addLoanAsync } from "../../features/loanSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import { LineStyle, Storefront, AttachMoney, Report } from "@material-ui/icons";

import MoneyIcon from "@mui/icons-material/Money";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "../../components/img/logo.jpg";
import loginSlice from "../../features/loginSlice";
import { useHistory } from "react-router";

export default function NewLoan() {
  const history = useHistory();
  const handleLogout = () => {
    dispatch(loginSlice.actions.setLogout());
    history.push("/auth/login/");
  };
  const [loan_plan, setPlan] = useState();
  const [id_number, setId] = useState(0);
  const [amount, setAmount] = useState(0);
  const [first_name, setFirst] = useState();
  const [last_name, setLast] = useState();
  const [installment, setInstallment] = useState(0);
  const dispatch = useDispatch();

  const fullName = (first, last) => {
    return first + " " + last;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      loan_plan ||
      id_number ||
      first_name ||
      last_name ||
      amount ||
      installment != null
    ) {
      if (id_number.length !== 8) {
        alert("Incorect ID Number Passed");
      } else {
        dispatch(
          addLoanAsync({
            id_number: id_number,
            loan_plan: loan_plan,
            amount: amount,
            full_name: fullName(first_name, last_name),
            installment: installment,
          })
        )
          .then(unwrapResult)
          .then(() => {
            alert("Loan Created Successfully.");
          })
          .catch(() => {
            alert("Loan Creation Failed");
          });
      }
    } else {
      alert("Fill all Values");
    }
  };
  return (
    <div className="row">
      <div className="col-md-3 sidebar">
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <img alt="logo" className="comp_logo" src={Logo}></img>
            <h3 className="sidebarTitle">Home</h3>
            <ul className="sidebarList">
              <Link to="/" className="link">
                <li className="sidebarListItem active">
                  <LineStyle className="sidebarIcon" />
                  Dashboard
                </li>
              </Link>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Transactions</h3>
            <ul className="sidebarList">
              <Link to="/transactions-b2c" className="link">
                <li className="sidebarListItem">
                  <CallMadeIcon className="sidebarIcon" />
                  Business To Client
                </li>
              </Link>
              <Link to="/transactions-c2b" className="link">
                <li className="sidebarListItem">
                  <CallReceivedIcon className="sidebarIcon" />
                  Client To Business
                </li>
              </Link>
            </ul>
          </div>

          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Loans</h3>
            <ul className="sidebarList">
              <Link to="all-Loans" className="link">
                <li className="sidebarListItem">
                  <MoneyIcon className="sidebarIcon" />
                  All Loans
                </li>
              </Link>

              <Link to="/loan-products" className="link">
                <li className="sidebarListItem">
                  <AttachMoney className="sidebarIcon" />
                  Loan Products
                </li>
              </Link>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Reports</h3>
            <ul className="sidebarList">
              <Link to="/overdue-payments" className="link">
                <li className="sidebarListItem">
                  <Report className="sidebarIcon" />
                  All overdue Loans
                </li>
              </Link>
              <Link to="/payments-due-today" className="link">
                <li className="sidebarListItem">
                  <Storefront className="sidebarIcon" />
                  Payments due today
                </li>
              </Link>
            </ul>
          </div>

          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Logout</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem" onClick={handleLogout}>
                <LogoutIcon className="sidebarIcon" />
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="col-md-9 newUser">
        <h1 className="newUserTitle">New Loan</h1>
        <form className="newUserForm" onSubmit={onSubmit}>
          <div className="newUserItem">
            <label>National Id Number</label>
            <input
              value={id_number}
              onChange={(e) => setId(e.target.value)}
              type="text"
              placeholder="01234567"
            />
          </div>

          <div className="newUserItem">
            <label>First Name</label>
            <input
              value={first_name}
              onChange={(e) => setFirst(e.target.value)}
              type="text"
            />
          </div>

          <div className="newUserItem">
            <label>Last Name</label>
            <input
              value={last_name}
              onChange={(e) => setLast(e.target.value)}
              type="text"
            />
          </div>

          <div className="newUserItem">
            <label>Loan Amount</label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="text"
              placeholder="10000"
            />
          </div>

          <div className="newUserItem">
            <label>Payment Plan</label>
            <select
              className="newUserSelect"
              name="active"
              id="active"
              value={loan_plan}
              onChange={(e) => setPlan(e.target.value)}
            >
              <option value="4 Weeks">4 Week Plan</option>
              <option value="5 Weeks">5 Week Plan</option>
              <option value="7 Weeks">7 Week Plan</option>
              <option value="8 Weeks">8 Week Plan</option>
              <option value="10 Weeks">10 Week Plan</option>
            </select>
          </div>

          <div className="newUserItem">
            <label>Weekly Installments</label>
            <input
              value={installment}
              onChange={(e) => setInstallment(e.target.value)}
              type="text"
            />
          </div>

          <button className="newUserButton">Create</button>
        </form>
      </div>
    </div>
  );
}
