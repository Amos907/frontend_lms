import "./paymentsTracker.css";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOverdueAsync } from "../../features/paymentTrackerSlice";
import { LineStyle, Storefront, AttachMoney, Report } from "@material-ui/icons";
import { Link } from "react-router-dom";
import MoneyIcon from "@mui/icons-material/Money";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "../../components/img/logo.jpg";
import loginSlice from "../../features/loginSlice";
import { useHistory } from "react-router";
import { CSVLink } from "react-csv";

export default function AllOverdue() {
  const history = useHistory();
  const handleLogout = () => {
    dispatch(loginSlice.actions.setLogout());
    history.push("/auth/login/");
  };
  const prettyLink = {
    marginTop: 10,
  };
  const overdue = useSelector((state) => state.paymentTracker);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOverdueAsync());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Id", width: 100 },

    {
      field: "full_name",
      headerName: "Name",
      width: 210,
    },

    {
      field: "loan_amount",
      headerName: "Loan Amount",
      width: 200,
    },

    {
      field: "amount_due",
      headerName: "Amount Due",
      width: 170,
    },

    {
      field: "week_due",
      headerName: "Week Due",
      width: 170,
    },

    {
      field: "days_due",
      headerName: "Days Due",
      width: 170,
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
          <h3 className="">Overdue Payments</h3>
          <div className="mholder"></div>
        </div>
        <DataGrid
          rows={overdue}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          //checkboxSelection
        />

        <CSVLink
          data={overdue}
          filename="data.csv"
          className="btn btn-primary"
          style={prettyLink}
          text="download"
          target="_blank"
        >
          Download
        </CSVLink>
      </div>
    </div>
  );
}
