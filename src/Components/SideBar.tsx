import Box from "@mui/material/Box";
import { database } from "../firebase";

const SideBar = () => {
  console.log(database);
  return (
    <Box
      sx={{
        width: "20rem",
        height: "100vh",
        backgroundColor: "primary.dark",
      }}
    ></Box>
  );
};

export default SideBar;
