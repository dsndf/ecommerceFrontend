import "../../styles/AdminPro.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsDeleted,
  STATUS,
} from "../../slices/productsSlice";
import Loading from "../Loading";
import icons from "../../icons";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteUser, getAdminUsersData, setUserError } from "../../slices/userSlice";
const AdminUsers = () => {
  const { status, usersData, isDeleted,err } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();
  const gridColumns = [
      { field: "id", headerName: "USER ID", minWidth: 200, flex: 1 },
      { field: "name", headerName: "NAME", minWidth: 150, flex: 0.5 },
      {
        field: "email",
        headerName: "EMAIL",
        minWidth: 150,
        flex: 0.3,
      },
      {
        field: "role",
        type: "number",
        headerName: "ROLE",
        minWidth: 150,
        flex: 0.3,
      },
      {
        field: "actions",
        headerName: "ACTIONS",
        type: "number",
        sortable: false,
        minWidth: 150,
        flex: 0.3,
        renderCell: (params) => {
          return (
            <div>
              {" "}
              <Link
                to={`/admin/update/user/${params.getValue(params.id, "id")}`}
                className="action-icons edit-icon"
              >
                {icons.editpro}
              </Link>
              <Link
                onClick={() =>
                  dispatch(deleteUser(params.getValue(params.id, "id")))
                }
                className="action-icons del-icon"
              >
                {icons.deletepro}
              </Link>
            </div>
          );
        },
      },
    ];
  const gridrows =  usersData &&
      usersData.map((v) => {
        return {
          id: v._id,
          name: v.name,
          email: v.email,
          role: v.role,
        };
      })
  useEffect(() => {
    if(err){
      toast.error(err);
      dispatch(setUserError(""));
    }
     if (isDeleted) {
      toast.success("User Deleted Successfully");
      dispatch(setIsDeleted(false));
    }
    dispatch(getAdminUsersData());

    document.querySelector(".nav-cont").style.backgroundColor = "#fff";

    return () => {
      document.querySelector(".nav-cont").style.backgroundColor = "transparent";
    };
  }, [isDeleted,err]);

  if (status === STATUS.LOADING) {
    return <Loading />;
  }


  return (
 
   

      <div className="admin-box">
        <DataGrid
          rows={gridrows}
          columns={gridColumns}
          className="myorderTable"
        />
      </div>
  );
};

export default AdminUsers;
