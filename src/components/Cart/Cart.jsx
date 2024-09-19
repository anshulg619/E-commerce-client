import React, {useContext, useState} from "react";
import { Box, Grid, Typography,styled,Button } from "@mui/material";
import { useSelector, useDispatch} from "react-redux";
import { resetProductDetail} from "../../redux/action/productAction";
import {useNavigate} from 'react-router-dom';
import LoginDialog from '../Login/LoginDialog';



//componente import
import EmptyCart from "./EmptyCart";
import CartItems from "./CartItems";
import TotalView from "./TotalView";
import { LoginContext } from "../../context/ContextProvider";

const Component = styled(Grid)(({theme}) => ({
padding:'30px 135px',
display:'flex',
[theme.breakpoints.down('md')]:{
  padding:'15px 0px'
}

}))

const LeftComponent = styled(Grid)(({theme}) => ({
    padding:'0px 10px',
    [theme.breakpoints.down('md')]:{
      marginBottom:10
    }

    }))

const Header = styled(Box)({
        padding:'10px 24px',
        background:'#fff'
        })

const BottomWrapper = styled(Box)`
  padding: 16px 22px;
    background: #fff;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
    border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
    display:flex;
    margin-left: auto;
    background: #fb641b;
    color: #fff;
    border-radius: 2px;
    width: 250px;
    height: 51px;
`

const Cart = () => {

    const {cartItems} = useSelector(state => state.cart) 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open,setOpen] = useState(false);
    const {account,setAccount} = useContext(LoginContext);

    const handleClick = () => {
      if(account){
      dispatch(resetProductDetail());
      navigate('/order')
      }else{
        setOpen(true)
      }
    }
  
  return (
    <>
      {cartItems.length ? (
        <Component container>
          <LeftComponent lg={9} md={9} sm={12} xs={12}>
            <Header>
              <Typography style={{fontWeight:600, fontSize:18}}>MyCart({cartItems.length})</Typography>
            </Header>
            <Box style={{background:'#fff'}}>
            {
                cartItems.map((item) => {
                    return(<CartItems item = {item} />)
                })
              }
            </Box>
            <BottomWrapper>
              <StyledButton variant='contained' onClick={handleClick}>Place order</StyledButton>
            </BottomWrapper>
          </LeftComponent>
          <Grid lg={3} md={3} sm={12} xs={12}>
             <TotalView  cartItems={cartItems}/> 
          </Grid>
        </Component>
      ) : (
        <EmptyCart />
      )}
      <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} />
    </>
  );
};

export default Cart;
