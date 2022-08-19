import Channel from "../Components/Channel";
import SendChat from "../Components/SendChat";
import Message from "../Components/Message";
import { Box, Paper, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getMessages, addChaanel, getChannel } from "../firebase";

type TypeChannel = { id: string };

type TypeMessage = { message: string };

type changeChannel = string;

const ChatMain = () => {
  const [messages, setMessages] = useState([]);
  const [channels, setChannels] = useState([]);
  const [changedChannel, setChangedChannel] = useState("테스트");

  useEffect(() => {
    getMessages(setMessages, changedChannel);
  }, [changedChannel]);

  useEffect(() => {
    getChannel(setChannels);
  }, []);

  const handleNewChannel = () => {
    addChaanel(prompt());
  };

  const handleUpdateChannel = (channelchange: string) => {
    setChangedChannel(channelchange);
  };

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
            {channels &&
              channels.map((channel: TypeChannel) => (
                <>
                  <Channel handleUpdateChannel={handleUpdateChannel} channelName={channel.id} key={channel.id}></Channel>
                </>
              ))}
          </Box>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column">
        <Box sx={{ overflowY: "scroll" }} height="84vh" width="80vw" bgcolor="rgba(0, 0, 255, 0.5)">
          {messages &&
            messages.map((message: TypeMessage) => (
              <>
                <Message message={message.message}></Message>
              </>
            ))}
        </Box>
        <SendChat changedChannel={changedChannel}></SendChat>
      </Box>
    </Box>
  );
};

export default ChatMain;
