import "./loanProducts.css";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLoanTypesAsync } from "../../features/loanSlice";

import { LineStyle, Storefront, AttachMoney, Report } from "@material-ui/icons";

import MoneyIcon from "@mui/icons-material/Money";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "../../components/img/logo.jpg";
import loginSlice from "../../features/loginSlice";
import { useHistory } from "react-router";

export default function LoanProducts() {
  const history = useHistory();
  const handleLogout = () => {
    dispatch(loginSlice.actions.setLogout());
    history.push("/auth/login/");
  };
  const loan_types = useSelector((state) => state.loans);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoanTypesAsync());
  }, [dispatch]);

  const Label = ({ type }) => {
    return <label className={"widgetLgButton " + type}>{type}</label>;
  };

  const columns = [
    { field: "id", headerName: "Id", width: 100 },
    {
      field: "loan_amount",
      headerName: "Loan Amount",
      width: 160,
    },

    {
      field: "four_weeks",
      headerName: "4 Week Plan",
      width: 160,
    },

    {
      field: "five_weeks",
      headerName: "5 Week Plan",
      width: 160,
    },

    {
      field: "seven_weeks",
      headerName: "7 Week Plan",
      width: 160,
    },

    {
      field: "eight_weeks",
      headerName: "8 Week Plan",
      width: 160,
    },

    {
      field: "ten_weeks",
      headerName: "10 Week Plan",
      width: 160,
    },

    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        if (params.row.status === "active") {
          return (
            <>
              <Label type="Active" />
            </>
          );
        }
        return (
          <>
            <Label type="Inactive" />
          </>
        );
      },
    },

    {
      field: "num_customers",
      headerName: "Customers",
      width: 140,
    },
  ];

  return (
    <div className="row">
      <div className="sidebar">
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
          <h3 className="">Loan Products</h3>
          <div className="mholder">
            <Link to={"/new-loan-product"} className="">
              <button id="new" className="btn btn-success">
                New Loan Product
              </button>
            </Link>
          </div>
        </div>
        <DataGrid
          rows={loan_types}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          //checkboxSelection
        />
      </div>
    </div>
  );
}
