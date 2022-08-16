import Grid from "@mui/material/Grid";
import { FormControl, Box, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import { logInWithEmailAndPassword } from "../firebase";

const Login = () => {
  const [userInputValue, setUserInputValue] = useState({
    id: "",
    pw: "",
  });

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserInputValue({
      ...userInputValue,
      [name]: value,
    });
  };

  const Validation = userInputValue.id && userInputValue.pw.length > 6;

  return (
    <Grid justifyContent="center" container>
      <FormControl>
        <Box
          mt={20}
          sx={{ padding: "1rem  0", display: "flex", alignItems: "center", width: 500, height: 200, backgroundColor: "primary.light", borderRadius: 5 }}
        >
          <Typography ml={3} textAlign="center" variant="h3" gutterBottom component="div">
            Login
          </Typography>
          <FormControl
            onSubmit={() => {
              logInWithEmailAndPassword(userInputValue.id, userInputValue.pw);
            }}
            style={{ marginLeft: "2rem" }}
          >
            <TextField
              sx={{ marginBottom: "1rem" }}
              name="id"
              onChange={handleUserInput}
              value={userInputValue.id}
              required
              id="outlined-required"
              label="ID"
            />
            <TextField onChange={handleUserInput} required id="outlined-required" name="pw" value={userInputValue.pw} type="password" label="PW" />

            <Button
              onClick={() => {
                logInWithEmailAndPassword(userInputValue.id, userInputValue.pw);
              }}
              disabled={!Validation}
              sx={{ width: "7rem", marginLeft: "6rem", marginTop: "1rem", backgroundColor: "primary.dark" }}
              variant="contained"
            >
              로그인
            </Button>
          </FormControl>
        </Box>
      </FormControl>
    </Grid>
  );
};

export default Login;
