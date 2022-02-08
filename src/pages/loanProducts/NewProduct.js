import "./NewProduct.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addLoanTypeAsync } from "../../features/loanSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function NewProduct() {
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
    <div className="newUser">
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
  );
}
