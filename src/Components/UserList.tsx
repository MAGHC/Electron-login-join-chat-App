import { Box, Checkbox, Paper } from "@mui/material";

interface TypeUserList {
  name: string;
}

const UserList = ({ username }: { username: string }) => {
  return (
    <Paper elevation={2}>
      <Checkbox></Checkbox>
      {username}
    </Paper>
  );
};

export default UserList;
