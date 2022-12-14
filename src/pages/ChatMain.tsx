import Channel from "../Components/Channel";
import SendChat from "../Components/SendChat";
import Message from "../Components/Message";
import UserList from "../Components/UserList";
import { Box, Paper, Button, Card, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getMessages, addChaanel, getChannel, getUserList } from "../firebase";
import { useAuth } from "../Auth";

type TypeUserList = {
  name: string;
};

type TypeChannel = { id: string };

type TypeMessage = { message: string; displayName: string };

const ChatMain = () => {
  const [messages, setMessages] = useState([]);
  const [channels, setChannels] = useState([]);
  const [changedChannel, setChangedChannel] = useState("empty");
  const [userState, setUserState] = useState({});
  const [userList, setUserList] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [searchUser, setSearchUser] = useState("");

  // auth user
  let auth = useAuth();

  useEffect(() => {
    setUserState(auth.currentUser);
  }, [userState]);

  // data

  useEffect(() => {
    getMessages(setMessages, changedChannel);
  }, [changedChannel]);

  useEffect(() => {
    getChannel(setChannels);
  }, []);

  useEffect(() => {
    getUserList(setUserList);
  }, []);

  //function / variables

  const handleNewChannel = () => {
    addChaanel(prompt());
  };

  const handleUpdateChannel = (channelchange: string) => {
    setChangedChannel(channelchange);
  };

  const upDateModalStatus = (status: boolean) => {
    setModalStatus(status);
  };

  const handleSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchUser(value);
  };
  const searchUserName = userList.filter((user: TypeUserList) => user.name.includes(searchUser));

  // console.log(auth.isAuthenticated);
  return (
    <Box display="flex" width="100vw" height="100vh">
      {modalStatus && userList && (
        <Box
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              upDateModalStatus(false);
            }
          }}
          sx={{ zIndex: "2", left: "0%", top: "0%", position: "absolute", width: "100%", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.45)" }}
        >
          <Card sx={{ position: "absolute", top: "20%", left: "45%", width: "20%" }}>
            <Box margin="1rem" bgcolor="white" textAlign="center">
              ??? ??? ??? ???
            </Box>
            <TextField onChange={handleSearchUser} value={searchUser}></TextField>

            {searchUserName.map((user: TypeUserList) => (
              <UserList key={user.name} user={user}></UserList>
            ))}

            <Button sx={{ alignSelf: "self-end" }}>?????????</Button>
          </Card>
        </Box>
      )}
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
              ??????
            </Button>
            <Button
              sx={{ marginLeft: "1rem" }}
              onClick={() => {
                setModalStatus(!modalStatus);
              }}
              variant="contained"
            >
              ????????????
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
