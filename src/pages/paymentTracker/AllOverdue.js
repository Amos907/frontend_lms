import "./paymentsTracker.css";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOverdueAsync } from "../../features/paymentTrackerSlice";
export default function AllOverdue() {
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
    <div className="userList">
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
    </div>
  );
}
