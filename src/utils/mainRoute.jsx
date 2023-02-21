import { Navigate } from "react-router-dom";
import { getUser } from "../utils/localStorage";

const MainRoute = () => {
  let user = getUser();

  return user && user.rol.name === "admin" ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

export default MainRoute;
