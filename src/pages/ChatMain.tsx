import SideBar from "../Components/SideBar";
import SendChat from "../Components/SendChat";
import { Box } from "@mui/material";

const ChatMain = () => {
  return (
    <Box display="flex" width="100vw" height="100vh">
      <Box sx={{ float: "left" }}>
        <SideBar></SideBar>
      </Box>
      <Box display="flex" flexDirection="column">
        <Box height="84vh" width="80vw" bgcolor="rgba(0, 0, 255, 0.5)"></Box>
        <SendChat></SendChat>
      </Box>
    </Box>
  );
};

export default ChatMain;
