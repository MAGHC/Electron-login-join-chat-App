import { Navigate } from "react-router";

const NotFound = () => {
  return (
    <>
      {alert("존재하지않는페이지 입니다!")}
      <Navigate to="/" replace></Navigate>
    </>
  );
};

export default NotFound;
