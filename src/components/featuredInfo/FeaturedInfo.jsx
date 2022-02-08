import "./featuredInfo.css";

export default function FeaturedInfo(props) {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  });
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Loan Book Value</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {formatter.format(props.loaned_amout)}
          </span>
        </div>
        <span className="featuredSub">Amount Loaned out</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Loans</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{props.customers}</span>
        </div>
        <span className="featuredSub">Number of Loans</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Overdue Payments</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {formatter.format(props.due_amount)}
          </span>
        </div>
        <span className="featuredSub">Amount Overdue</span>
      </div>
    </div>
  );
}
