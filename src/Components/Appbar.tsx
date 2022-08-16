import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router";
import { logout } from "../firebase";
import { getToken } from "../utils";

export default function ButtonAppBar() {
  const validToken = getToken();
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "1rem" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AssignMent
          </Typography>
          {!validToken ? (
            <>
              <Button
                sx={{ backgroundColor: "primary.dark" }}
                color="inherit"
                onClick={() => {
                  navigate("/join");
                }}
              >
                회원가입
              </Button>
              <Button
                sx={{ marginLeft: "1rem", backgroundColor: "primary.dark" }}
                color="inherit"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
            </>
          ) : (
            <Button
              sx={{ marginLeft: "1rem", backgroundColor: "primary.dark" }}
              color="inherit"
              onClick={() => {
                logout();
              }}
            >
              LogOut
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
