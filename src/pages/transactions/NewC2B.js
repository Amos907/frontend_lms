import "./newTransaction.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addC2BTransactionsAsync } from "../../features/transactionSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function NewC2B() {
  const [mpesa_code, setCode] = useState();
  const [first_name, setFirst] = useState();
  const [last_name, setLast] = useState();
  const [amount, setAmount] = useState();
  const [phone_number, setPhone] = useState();
  const dispatch = useDispatch();

  const fullName = (first, last) => {
    return first + " " + last;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      first_name ||
      mpesa_code ||
      last_name ||
      phone_number ||
      amount != null
    ) {
      if (mpesa_code.length !== 10) {
        alert("Incorect Mpsea Code");
      } else {
        dispatch(
          addC2BTransactionsAsync({
            mpesa_code: mpesa_code,
            full_name: fullName(first_name, last_name),
            amount: amount,
            phone_number: phone_number,
          })
        )
          .then(unwrapResult)
          .then(() => {
            alert("New C2B Transaction Added Successfully!");
          })
          .catch(() => {
            alert("Unable to add transaction!");
          });
      }
    } else {
      alert("Fill Missing Values");
    }
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New C2B Transaction</h1>
      <form className="newUserForm" onSubmit={onSubmit}>
        <div className="newUserItem">
          <label>Mpesa Code</label>
          <input
            value={mpesa_code}
            onChange={(e) => setCode(e.target.value)}
            type="text"
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
          <label>Amount</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="text"
          />
        </div>

        <div className="newUserItem">
          <label>Phone Number</label>
          <input
            value={phone_number}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
          />
        </div>

        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
}
