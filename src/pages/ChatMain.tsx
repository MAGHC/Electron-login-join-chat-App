import SideBar from "../Components/SideBar";
import Channels from "../Components/Channels";
import SendChat from "../Components/SendChat";
import { Box } from "@mui/material";

const ChatMain = () => {
  return (
    <Box display="flex" width="100vw" height="100vh">
      <Box sx={{ float: "left" }}>
        <SideBar></SideBar>
      </Box>
      <Box display="flex" flexDirection="column">
        <Channels></Channels>
        <SendChat></SendChat>
      </Box>
    </Box>
  );
};

export default ChatMain;
