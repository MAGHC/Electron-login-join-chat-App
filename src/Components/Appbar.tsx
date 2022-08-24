import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { logout } from "../firebase";

import { useAuth } from "../Auth";

export default function ButtonAppBar() {
  let auth = useAuth();

  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "1rem" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AssignMent
          </Typography>
          {!auth.isAuthenticated ? (
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
                navigate("/");
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
