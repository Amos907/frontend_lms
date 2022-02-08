import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLoanTypesAsync } from "../../features/loanSlice";
import { getOverdueAsync } from "../../features/paymentTrackerSlice";
export default function Home() {
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
    <div className="home">
      <h2 className="ml-2">DashBoard </h2>
      <FeaturedInfo
        customers={num_customers}
        loaned_amout={amount_loaned}
        due_amount={amount_overDue}
      />
      <Chart data={arr} title="Loan Analytics" grid dataKey="customers" />
    </div>
  );
}
