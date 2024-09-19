import React,{useContext, useState} from 'react'
import {Box, Button, Typography, styled, TextField} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { LoginContext } from '../../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../redux/action/loginAction';


const Wrapper = styled(Box)`
  height: 70vh;
  width: auto;
  padding:0px 24px;
  display: flex;
  margin: 80px 200px;
`;

const Image = styled(Box)`
background: #2874f0 url('https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png') center 85% no-repeat;
background-size:300px 150px;
background-color:brown;
padding:45px 35px;
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
const AdminHome = () => {
    const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const {admin} = useSelector(state => state.admin)

  const {setAccount} = useContext(LoginContext)

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });


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
  
    try {
        dispatch(adminLogin(loginBody));
        //handleClose();
        setError(false);
        navigate('/admin/dashboard')
        setAccount(admin.user.username);
        
        setLoginData({
          username: "",
          password: "",
        });
        
      } catch (error) {
        console.log(error.message);
      }
    };

  return (
    <Wrapper>
        <Image>
          <h2 style={{ color: "white", padding: 20 }}>Login</h2>
          <Typography style={{ color: "#f2f2f2", padding: 20, fontSize: 14 }}>
            Get admin access to your web application management tools
          </Typography>
        </Image>
        <LoginForm>
            <Typography style={{fontSize:'20px',fontWeight:'600px'}}>Welcome To Admin DashBoard</Typography>
          {error && (
            <Typography
              style={{ color: "#ff6161", lineHeight: 0, fontSize: 10 }}
            >
              Inavlid username or password
            </Typography>
          )}
          <TextField
            variant="outlined"
            label="Enter Username/Email"
            name="username"
            value={loginData.username}
            onChange={handleInputChange}
          />
          <TextField
            type="password"
            variant="outlined"
            label="Enter Password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
          />
          <Typography style={{ fontSize: 10 }}>
            By continuing, you agree To Terms of use and Privacy
            Policy
          </Typography>
          <Button
            variant="contained"
            style={{ background: "#FB641B" }}
            onClick={Login}
          >
            continue
          </Button>
          </LoginForm>
        </Wrapper>
      
  )
}

export default AdminHome
