import { Box, FormControl, Button, TextField } from "@mui/material";
import { useState } from "react";
import { sendMessgae } from "../firebase";

const SendChat = () => {
  const [message, setMessage] = useState("");

  const submitMessage = () => {
    if (message == "") {
      alert("공백은 허용되지않습니다");
    } else {
      sendMessgae(message, "channel.1");
      setMessage("");
    }
  };

  const changeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMessage(value);
    console.log(message);
  };

  return (
    <Box display="flex" justifyContent="center" width="80vw" height="16vh" bgcolor="primary.light">
      <FormControl sx={{ position: "relative", width: "90%", height: "90%" }}>
        <TextField onChange={changeMessage} value={message} sx={{ width: "90%", marginTop: "2rem" }} name="message"></TextField>
        <Button onClick={submitMessage} sx={{ position: "absolute", top: "50%", right: "0%", transform: "translate(0,-50%)" }} variant="contained">
          전송
        </Button>
      </FormControl>
    </Box>
  );
};

export default SendChat;
