import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/toast";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";

const Login = () => {
  const inputRef = useRef({})
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault()
      handleLogin()
    }
  }
  const handleLogin = () => {
    const username = inputRef.current["username"]?.value;
    const password = inputRef.current["password"]?.value;
    if (username.toLowerCase() === "user@gmail.com" && password === "user@123") {
      dispatch(login(username))
      navigate("/home")
      showToast("Logged in successfully", "success")
    } else {
      showToast("Invalid credentials", "error")
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 4, marginTop: 8, textAlign: "center", borderRadius: "12px" }}>
          <Typography variant="h4" component="h6" gutterBottom className="heading-text">
            Login
          </Typography>
          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField inputRef={el => inputRef.current["username"] = el} label="Email" name="username" variant="outlined" fullWidth required
            />
            <TextField inputRef={el => inputRef.current["password"] = el} label="Password" name="password" variant="outlined" type="password" fullWidth required onKeyDown={handleKeyPress} />
            <Button variant="contained" sx={{ backgroundColor: "rgb(0,0, 88)" }} fullWidth onClick={handleLogin} >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Login;
