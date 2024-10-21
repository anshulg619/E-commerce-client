import { Box, styled, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'

const Header = styled(Box)`
padding:15px 24px;
border-bottom:1px solid #f0f0f0;
background:#fff;
`
const Heading = styled(Typography)`
color: #878787;
`

const Container = styled(Box)`
padding: 15px 24px;
background: #fff;
& > p{
margin-bottom:20px;
font-size:14px;
}
`
const Price = styled(Box)`
float:right;
`

const Discount = styled(Box)`
float:right;
color:green;
`


const TotalAmount = styled(Typography)`
padding:20px 0
border-top:1px dashed #e0e0e0;
font-size:18px;
font-weight:600;
border-bottom:1px dashed #e0e0e0;
`

const TotalView = ({cartItems}) => {

    const [price, setPrice] = useState(0);
    const [discount,setDiscount] = useState(0);


    useEffect(() => {
        totalAmount();
    })

    const totalAmount = () => {
        let price=0 ; let discount = 0 ;

        cartItems.map(items => {

                price+= items.price.mrp;

                discount+= (items.price.mrp -items.price.cost);
                
                return {price, discount};
        })
        setPrice(price);
        setDiscount(discount);
    }

  return (
    <Box>
      <Header>
        <Heading>PRICE DETAILS</Heading>
      </Header>
      <Container>
        <Typography>
            Price ({cartItems?.length} item)
            <Price component='span'>₹{price}</Price>
        </Typography>
      
      <Typography>
           Discount
            <Discount component='span'>-₹{discount}</Discount>
        </Typography>

        <Typography>
            Delivery
            <Price component='span'>{price>500 ? '₹0':'₹40'}</Price>
        </Typography>

        <TotalAmount>
            Total Amount
            <Price component='span'>₹{price>500 ? (price-discount):(price+40-discount)}</Price>
        </TotalAmount>

        <Typography style={{color:'green'}}>You will save ₹{price>500 ? discount:discount - 40} on this order</Typography>
      </Container>
      
    </Box>
  )
}

export default TotalView