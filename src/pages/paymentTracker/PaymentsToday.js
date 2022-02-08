import "./paymentsTracker.css";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPaymentsTodayAsync } from "../../features/paymentTrackerSlice";

export default function PaymentsToday() {
  const payments_today = useSelector((state) => state.paymentTracker);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPaymentsTodayAsync());
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
      width: 170,
    },

    {
      field: "installment",
      headerName: "Installment Amount",
      width: 200,
    },

    {
      field: "week",
      headerName: "week",
      width: 170,
    },
  ];

  return (
    <div className="userList">
      <div className="d-flex">
        <h3 className="">Payments Due Today</h3>
        <div className="mholder"></div>
      </div>
      <DataGrid
        rows={payments_today}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        //checkboxSelection
      />
    </div>
  );
}
