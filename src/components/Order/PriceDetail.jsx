import { Box, Typography, styled } from '@mui/material';
import React from 'react';


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




const PriceDetail = ({product}) => {

    const discount = (product.price.mrp - product.price.cost)

    
    return(
        <Box>
            <Header>
        <Heading>PRICE DETAILS</Heading>
      </Header>
      <Container>
        <Typography>
            Price (1 item)
            <Price component='span'>₹{product.price.mrp}</Price>
        </Typography>
      
      <Typography>
           Discount
            <Discount component='span'>-₹{discount}</Discount>
        </Typography>

        <Typography>
            Delivery
            <Price component='span'>{product.price.cost > 500 ?'₹0':'₹40'}</Price>
        </Typography>

        <TotalAmount>
            Total Amount
            <Price component='span'>₹{product.price.cost > 500 ? product.price.cost:product.price.cost+40}</Price>
        </TotalAmount>

        <Typography style={{color:'green'}}>You will save ₹{product.price.cost > 500 ? discount:discount - 40} on this order</Typography>
      </Container>
      
    </Box>
    )
}

export default PriceDetail;