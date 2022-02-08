import "./transactions.css";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getC2BTransactionsAsync } from "../../features/transactionSlice";

export default function C2B() {
  const transactions = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getC2BTransactionsAsync());
  }, [dispatch]);

  const Label = ({ type }) => {
    return <label className={"widgetLgButton " + type}>{type}</label>;
  };

  const columns = [
    { field: "id", headerName: "Id", width: 100 },
    {
      field: "mpesa",
      headerName: "Mpesa Code",
      width: 200,
    },

    {
      field: "full_name",
      headerName: "Name",
      width: 210,
    },

    {
      field: "amount",
      headerName: "Amount",
      width: 200,
    },

    {
      field: "phone_number",
      headerName: "Phone Number",
      width: 170,
    },

    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: () => {
        return (
          <>
            <Label type="Approved" />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <div className="d-flex">
        <h3 className="">Client to Business Transactions (in) </h3>
        <div className="mholder">
          <Link to={"/new-c2b-transaction"} className="">
            <button id="new" className="btn btn-success">
              New C2B Transaction
            </button>
          </Link>
        </div>
      </div>
      <DataGrid
        rows={transactions}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        //checkboxSelection
      />
    </div>
  );
}
