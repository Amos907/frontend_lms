import "./transactions.css";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getC2BTransactionsAsync } from "../../features/transactionSlice";
import { LineStyle, Storefront, AttachMoney, Report } from "@material-ui/icons";

import MoneyIcon from "@mui/icons-material/Money";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "../../components/img/logo.jpg";
import loginSlice from "../../features/loginSlice";
import { useHistory } from "react-router";

export default function C2B() {
  const history = useHistory();
  const handleLogout = () => {
    dispatch(loginSlice.actions.setLogout());
    history.push("/auth/login/");
  };
  const transactions = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getC2BTransactionsAsync());
  }, [dispatch]);

  const Label = ({ type }) => {
    return <label className={"widgetLgButton " + type}>{type}</label>;
  };

  const columns = [
    { field: "id", headerName: "Id", width: 100 },
    {
      field: "mpesa",
      headerName: "Mpesa Code",
      width: 200,
    },

    {
      field: "name",
      headerName: "Name",
      width: 210,
    },

    {
      field: "amount",
      headerName: "Amount",
      width: 200,
    },

    {
      field: "phone_number",
      headerName: "Phone Number",
      width: 170,
    },

    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: () => {
        return (
          <>
            <Label type="Approved" />
          </>
        );
      },
    },
  ];

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
      <div className="col-md-9 userList">
        <div className="d-flex">
          <h3 className="">Client to Business Transactions (in) </h3>
          <div className="mholder">
            <Link to={"/new-c2b-transaction"} className="">
              <button id="new" className="btn btn-success">
                New C2B Transaction
              </button>
            </Link>
          </div>
        </div>
        <DataGrid
          rows={transactions}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          //checkboxSelection
        />
      </div>
    </div>
  );
}
