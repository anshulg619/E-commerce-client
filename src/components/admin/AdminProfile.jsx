import React from 'react'
import {Box, Typography, styled,Button} from '@mui/material'
import {PermIdentity, Email,} from '@mui/icons-material'
import { useSelector } from 'react-redux'
const ProfileBox = styled(Box)`
display:flex;
justify-content:center;
align-items:center;
margin:80x 160px;
background:#fff;
`

const CredBox = styled(Box)`
display:flex;
flex-direction:column;
margin-left:20px;
`
const Credential = styled(Typography)`
color:#2874f0;
display:flex;
justify-content:left;
align-items:center;
margin-bottom:20px;
`

const Image = styled('img')({
  width:'100px',
  height:'100px',
  borderRadius:'50%',
  border:'1px solid black',
  marginBottom:'7px',
  objectFit:'contain'  
  })
  


const AdminProfile = () => {

  const {admin} = useSelector(state => state.admin)

  return (
    <Box>
    <ProfileBox>
        <Image src={`http://localhost:8080/flipkart/userFiles/${admin.user.photo}`} alt={admin.user.username} />
        <CredBox>
        <Credential><PermIdentity/>&nbsp;{admin.user.username}</Credential>
        <Credential><PermIdentity/>&nbsp;{admin.user.fullName}</Credential>
        <Credential><Email/>&nbsp;{admin.user.email}</Credential>
        </CredBox>
    </ProfileBox>
    <Button variant='contained'>Update</Button>
    <Button variant='contained'>Delete</Button>
    </Box>
  )
}

export default AdminProfile
