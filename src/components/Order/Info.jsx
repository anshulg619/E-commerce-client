import React from 'react';
import {TextField, Box, styled,Typography} from '@mui/material'

const Wrapper= styled(Box)`
display:flex;
flex-direction:column;
margin:10px 24px;
padding:30px 100px;
background:#fff;
`

const Text = styled(Typography)`
font-Weight:600;
margin:10px 5px 0px 5px;

`

const Input = styled(TextField)`
width:100%
`

const Info = ({address, setAddress,error}) => {

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAddress( prevData => ({
            ...prevData,
            [name]: value
        })
        )
    }

    

    return(
        <Wrapper>
         <Text>Personal Info:</Text>   
        <Input variant='standard' label='Name' name='name' value={address.name}
        error = {!!error.name} helperText={error.name} onChange={handleChange} required/>
        <Input variant='standard' label='Phone' name='phone' value={address.phone}
        error={!!error.phone} helperText={error.phone} onChange={handleChange} required/>
        <Text>Shipping Address:</Text>
        <Input variant='standard' label='Address Line 1'  name='line1'value={address.line1} 
        error={error.line1} helperText={error.line1}onChange={handleChange} required/>
        <Input variant='standard' label='Address Line 2'  name='line2'value={address.line2} onChange={handleChange}/>
        <Input variant='standard' label='Address Line 3'  name='line3'value={address.line3} onChange={handleChange}/>        <Box>
        <TextField variant='standard' label='City' 
        style={{width:'54%', marginRight:10}} 
        name='city' value={address.city} required
        error={!!error.city} helperText={error.city}
        onChange={handleChange}/>

        <TextField variant='standard' label='PIN' style={{width:'44%'}} 
        name='zipCode' value={address.zipCode} 
        error={!!error.zipCode} helperText={error.zipCode} onChange={handleChange} required/>
        </Box>
        <Input variant='standard' label='State' name='state' value={address.state} 
        error={!!error.state} helperText={error.state} onChange={handleChange} required/>
        <Input variant='standard' label='Country' name='country' value={address.country} 
        error={!!error.country} helperText={error.country} onChange={handleChange} required/>
        </Wrapper>
    )
}

export default Info;