import React ,{useState,useEffect,useContext} from "react";
import {Link} from 'react-router-dom';
import { styled, Box, Typography,Button, Badge } from "@mui/material";
import {useDispatch,useSelector} from 'react-redux';
import { LoginContext } from "../../context/ContextProvider";
//material UI Icons imports
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {Storefront as Store, ShoppingCart as Cart, Favorite as FavIcon} from "@mui/icons-material";

import LoginDialog from "../Login/LoginDialog";
import Profile from "./Profile.jsx";
import { userCartAction } from "../../redux/action/cartAction.js";


const StyledButton = styled(Button)({
  color: 'Black',
  display: 'flex',
  padding: '5px 10px',
  background:'#fff',
  '&:hover':{
    background: 'blue',
    color:'white',
  }
})
  

const Wrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  margin: '0 3% 0 auto',
  '& > *': {
        marginRight: '40px !important',
        textDecoration: 'none',
        fontSize: 12,
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            color: '#2874f0',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            marginTop: 10
        }
    },
    [theme.breakpoints.down('md')]: {
        display: 'block'
    }
}))

const Text = styled(Typography)`
font-size:14px;
`
  

const Typo = styled(Box)`
  color: Black;
  display: flex;
`;

const Linked = styled(Link)({
  color: 'Black',
  display: 'flex',
  textDecoration:'none'
})


const Buttons = () => {
  const [open, setOpen]= useState(false)

  const {account, setAccount} = useContext(LoginContext);

  const dispatch = useDispatch();

  const {cartItems} = useSelector(state => state.cart)
  const {savedItems} = useSelector(state => state.list)

  const {user} = useSelector(state => state.user)


  useEffect(() => {
    if(user&&Object.keys(user).length>0){
      const {username, id} = user.user
      setAccount(username)
      dispatch(userCartAction(id,user.token))
    }

  },[user,dispatch])

  const handleClick = () => {
    setOpen(true);
  }


  const handleClose = () => {
    
    setOpen(false);
  }
  return (
    <Wrapper>
    {
    account ? (
    <Profile account = {account}  setAccount={setAccount}/>
    ):(
        <StyledButton variant="contained" onClick ={handleClick} 
         onClose={handleClose}
        >
          <AccountCircleOutlinedIcon />&nbsp;
          <Text>Login</Text>
        </StyledButton>
    )}
  
        <Typo>
        <Store/>&nbsp;
        <Text>Become a Seller</Text>
      </Typo>

      <Linked to='/cart'>
        <Badge badgeContent={cartItems?.length} color="secondary">
          <Cart />
        </Badge>&nbsp;
        <Text>Cart</Text>
      </Linked>
      <Linked  to='/savedList'>
      <Badge badgeContent={savedItems?.length} color="secondary">
          <FavIcon />
        </Badge>
        <Text>Saved</Text>
      </Linked>     
    <LoginDialog open={open} setOpen = {setOpen} setAccount={setAccount} />
    </Wrapper>
  );
};


export default Buttons;



      
