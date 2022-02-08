import "./sidebar.css";
import { LineStyle, Storefront, AttachMoney, Report } from "@material-ui/icons";

import MoneyIcon from "@mui/icons-material/Money";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import loginSlice from "../../features/loginSlice";
import { useHistory } from "react-router";

import { Link } from "react-router-dom";
import Logo from "../img/logo.jpg";

export default function Sidebar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = () => {
    dispatch(loginSlice.actions.setLogout());
    history.push("/auth/login/");
  };
  return (
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
  );
}
