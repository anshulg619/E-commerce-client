import { Typography,Box, TextField, Button,styled, Input } from "@mui/material";
import React, { useState,} from "react";
import UserServices from "../../services/UserServices";
import {useNavigate} from 'react-router-dom';

const Image = styled(Box)`
background: brown url('https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png') center 85% no-repeat ;
paddding:45px 35px;
display:flex;
flex-direction:column;
width:35%;
`;

const Wrapper = styled(Box)`
  margin: 80px 180px;
  padding-right: 24px;
  display: flex;
  background:#fff;
  height:90vh;
`;

const SignUpForm = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  width:60%;
  text-align:center;
`;





const AdminSignUp = () => {

    const [error, setError] = useState(false);
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    phoneNumber: "",
    password: "",
    confirm: "",
    profilePhoto:null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profilePhoto: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formBody = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      username: formData.username,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      profilePhoto:formData.profilePhoto
    };
    console.log(formBody);

    if (formData.confirm === formData.password) {
      setError(false);
      UserServices.addNewAdmin(formBody)
        .then((res) => {
          console.log(res.data);
          navigate('/admin');
          alert("Please Login to continue")
        })
        .catch((error) => {
          console.log("error:" + error.message);
        });
    } else {
      setError(true);
    }
  };

  return (
    <>
      <Wrapper>
        <Image>
          <Typography style={{ color: "white", padding: 20,}}>Lookslike you're new here</Typography>
          <Typography style={{ color: "#f2f2f2", padding: 20, fontSize: 14 }}>
          Sign Up to access the web application admin privileges
          </Typography>
        </Image>

        <SignUpForm>
          <TextField
            variant="outlined"
            name="firstName"
            value={formData.firstName}
            label="FirstName"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            name="lastName"
            value={formData.lastName}
            label="LastName"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            name="email"
            value={formData.email}
            label="Email"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            name="username"
            value={formData.username}
            label="Username"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            name="phoneNumber"
            value={formData.phoneNumber}
            label="Phone Number"
            onChange={handleChange}
          />
          {error && (
            <Typography
              style={{ color: "#ff6161", lineHeight: 0, fontSize: 10 }}
            >
              Password doesn't match
            </Typography>
          )}
          <TextField
            variant="outlined"
            name="password"
            value={formData.password}
            label="Enter Password"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            name="confirm"
            value={formData.confirm}
            label="Confirm Password"
            onChange={handleChange}
          />
          <Input type="file"  name='profilePhoto' onChange={handleFileChange} />
          <Button
            onClick={handleSubmit}
            variant="contained"
            style={{ background: "#FB641B" }}
          >
            Continue
          </Button>
        </SignUpForm>
      </Wrapper>
    </>
  );
};

export default AdminSignUp;
