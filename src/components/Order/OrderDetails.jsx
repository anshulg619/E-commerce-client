import React from'react';
import {useSelector} from 'react-redux';
import { Box, Typography,styled} from '@mui/material';
import PriceDetail from './PriceDetail';
import TotalView from '../Cart/TotalView';


const Image = styled('img')({
    width:'110px',
    height:'110px',
    border:'1px solid #f0f0f0'
})

const Wrapper = styled(Box)`
padding:15px 24px;
background:#f2f2f2;
`

const ProductBox = styled(Box)`
background:#fff;
margin:10px 0px;
padding:15px 25px;
display: flex;
border: 1px solid f0f0f0;
`

const Details = styled(Box)`
background:#fff;
margin:10px 0px;
padding:15px 24px;
` 
const Info = styled(Typography)`
font-size:14px;
color:inherit;
padding:0px 5px;
`

const OrderDetails = ({address, products,setProducts, setTotal}) => {
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'
    const {product} = useSelector(state => state.getProductDetails)
    const {cartItems} = useSelector(state => state.cart)  

    let newProducts=[];
    let totalPrice= 0 ;
    let newTotal;

    if(Object.keys(product).length>0){
        
        newProducts=[{
            product:product._id,
            price:product.price.cost
        }]
        
        totalPrice = product.price.cost;
       
    }else{
        if(cartItems.length>0){
            newProducts=cartItems.map((item) => {
                return(
                {
                product:item._id,
                price:item.price.cost
                }
            )})

            totalPrice = cartItems.reduce((acc, item) => acc + item.price.cost, 0);
            
        }
    }
    if (JSON.stringify(newProducts) !== JSON.stringify(products)) {
        console.log('Updating products:', newProducts);
        setProducts(newProducts);
    }
    newTotal = totalPrice< 500 ? totalPrice+40 : totalPrice
    setTotal(newTotal);
        
    return(
        <Wrapper>
            {
                Object.keys(product).length > 0 ? (
                    <Box>
                    <ProductBox>
                        <Image src={product.url} alt={product.product_id} />
                        <Box style={{marginLeft:10}}>
                        <Typography>{product.title.longTitle}</Typography>
                        <img src={fassured} alt='fassured' style={{ width:'50px'}}/>
                        <Typography>
                            <Box component='span'style={{fontSize:18,fontWeight:600}}>{product.price.cost}</Box>&nbsp;&nbsp;
                            <Box component='span' style={{color:'#878787'}}><strike>{product.price.mrp}</strike></Box>&nbsp;&nbsp;
                            <Box component='span' style={{color:'green'}}>{product.price.discount}</Box>
                        </Typography>
                        </Box>
                    </ProductBox>
                    <Details>
                        <Typography style={{fontSize:18,fontWeight:600}}>Shipping Details:</Typography>
                        <Info>{address.name}</Info>
                        <Info>{address.phone}</Info>
                        <Typography style={{fontSize:14,fontWeight:600,padding:'0px 5px'}}>Address:</Typography>
                        <Info>{address.line1},</Info>
                        <Info>
                            <Box component='span'>{address.city},</Box>
                            <Box component='span'>{address.state},</Box>
                            <Box component='span'>{address.ZipCode},</Box>
                        </Info>
                        <Info>{address.country}</Info>
                    </Details>
                    <PriceDetail product={product} />
                    </Box>
      

                ):cartItems.length > 0 ? (
                    <Box>
                    {
                        cartItems.map((items) => {
                           return (
                            <ProductBox>
                                <Image src={items.url} alt={items.product_id} />
                                <Box style={{marginLeft:10}}>
                                    <Typography>{items.title.longTitle}</Typography>
                                    <img src={fassured} alt='fassured' style={{ width:'50px'}}/>
                                    <Typography>
                                    <Box component='span'style={{fontSize:18,fontWeight:600}}>{items.price.cost}</Box>&nbsp;&nbsp;
                                    <Box component='span' style={{color:'#878787'}}><strike>{items.price.mrp}</strike></Box>&nbsp;&nbsp;
                                    <Box component='span' style={{color:'green'}}>{items.price.discount}</Box>
                                    </Typography>
                                </Box>
                            </ProductBox>
                           ) 
                        })
                    }   
                    <Details>
                        <Typography style={{fontSize:18,fontWeight:600}}>Shipping Details:</Typography>
                        <Info>{address.name}</Info>
                        <Info>{address.phone}</Info>
                        <Typography style={{fontSize:14,fontWeight:600,padding:'0px 5px'}}>Address:</Typography>
                        <Info>{address.line1},</Info>
                        <Info>
                            <Box component='span'>{address.city},</Box>
                            <Box component='span'>{address.state},</Box>
                            <Box component='span'>{address.pin},</Box>
                        </Info>
                        <Info>{address.country}</Info>
                    </Details>
                    <TotalView cartItems={cartItems} />
                    </Box>

                ):(
                    <Typography>No items in cart</Typography>
                )}
            </Wrapper>
        
    )
}

export default OrderDetails;