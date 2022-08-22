import { Box, Checkbox, Paper } from "@mui/material";
import { useState } from "react";

interface TypeUserList {
  name: string;
}

const UserList = ({ username }: { username: string }) => {
  const [userCheck, setUserCheck] = useState(false);

  console.log(userCheck);
  return (
    <Paper elevation={2}>
      <Checkbox
        onClick={() => {
          setUserCheck(!userCheck);
        }}
        value={username}
      ></Checkbox>
      {username}
    </Paper>
  );
};

export default UserList;
