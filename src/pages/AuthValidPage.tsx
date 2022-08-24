import { useAuth } from "../Auth";
import { Navigate, useLocation } from "react-router";

const AuthValidPage = ({ children }: { children: JSX.Element }) => {
  let location = useLocation();
  let auth = useAuth();
  console.log(auth);

  if (auth.isAuthenticated === false)
    return (
      <>
        {alert("로그인해주세요")}
        <Navigate to="/login" state={{ from: location }} replace />
      </>
    );
  else return children;
};

export default AuthValidPage;
