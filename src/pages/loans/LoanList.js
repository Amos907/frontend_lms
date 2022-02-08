import "./loanList.css";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLoansAsync } from "../../features/loanSlice";

export default function LoanList() {
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
  ];

  return (
    <div className="userList">
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
  );
}
