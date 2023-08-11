import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

// eslint-disable-next-line react/prop-types
export function Login({ onLoginStatusChange = new Function() }) {
  const [password, setPassword] = useState("");
  const { mutateAsync: loginMutate, isLoading: loggingIn } = useMutation(login);
  const [error, setError] = useState(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Card sx={{ width: "600px", margin: "auto" }}>
        <CardHeader title="登录" />
        <CardContent>
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            label="密码"
            variant="standard"
            placeholder="请输入管理员密码"
          />
        </CardContent>
        <CardActions>
          <LoadingButton
            loading={loggingIn}
            variant="contained"
            onClick={() => {
              loginMutate(password)
                .then((token) => {
                  localStorage.setItem("BEARER_TOKEN", token);
                  onLoginStatusChange(true);
                })
                .catch((err) => {
                  setError(true);
                });
            }}
          >
            登录
          </LoadingButton>
        </CardActions>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={error}
        autoHideDuration={3000}
        onClose={() => {
          setError(false);
        }}
        message="登陆失败"
      />
    </Box>
  );
}
