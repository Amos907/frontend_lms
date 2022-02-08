import "./newLoan.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addLoanAsync } from "../../features/loanSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function NewLoan() {
  const [loan_plan, setPlan] = useState();
  const [id_number, setId] = useState(0);
  const [amount, setAmount] = useState(0);
  const [first_name, setFirst] = useState();
  const [last_name, setLast] = useState();
  const [installment, setInstallment] = useState(0);
  const dispatch = useDispatch();

  const fullName = (first, last) => {
    return first + " " + last;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      loan_plan ||
      id_number ||
      first_name ||
      last_name ||
      amount ||
      installment != null
    ) {
      if (id_number.length !== 8) {
        alert("Incorect ID Number Passed");
      } else {
        dispatch(
          addLoanAsync({
            id_number: id_number,
            loan_plan: loan_plan,
            amount: amount,
            full_name: fullName(first_name, last_name),
            installment: installment,
          })
        )
          .then(unwrapResult)
          .then(() => {
            alert("Loan Created Successfully.");
          })
          .catch(() => {
            alert("Loan Creation Failed");
          });
      }
    } else {
      alert("Fill all Values");
    }
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Loan</h1>
      <form className="newUserForm" onSubmit={onSubmit}>
        <div className="newUserItem">
          <label>National Id Number</label>
          <input
            value={id_number}
            onChange={(e) => setId(e.target.value)}
            type="text"
            placeholder="01234567"
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
          <label>Loan Amount</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="text"
            placeholder="10000"
          />
        </div>

        <div className="newUserItem">
          <label>Payment Plan</label>
          <select
            className="newUserSelect"
            name="active"
            id="active"
            value={loan_plan}
            onChange={(e) => setPlan(e.target.value)}
          >
            <option value="4 Weeks">4 Week Plan</option>
            <option value="5 Weeks">5 Week Plan</option>
            <option value="7 Weeks">7 Week Plan</option>
            <option value="8 Weeks">8 Week Plan</option>
            <option value="10 Weeks">10 Week Plan</option>
          </select>
        </div>

        <div className="newUserItem">
          <label>Weekly Installments</label>
          <input
            value={installment}
            onChange={(e) => setInstallment(e.target.value)}
            type="text"
          />
        </div>

        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
}
