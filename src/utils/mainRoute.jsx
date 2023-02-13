import { Navigate, redirect } from "react-router-dom";
import { getUser } from "../utils/localStorage";

const MainRoute = () => {
  let user = getUser();

  return user && user.rol.name === "admin" ? (
    <Navigate to="/dashboard" />
  ) : (
    // redirect("/dashboard")
    <Navigate to="/login" />
  );
  // redirect("/login");
};

export default MainRoute;
