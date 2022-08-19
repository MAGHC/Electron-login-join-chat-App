import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router";
import { logout } from "../firebase";
import { useEffect, useState } from "react";
import Auth from "../Auth";

export default function ButtonAppBar() {
  const [validLogin, setValidLogin] = useState<Object | null>(null);

  useEffect(() => {
    Auth(setValidLogin);
  }, [validLogin]);

  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "1rem" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AssignMent
          </Typography>
          {!validLogin ? (
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
                setValidLogin(null);
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
