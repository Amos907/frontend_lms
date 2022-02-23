import "./newTransaction.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addC2BTransactionsAsync } from "../../features/transactionSlice";
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

export default function NewC2B() {
  const history = useHistory();
  const handleLogout = () => {
    dispatch(loginSlice.actions.setLogout());
    history.push("/auth/login/");
  };
  const [mpesa_code, setCode] = useState();
  const [first_name, setFirst] = useState();
  const [last_name, setLast] = useState();
  const [amount, setAmount] = useState();
  const [phone_number, setPhone] = useState();
  const [id_number, setId] = useState();
  const [week, setWeek] = useState();
  const dispatch = useDispatch();

  const fullName = (first, last) => {
    return first + " " + last;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      first_name ||
      mpesa_code ||
      last_name ||
      phone_number ||
      amount != null
    ) {
      if (mpesa_code.length !== 10) {
        alert("Incorect Mpsea Code");
      } else {
        dispatch(
          addC2BTransactionsAsync({
            mpesa_code: mpesa_code,
            full_name: id_number,
            name: fullName(first_name, last_name),
            amount: amount,
            phone_number: phone_number,
            week: week,
          })
        )
          .then(unwrapResult)
          .then(() => {
            alert("New C2B Transaction Added Successfully!");
          })
          .catch(() => {
            alert("Unable to add transaction!");
          });
      }
    } else {
      alert("Fill Missing Values");
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
        <h1 className="newUserTitle">New C2B Transaction</h1>
        <form className="newUserForm" onSubmit={onSubmit}>
          <div className="newUserItem">
            <label>Mpesa Code</label>
            <input
              value={mpesa_code}
              onChange={(e) => setCode(e.target.value)}
              type="text"
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
            <label>Id Number</label>
            <input
              value={id_number}
              onChange={(e) => setId(e.target.value)}
              type="text"
            />
          </div>

          <div className="newUserItem">
            <label>Amount</label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="text"
            />
          </div>

          <div className="newUserItem">
            <label>Payment Plan</label>
            <select
              className="newUserSelect"
              name="active"
              id="active"
              value={week}
              onChange={(e) => setWeek(e.target.value)}
            >
              <option value="week 1">Week 1</option>
              <option value="week 2">Week 2</option>
              <option value="week 3">Week 3</option>
              <option value="week 4">week 4</option>
              <option value="week 5">week 5</option>
              <option value="week 6">Week 6</option>
              <option value="week 7">Week 7</option>
              <option value="week 8">Week 8</option>
              <option value="week 9">week 9</option>
              <option value="week 10">week 10</option>
            </select>
          </div>

          <div className="newUserItem">
            <label>Phone Number</label>
            <input
              value={phone_number}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
            />
          </div>

          <button className="newUserButton">Create</button>
        </form>
      </div>
    </div>
  );
}
