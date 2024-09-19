import React from 'react'
import {Box,Button,Typography,styled} from '@mui/material';
import GroupButton from './GroupButton';
import {removeFromCart} from '../../redux/action/cartAction'

import {useDispatch,useSelector} from 'react-redux';
import UserServices from '../../services/UserServices';



const Component = styled(Box)`
border:1px solid #f0f0f0;
display:flex;
`

const LeftComponent = styled(Box)`
margin:20px;
display:flex;
flex-direction:column;
`

const RightComponent = styled(Box)`
margin:20px
`
const CartItems = ({item}) => {
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'

    const dispatch = useDispatch();

    const {user} = useSelector(state => state.user)

    const removeItemFromCart = (id) => {
        const data = {
            user:user.user.id,
            product:id
        }
        UserServices.removeProduct(data,user.token)
        .then((response) => {
            console.log(response.data)
            dispatch(removeFromCart(id))
        }).catch((error) => {
            console.log(error.message)
        }
        )        
    }

  return (
    <Component>
        <LeftComponent>
            <img src={item.url} alt={item.product_id} style={{height:110, width:110}}/>
            <GroupButton/>
        </LeftComponent>
        <RightComponent>
            <Typography>{item.title.longTitle}</Typography>
            <Typography style={{fontSize:'14px', color:'#878787', marginTop:10}}>
                Seller:{item.seller} &nbsp;
                <Box component='span'><img src={fassured} style={{width:'50px', marginLeft:'10px'}}alt='fassured'/></Box>
            </Typography>
            <Typography style={{margin:'20px 0px'}}>
                <Box component='span' style={{fontSize:'18px', fontWeight:600}}>₹{item.price.cost}</Box>&nbsp;&nbsp;&nbsp;                                                                                      
                <Box component='span' style={{color:'#878787'}}><strike>₹{item.price.mrp}</strike></Box>&nbsp;&nbsp;&nbsp;
                <Box component='span' style={{color:'#388E3C'}}>{item.price.discount} off</Box>
            </Typography>
            <Button style={{color:'#000', marginTop:'20px'}} onClick={() =>{removeItemFromCart(item._id)}}>Remove</Button>
        </RightComponent>      
    </Component>
  )
}

export default CartItems
