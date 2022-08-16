import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Join from "./pages/Join";

import ChatMain from "./pages/ChatMain";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/login" element={<Login></Login>} />
        <Route path="/join" element={<Join></Join>} />
        <Route path="/chatmain" element={<ChatMain></ChatMain>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
