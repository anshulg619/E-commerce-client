import { Box, styled, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import{Link, useLocation} from 'react-router-dom';
import { KeyboardArrowRight, Email, PermIdentity } from '@mui/icons-material';

const Image = styled('img')({
width:'100px',
height:'100px',
borderRadius:'50%',
border:'1px solid black',
marginBottom:'7px',
objectFit:'contain'

})

const ProfileBox = styled(Box)`
display:flex;
justify-content:center;
align-items:center;
margin:20x 0px;
`

const Wrapper = styled(Box)`
background:#fff;
margin:80px 160px;
padding: 15px 30px;
`

const CredBox = styled(Box)`
display:flex;
flex-direction:column;
margin-left:20px;
`

const Linked = styled(Link)({
    textDecoration:'none',
    color:'#2874f0',
    padding:'5px 10px',
    borderBottom:'1px solid #f2f2f2',
    display:'flex',
    alignItems:'center',
})

const Credential = styled(Typography)`
color:#2874f0;
display:flex;
justify-content:left;
align-items:center
margin-bottom:20px;
`

const BoxLink = styled(Box)`
display:flex;
flex-direction:column;
margin:30px 10px;
`

const UserProfile = () => {

  

    const {user} = useSelector(state => state.user)

  return (
    <Box>    
    <Wrapper>
    <ProfileBox>
        <Image src={`http://localhost:8080/flipkart/userFiles/${user.user.photo}`} alt={user.user.username} />
        <CredBox>
        <Credential><PermIdentity/>&nbsp;{user.user.username}</Credential>
        <Credential><PermIdentity/>&nbsp;{user.user.fullName}</Credential>
        <Credential><Email/>&nbsp;{user.user.email}</Credential>
        </CredBox>
    </ProfileBox>
    <BoxLink>
    <Linked to='/user/update'>Update Profile&nbsp;&nbsp;<KeyboardArrowRight/></Linked>
    <Linked to='user/orders'>Your Orders&nbsp;&nbsp;<KeyboardArrowRight/></Linked>
    <Linked to='/savedList'>Your Saved Items&nbsp;&nbsp;<KeyboardArrowRight/></Linked>
    <Linked to = '/cart'>Your Cart &nbsp;&nbsp;<KeyboardArrowRight/></Linked>    
    </BoxLink>
    </Wrapper>
    </Box>
  )
}

export default UserProfile
