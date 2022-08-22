import { Box, Checkbox, Paper } from "@mui/material";
import { useState } from "react";

interface TypeUserList {
  name?: string;
}

const UserList = ({ user }: { user: TypeUserList }) => {
  const [userCheck, setUserCheck] = useState(false);

  console.log(userCheck);
  return (
    <Paper elevation={2}>
      <Checkbox
        onClick={() => {
          setUserCheck(!userCheck);
        }}
        value={user.name}
      ></Checkbox>
      {user.name}
    </Paper>
  );
};

export default UserList;
