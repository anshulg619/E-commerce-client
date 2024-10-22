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

    const [error, setError] = useState({});
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName) newErrors.firstName = "First Name is required.";
    if (!formData.lastName) newErrors.lastName = "Last Name is required.";
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    
    if (!formData.username) newErrors.username = "Username is required.";
    
    // Phone number validation (example: must be numeric)
    if (!formData.phoneNumber || isNaN(formData.phoneNumber)) {
      newErrors.phoneNumber = "Valid phone number is required.";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required.";
    }
    
    if (formData.password !== formData.confirm) {
      newErrors.confirm = "Passwords do not match.";
    }
  
    return newErrors;
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
  
  if (Object.keys(validationErrors).length > 0) {
    setError(validationErrors);
    return;
  }

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

    /*if (formData.confirm === formData.password) {
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
    }*/


    UserServices.addNewAdmin(formBody)
        .then((res) => {
          console.log(res.data);
          navigate('/admin');
          alert("Please Login to continue")
        })
        .catch((error) => {
          console.log("error:" + error.message);
        });
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
            error={!!error.firstName}
            helperText={error.firstName}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            name="lastName"
            value={formData.lastName}
            label="LastName"
            error={!!error.lastName}
            helperText={error.lastName}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            name="email"
            value={formData.email}
            label="Email"
            error={!!error.email}
            helperText={error.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            name="username"
            value={formData.username}
            label="Username"
            error={!!error.username}
            helperText={error.username}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            name="phoneNumber"
            value={formData.phoneNumber}
            label="Phone Number"
            error={!!error.phoneNumber}
            helperText={error.phoneNumber}
            onChange={handleChange}
          />
          
          <TextField
            variant="outlined"
            name="password"
            value={formData.password}
            label="Enter Password"
            error={!!error.password}
            helperText={error.password}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            name="confirm"
            value={formData.confirm}
            label="Confirm Password"
            error={!!error.confirm}
            helperText={error.confirm}
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
