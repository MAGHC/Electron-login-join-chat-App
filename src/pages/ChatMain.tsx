import Channel from "../Components/Channel";
import SendChat from "../Components/SendChat";
import Message from "../Components/Message";
import { Box, Paper, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getMessages, addChaanel, getChannel, getUserList } from "../firebase";
import Auth from "../Auth";

type TypeChannel = { id: string };

type TypeMessage = { message: string; displayName: string };

const ChatMain = () => {
  const [messages, setMessages] = useState([]);
  const [channels, setChannels] = useState([]);
  const [changedChannel, setChangedChannel] = useState("신규");
  const [userState, setUserState] = useState({});
  const [userList, setUserList] = useState();

  useEffect(() => {
    Auth(setUserState);
  }, [userState]);

  useEffect(() => {
    getMessages(setMessages, changedChannel);
  }, [changedChannel]);

  useEffect(() => {
    getChannel(setChannels);
  }, []);

  useEffect(() => {
    getUserList(setUserList);
  }, []);

  const handleNewChannel = () => {
    addChaanel(prompt());
  };

  const handleUpdateChannel = (channelchange: string) => {
    setChangedChannel(channelchange);
  };

  // console.log(messages);

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
            <Button
              sx={{ marginLeft: "1rem" }}
              onClick={() => {
                console.log(userList);
              }}
              variant="contained"
            >
              유저목록
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
                <Message userState={userState} displayName={message.displayName} message={message.message}></Message>
              </>
            ))}
        </Box>
        <SendChat userState={userState} changedChannel={changedChannel}></SendChat>
      </Box>
    </Box>
  );
};

export default ChatMain;
