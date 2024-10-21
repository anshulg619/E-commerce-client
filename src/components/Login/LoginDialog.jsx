import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {Dialog,Typography,Box,styled,
  TextField, Button,} from "@mui/material"; 
import {East as Forward} from '@mui/icons-material'
import { adminLogout, userLogin } from "../../redux/action/loginAction";
//import { userCartAction } from "../../redux/action/cartAction";
//import UserServices from "../../services/UserServices";

const Wrapper = styled(Box)`
  height: 70vh;
  width: 90vh;
  padding: 0;
  display: flex;
`;

const Image = styled(Box)`
background: #2874f0 url('https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png') center 85% no-repeat;
paddding:45px 35px;
height:100%
width:30%;
display:flex;
flex-direction:column;
`;

const LoginForm = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
  padding: 20px;
`;

const LoginDialog = ({ open, setOpen, setAccount }) => {
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const {admin} = useSelector(state => state.admin)

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  //handling login request
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const Login = (e) => {
    e.preventDefault();

    const loginBody = {
      username: loginData.username,
      password: loginData.password,
    };
    //     UserServices.getUser(loginBody)
    //     .then((response) => {
    //     console.log(response.data)
    //     handleClose();
    //     setError(false);
    //     setAccount(loginData.username);
    //     setLoginData({
    //       username: "",
    //       password: "",
    //     })
    // })
    //   .catch ((error) => {
    //     console.log(error.message);
    //     setError(true);
    //   })
    // };
    try {
      dispatch(userLogin(loginBody))
        setLoginData({
          username: "",
          password: "",
        });
        handleClose();
        setError(false);      
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toAdmin = () => {
    if(admin && Object.keys(admin).length>0)
    dispatch(adminLogout())
    setAccount('')
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Wrapper>
        <Image>
          <h2 style={{ color: "white", padding: 20 }}>Login</h2>
          <Typography style={{ color: "#f2f2f2", padding: 20, fontSize: 14 }}>
            Get access to your orders, whishlist and Recommendations
          </Typography>
        </Image>
        <LoginForm>
          {error && (
            <Typography
              style={{ color: "#ff6161", lineHeight: 0, fontSize: 10 }}
            >
              Inavlid username or password
            </Typography>
          )}
          <TextField
            variant="standard"
            label="Enter Username/Email"
            name="username"
            value={loginData.username}
            onChange={handleInputChange}
          />
          <TextField
            type="password"
            variant="standard"
            label="Enter Password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
          />
          <Typography style={{ fontSize: 10 }}>
            By continuing, you agree To Flipkart's Terms of use and Privacy
            Policy
          </Typography>
          <Button
            variant="contained"
            style={{ background: "#FB641B" }}
            onClick={Login}
          >
            Login
          </Button>
          <Typography style={{ textAlign: "center" }}>OR</Typography>
          <Link to='/admin'style={{textDecoration:'none', color:'#2874f0'}}><Button onClick={toAdmin}>To Admin Page &nbsp;<span><Forward /></span></Button></Link>

          <Typography
            style={{
              fontSize: 12,
              textAlign: "center",
              color: "#2874f0",
              cursor: "pointer",
            }}
          >
            <Link
              to="/signup"
              style={{ textDecoration: "none" , color:'inherit'}}
              onClick={handleClose}
            >
              New to Flipkart?Create new Account
            </Link>
          </Typography>
        </LoginForm>
      </Wrapper>
    </Dialog>
  );
};

export default LoginDialog;
