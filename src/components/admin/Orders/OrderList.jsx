import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {TableContainer, TableRow, TableHead, TableCell, TableBody,
    Table, Paper,Button, Box, Typography, styled
} from '@mui/material';
import { Link } from 'react-router-dom';
import { getOrdersAction } from '../../../redux/action/orderAction';

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

const OrderList = () => {

    const dispatch = useDispatch();
    const {order} = useSelector(state => state.order)
    const {admin} = useSelector(state => state.admin)
    useEffect(() => {
        dispatch(getOrdersAction(admin.token))
    },[dispatchEvent])
  return (

    <>
    <Header>
      <Typography style={{fontSize:24,}}>ORDER LIST:</Typography>
      <BoxLink>
        <Link to="/admin/dashboard" style={{textDecoration:'none', marginRight:30,color:'inherit'}}>BACK TO HOME</Link>
        {/*<Link to="/admin/addproduct" style={{textDecoration:'none', marginRight:30,color:'inherit'}}>LIST A PRODUCT</Link>*/}
      </BoxLink>
    </Header>
    <TableContainer component={Paper} sx={{margin:'5px 10px', width:'98%'}}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>OrderId</TableCell>
          <TableCell>UserId</TableCell>
          <TableCell align="right">Address</TableCell>
          <TableCell align="right">Name</TableCell>
          <TableCell align="right">Status</TableCell>
          <TableCell>View Order</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {order.map((item) => (
          <TableRow
            key={item._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {item._id}
            </TableCell>
            <TableCell>{item.user}</TableCell>
            <TableCell align="right">{item.shippingAddress.line1},
                {item.shippingAddress.city},{item.shippingAddress.state},{item.shippingAddress.zipCode}
                </TableCell>
            <TableCell align="right">{item.shippingAddress.name}</TableCell>
            <TableCell align="right">{item.orderStatus}</TableCell>
            <TableCell><Link style={LinkStyle}><Button>View</Button></Link></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </>
  )
}

export default OrderList;
