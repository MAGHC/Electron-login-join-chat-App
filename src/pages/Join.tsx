import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { registerWithEmailAndPassword } from "../firebase";

const Join = () => {
  const PW_REG = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const EMAIL_REG =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const handleUserJoinValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserJoinValue({
      ...userJoinValue,
      [name]: value,
    });
  };

  const [userJoinValue, setUserJoinValue] = useState({
    id: "",
    userName: "",
    pw: "",
    pwConFirm: "",
  });

  const register = () => {
    registerWithEmailAndPassword(userJoinValue.id, userJoinValue.id, userJoinValue.pw);
  };

  const isValidButton =
    PW_REG.test(userJoinValue.pw) && userJoinValue.pw === userJoinValue.pwConFirm && EMAIL_REG.test(userJoinValue.id) && userJoinValue.userName.length !== 0;

  return (
    <Grid justifyContent="center" container>
      <Box display={"flex"} justifyContent="center" mt={5}>
        <Box display={"flex"} flexDirection={"column"} width="30rem" borderRadius={5} sx={{ margin: 5, padding: "5rem" }} bgcolor={"primary.light"}>
          <Typography mb={3} textAlign="center" variant="h4" gutterBottom component="p">
            회원가입
          </Typography>

          <TextField
            type="email"
            sx={{ marginBottom: "1rem" }}
            onChange={handleUserJoinValue}
            value={userJoinValue.id}
            name="id"
            required
            id="outlined-required"
            label="ID"
          />
          {EMAIL_REG.test(userJoinValue.id) ? "" : "옳지 않은 email 형식입니다"}
          <TextField
            sx={{ margin: "1rem  0" }}
            onChange={handleUserJoinValue}
            value={userJoinValue.userName}
            name="userName"
            required
            id="outlined-required"
            label="userName"
          />
          {userJoinValue.userName.length !== 0 ? "" : "이름을 입력해주세요"}

          <TextField
            sx={{ margin: "1rem  0" }}
            onChange={handleUserJoinValue}
            value={userJoinValue.pw}
            required
            id="outlined-required"
            name="pw"
            type="password"
            label="PW"
          />
          {PW_REG.test(userJoinValue.pw) ? (
            ""
          ) : (
            <Typography mb={3} textAlign="center" variant="subtitle1" gutterBottom component="p">
              8자리이상의 숫자1 문자1개가 포함된 비밀번호를 작성해주세요
            </Typography>
          )}

          <TextField
            onChange={handleUserJoinValue}
            value={userJoinValue.pwConFirm}
            required
            id="outlined-required"
            name="pwConFirm"
            type="password"
            label="PWCONFIRM"
          />
          {userJoinValue.pw === userJoinValue.pwConFirm ? (
            ""
          ) : (
            <Typography mb={3} textAlign="center" variant="subtitle1" gutterBottom component="p">
              비밀번호가 일치하지 않습니다
            </Typography>
          )}
          <Button onClick={register} disabled={!isValidButton} sx={{ marginTop: "1rem", backgroundColor: "primary.dark" }} variant="contained">
            제출
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default Join;
