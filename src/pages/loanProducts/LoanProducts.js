import "./loanProducts.css";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLoanTypesAsync } from "../../features/loanSlice";

export default function LoanProducts() {
  const loan_types = useSelector((state) => state.loans);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoanTypesAsync());
  }, [dispatch]);

  const Label = ({ type }) => {
    return <label className={"widgetLgButton " + type}>{type}</label>;
  };

  const columns = [
    { field: "id", headerName: "Id", width: 100 },
    {
      field: "loan_amount",
      headerName: "Loan Amount",
      width: 160,
    },

    {
      field: "four_weeks",
      headerName: "4 Week Plan",
      width: 160,
    },

    {
      field: "five_weeks",
      headerName: "5 Week Plan",
      width: 160,
    },

    {
      field: "seven_weeks",
      headerName: "7 Week Plan",
      width: 160,
    },

    {
      field: "eight_weeks",
      headerName: "8 Week Plan",
      width: 160,
    },

    {
      field: "ten_weeks",
      headerName: "10 Week Plan",
      width: 160,
    },

    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        if (params.row.status === "active") {
          return (
            <>
              <Label type="Active" />
            </>
          );
        }
        return (
          <>
            <Label type="Inactive" />
          </>
        );
      },
    },

    {
      field: "num_customers",
      headerName: "Customers",
      width: 140,
    },
  ];

  return (
    <div className="userList">
      <div className="d-flex">
        <h3 className="">Loan Products</h3>
        <div className="mholder">
          <Link to={"/new-loan-product"} className="">
            <button id="new" className="btn btn-success">
              New Loan Product
            </button>
          </Link>
        </div>
      </div>
      <DataGrid
        rows={loan_types}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        //checkboxSelection
      />
    </div>
  );
}
