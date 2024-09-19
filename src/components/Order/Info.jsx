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

const Info = ({address, setAddress}) => {

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
        <Input variant='standard' label='Name' name='name' value={address.name} onChange={handleChange}/>
        <Input variant='standard' label='Phone' name='phone' value={address.phone}onChange={handleChange} />
        <Text>Shipping Address:</Text>
        <Input variant='standard' label='Address Line 1'  name='line1'value={address.line1} onChange={handleChange} />
        <Input variant='standard' label='Address Line 2'  name='line2'value={address.line2} onChange={handleChange}/>
        <Input variant='standard' label='Address Line 3'  name='line3'value={address.line3} onChange={handleChange}/>        <Box>
        <TextField variant='standard' label='City' 
        style={{width:'54%', marginRight:10}} 
        name='city' value={address.city}
        onChange={handleChange}/>

        <TextField variant='standard' label='PIN' style={{width:'44%'}} 
        name='zipCode' value={address.zipCode} onChange={handleChange}/>
        </Box>
        <Input variant='standard' label='State' name='state' value={address.state} onChange={handleChange}/>
        <Input variant='standard' label='Country' name='country' value={address.country} onChange={handleChange} />
        </Wrapper>
    )
}

export default Info;