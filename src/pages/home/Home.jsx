import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLoanTypesAsync } from "../../features/loanSlice";
import { getOverdueAsync } from "../../features/paymentTrackerSlice";
import { LineStyle, Storefront, AttachMoney, Report } from "@material-ui/icons";

import MoneyIcon from "@mui/icons-material/Money";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import Logo from "../../components/img/logo.jpg";
import loginSlice from "../../features/loginSlice";
import { useHistory } from "react-router";

export default function Home() {
  const history = useHistory();
  const handleLogout = () => {
    dispatch(loginSlice.actions.setLogout());
    history.push("/auth/login");
  };
  const loan_data = useSelector((state) => state.loans);
  const overDue = useSelector((state) => state.paymentTracker);
  const dispatch = useDispatch();
  var num_customers = 0;
  var amount_loaned = 0;
  var amount_overDue = 0;
  useEffect(() => {
    dispatch(getLoanTypesAsync());
    dispatch(getOverdueAsync());
  }, [dispatch]);

  const arr = loan_data.map((item) => {
    const data = {};
    data.loan_amount = item.loan_amount;
    data.customers = item.num_customers;
    return data;
  });

  for (let i of overDue) {
    amount_overDue = amount_overDue + parseInt(i.amount_due);
  }

  for (const i of arr) {
    amount_loaned = amount_loaned + i.loan_amount * i.customers;
    num_customers = num_customers + i.customers;
  }
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
      <div className="col-md-9 home">
        <h2 className="ml-2">DashBoard </h2>
        <FeaturedInfo
          customers={num_customers}
          loaned_amout={amount_loaned}
          due_amount={amount_overDue}
        />
        <Chart data={arr} title="Loan Analytics" grid dataKey="customers" />
      </div>
    </div>
  );
}
