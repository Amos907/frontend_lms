import "./NewProduct.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addLoanTypeAsync } from "../../features/loanSlice";
import { unwrapResult } from "@reduxjs/toolkit";

import { LineStyle, Storefront, AttachMoney, Report } from "@material-ui/icons";

import MoneyIcon from "@mui/icons-material/Money";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import Logo from "../../components/img/logo.jpg";
import loginSlice from "../../features/loginSlice";
import { useHistory } from "react-router";

export default function NewProduct() {
  const history = useHistory();
  const handleLogout = () => {
    dispatch(loginSlice.actions.setLogout());
    history.push("/auth/login/");
  };

  const [loan_amount, setAmount] = useState();
  const [four_weeks, setFour] = useState(0);
  const [five_weeks, setFive] = useState(0);
  const [seven_weeks, setSeven] = useState(0);
  const [eight_weeks, setEight] = useState(0);
  const [ten_weeks, setTen] = useState(0);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      loan_amount ||
      four_weeks ||
      five_weeks ||
      seven_weeks ||
      eight_weeks ||
      ten_weeks != null
    ) {
      dispatch(
        addLoanTypeAsync({
          loan_amount: loan_amount,
          four_weeks: four_weeks,
          five_weeks: five_weeks,
          seven_weeks: seven_weeks,
          eight_weeks: eight_weeks,
          ten_weeks: ten_weeks,
        })
      )
        .then(unwrapResult)
        .then(() => {
          alert("Loan Product Created Successfully.");
        })
        .catch(() => {
          alert("Loan Product Creation Failed");
        });
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
        <h1 className="newUserTitle">New Loan Product</h1>
        <form className="newUserForm" onSubmit={onSubmit}>
          <div className="newUserItem">
            <label>Loan Amount</label>
            <input
              value={loan_amount}
              onChange={(e) => setAmount(e.target.value)}
              type="text"
              placeholder="10000"
            />
          </div>

          <div className="newUserItem">
            <label>4 Weeks Installment</label>
            <input
              value={four_weeks}
              onChange={(e) => setFour(e.target.value)}
              type="text"
              placeholder="100"
            />
          </div>

          <div className="newUserItem">
            <label>5 Weeks Installment</label>
            <input
              value={five_weeks}
              onChange={(e) => setFive(e.target.value)}
              type="text"
              placeholder="100"
            />
          </div>

          <div className="newUserItem">
            <label>7 Weeks Installment</label>
            <input
              value={seven_weeks}
              onChange={(e) => setSeven(e.target.value)}
              type="text"
              placeholder="100"
            />
          </div>

          <div className="newUserItem">
            <label>8 Weeks Installment</label>
            <input
              value={eight_weeks}
              onChange={(e) => setEight(e.target.value)}
              type="text"
              placeholder="100"
            />
          </div>

          <div className="newUserItem">
            <label>10 Weeks Installment</label>
            <input
              value={ten_weeks}
              onChange={(e) => setTen(e.target.value)}
              type="text"
              placeholder="100"
            />
          </div>

          <button className="newUserButton">Create</button>
        </form>
      </div>
    </div>
  );
}
