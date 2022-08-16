import { Paper, Box } from "@mui/material";

const SideBar = () => {
  console.log(process.env.REACT_APP_apiKey);
  return (
    <Box
      sx={{
        width: "20vw",
        height: "100vh",
        backgroundColor: "primary.dark",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Paper variant="outlined">Chat Channel List</Paper>
      </Box>
    </Box>
  );
};

export default SideBar;
