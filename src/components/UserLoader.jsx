import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import {
  RiDashboardFill,
  RiAccountBoxFill,
  RiListOrdered,
  RiLogoutBoxRFill,
  RiShoppingCartFill,
} from "react-icons/ri";
import "../styles/UserLoader.scss";
import { CgNametag } from "react-icons/cg";
import { Backdrop } from "@mui/material";
import Back from "./Back.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/userSlice";
import { toast } from "react-toastify";

export default function BasicSpeedDial() {
  const cartState = useSelector((state) => state.cartReducer);

  const actions = useMemo(() => {
    return [
      { icon: <RiListOrdered />, name: "Orders", func: goToOrders },
      { icon: <RiAccountBoxFill />, name: "Profile", func: goToProfile },
      {
        icon: <RiShoppingCartFill />,
        name: `Cart (${cartState.cart.length})`,
        func: goToCart,
      },
      { icon: <RiLogoutBoxRFill />, name: "Logout", func: DoLogout },
    ];
  }, [cartState.cart]);

  const navigation = useNavigate();
  const dispatch = useDispatch();
  function goToDashboard() {
    navigation("/admin/dashboard");
  }
  function goToProfile() {
    navigation("/account");
  }
  function goToCart() {
    navigation("/Cart");
  }
  function goToOrders() {
    navigation("/orders");
  }
  function DoLogout() {
    dispatch(logout());

    toast.success("Logged Out Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  const { userData } = useSelector((state) => state.userReducer);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (userData.role === "admin") {
   
      actions.unshift({
        icon: <RiDashboardFill />,
        name: "Dashboard",
        func: goToDashboard,
      });
    }
  }, [userData.role,cartState.cart]);

  return (
    <>
      {open ? <Back></Back> : null}
      <SpeedDial
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        open={open}
        className="userloader"
        direction="down"
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", top: 20, right:25 }}
        icon={<img src={userData?.avatar?.url} style={{width:"100%",borderRadius:"100%"}} ></img>}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.func}
          />
        ))}
      </SpeedDial>
    </>
  );
}
