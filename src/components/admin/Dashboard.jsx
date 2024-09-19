import { Box, Typography, styled } from '@mui/material'
import { AccountCircleOutlined, ShoppingCart, Inventory, Category } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'

const Wrapper = styled(Box)`
display:flex;
justify-content:space-evenly;
margin:120px 100px
`
const StyledDiv = styled(Link)`
text-decoration:none;
border-radius:5px;
box-shadow:10px;
padding:10px;
background:#fff;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
color:brown;
font-weight:600;
`

const Dashboard = () => {
  return (
    <>
    <h1 style={{textAlign:'center'}}>Welcome To Admin Dashboard</h1>
    <Wrapper>
      <StyledDiv>
        <AccountCircleOutlined fontSize='large' style={{color:'brown'}}/>
        <Typography>Users(13)</Typography>
      </StyledDiv>
      <StyledDiv to ='/admin/orderList'>
        <ShoppingCart fontSize='large' style={{color:'brown'}}/>
        <Typography>Orders(12)</Typography>
      </StyledDiv>
      <StyledDiv to="/admin/productList">
        <Inventory fontSize='large' style={{color:'brown'}} />
        <Typography>Products(14)</Typography>
      </StyledDiv>
      <StyledDiv to='/admin/categoryList'>
        <Category fontSize='large' style={{color:'brown'}} />
        <Typography>categories(15)</Typography>
      </StyledDiv>
    </Wrapper>
    </>
  )
}

export default Dashboard
