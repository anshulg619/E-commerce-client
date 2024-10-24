import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../../redux/action/productAction';
import {TableContainer, TableRow, TableHead, TableCell, TableBody,
    Table, Paper,Button, Box, Typography, styled
} from '@mui/material';
import { Link } from 'react-router-dom';

const LinkStyle = {
    textDecoration:'none',
    color:'inherit'
}

const Header = styled(Box)`
display:flex;
margin: 5px 10px;
padding:5px 10px;
background:#fff;
`
const BoxLink = styled(Box)`
display:flex;
align-items:center;
margin-left:auto;
font-size:14 px
padding:5px 10px;
color:#2874f0;
`

const ProductList = () => {

    const dispatch = useDispatch();
    const {products} = useSelector(state => state.getProducts)
    useEffect(() => {
        dispatch(getProducts())
    },[dispatch])
  return (

    <>
    <Header>
      <Typography style={{fontSize:24,}}>PRODUCTS LIST:</Typography>
      <BoxLink>
        <Link to="/admin/dashboard" style={{textDecoration:'none', marginRight:30,color:'inherit'}}>BACK TO HOME</Link>
        <Link to="/admin/addproduct" style={{textDecoration:'none', marginRight:30,color:'inherit'}}>LIST A PRODUCT</Link>
      </BoxLink>
    </Header>
    <TableContainer component={Paper} sx={{margin:'5px 10px', width:'98%'}}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>ProductId</TableCell>
          <TableCell>Title</TableCell>
          <TableCell align="right">MRP</TableCell>
          <TableCell align="right">Price</TableCell>
          <TableCell align="right">CategoryId</TableCell>
          <TableCell>View Product</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((item) => (
          <TableRow
            key={item._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {item._id}
            </TableCell>
            <TableCell>{item.title.longTitle}</TableCell>
            <TableCell align="right">{item.price.mrp}</TableCell>
            <TableCell align="right">{item.price.cost}</TableCell>
            <TableCell align="right">{item.category}</TableCell>
            <TableCell><Link to={`admin/productView/${item._id}`} style={LinkStyle}><Button>View</Button></Link></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </>
  )
}

export default ProductList
