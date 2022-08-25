import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import AuthValidPage from "./pages/AuthValidPage";
import Login from "./pages/Login";
import Join from "./pages/Join";
import ChatMain from "./pages/ChatMain";
import NotFound from "./pages/NotFound";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/login" element={<Login></Login>} />
        <Route path="/join" element={<Join></Join>} />
        <Route path="*" element={<NotFound></NotFound>}></Route>
        <Route
          path="/chatmain"
          element={
            <>
              <AuthValidPage>
                <ChatMain></ChatMain>
              </AuthValidPage>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
