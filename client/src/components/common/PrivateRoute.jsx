/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
    const { currentuser } = useSelector((state) => state.user);

  return  currentuser ? <Outlet /> : <Navigate to ='/sign-in' />
}
