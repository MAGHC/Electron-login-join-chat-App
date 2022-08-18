// import SideBar from "../Components/SideBar";
import SendChat from "../Components/SendChat";
import Message from "../Components/Message";
import { Box, Paper, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getMessages, addChaanel, getChannel } from "../firebase";

const ChatMain = () => {
  const [messages, setMessages] = useState([]);
  const [channels, setChannels] = useState();

  useEffect(() => {
    getMessages(setMessages, "테스트");
  }, []);

  useEffect(() => {
    getChannel(setChannels);
  }, []);

  const handleNewChannel = () => {
    addChaanel(prompt());
  };
  console.log(channels);
  return (
    <Box display="flex" width="100vw" height="100vh">
      <Box sx={{ float: "left" }}>
        <Box
          sx={{
            width: "20vw",
            height: "100vh",
            backgroundColor: "primary.dark",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Paper variant="outlined">Chat Channel List</Paper>
            <Button onClick={handleNewChannel} variant="contained">
              추가
            </Button>
          </Box>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column">
        <Box height="84vh" width="80vw" bgcolor="rgba(0, 0, 255, 0.5)">
          <Message></Message>
        </Box>
        <SendChat></SendChat>
      </Box>
    </Box>
  );
};

export default ChatMain;
