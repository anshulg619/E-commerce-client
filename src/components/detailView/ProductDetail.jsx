import { Box, Grid, styled, Typography } from '@mui/material'
import React, {useEffect, useState} from 'react'
import RightComponent from './RightComponent'
import LeftComponent from './LeftComponent'

import {useDispatch, useSelector} from 'react-redux'
import { getProductDetail } from '../../redux/action/productAction'
import {useParams} from 'react-router-dom';

const RightContainer = styled(Grid)`
  margin-top:'50px';
  & > p {
    margin-top:10px
  }
  `
  const Container = styled(Grid)(({theme}) =>({
    display:'flex',
    background:'#fff',
    [theme.breakpoints.down('md')]:{
    margin:0,
    display:'block',
    }
    }))

const ProductDetail = () => {

  const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'

    const{id} =useParams();
    const dispatch = useDispatch();
    const { loading, product } = useSelector(state => state.getProductDetails)
    const [colorIndex,setColorIndex] = useState(0);

    const handleIndex = (index) => {
      setColorIndex(index)
    }

    

    useEffect(() => {
      if(product && id !== product._id)
        dispatch(getProductDetail(id))
    },[dispatch,id,loading,product])

    console.log(product)
  return (
    <Box style={{marginTop:55, background:'#f2f2f2'}}>
    {product && Object.keys(product).length &&
    <Container>
    <Grid lg={4} md={4} sm={12} xs={12}>
        <RightComponent product={product} colorIndex={colorIndex}/>
    </Grid>
    <RightContainer lg={8} md={8} sm={12} xs={12}>
      <Typography style={{fontWeight:600}}>{product.title.longTitle}</Typography>
      <Typography><img src={fassured} style ={{width:77,}}alt='fassured'/></Typography>
      <Typography>
        <span style={{fontSize:28}}>₹{product.price.cost}</span>&nbsp;&nbsp;&nbsp;
        <span style={{color:'#878787'}}><strike>₹{product.price.mrp}</strike></span>&nbsp;&nbsp;&nbsp;
        <span style={{color:'#388E3C'}}>{product.price.discount} off</span>
      </Typography>
      <LeftComponent product={product} handleIndex={handleIndex}/>
    </RightContainer>
    </Container>    
    }      
    </Box>
  )
}

export default ProductDetail
