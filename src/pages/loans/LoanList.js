import "./loanList.css";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLoansAsync } from "../../features/loanSlice";
import { LineStyle, Storefront, AttachMoney, Report } from "@material-ui/icons";

import MoneyIcon from "@mui/icons-material/Money";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "../../components/img/logo.jpg";
import loginSlice from "../../features/loginSlice";
import { useHistory } from "react-router";
export default function LoanList() {
  const history = useHistory();
  const handleLogout = () => {
    dispatch(loginSlice.actions.setLogout());
    history.push("/auth/login/");
  };
  const Label = ({ type }) => {
    return <label className={"widgetLgButton " + type}>{type}</label>;
  };
  const loans = useSelector((state) => state.loans);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoansAsync());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Loan Id", width: 130 },
    {
      field: "user",
      headerName: "Id Number",
      width: 150,
    },

    {
      field: "full_name",
      headerName: "Name",
      width: 150,
    },

    {
      field: "loan_amount",
      headerName: "Loan Amount",
      width: 170,
    },

    {
      field: "payment_plan",
      headerName: "Payment Plan",
      width: 180,
    },

    {
      field: "installment",
      headerName: "Installments",
      width: 175,
    },

    {
      field: "date",
      headerName: "Disbursed Date",
      width: 170,
    },

    {
      field: "overdue_amount",
      headerName: "Amount Overdue",
      width: 170,
    },

    {
      field: "total_balance",
      headerName: "Balance",
      width: 170,
    },

    {
      field: "complete",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        if (params.row.status === "True") {
          return (
            <>
              <Label type="Cleared" />
            </>
          );
        }
        return (
          <>
            <Label type="Pending" />
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
          <h3 className="">All Loans</h3>
          <div className="mholder">
            <Link to={"/new-loan"} className="">
              <button id="new" className="btn btn-success">
                New Loan
              </button>
            </Link>
          </div>
        </div>
        <DataGrid
          rows={loans}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          //checkboxSelection
        />
      </div>
    </div>
  );
}
