import React, { useContext, useState } from 'react'
import { Box, Typography, Table, TableBody, TableRow, TableCell, styled, TextField, Button } from '@mui/material';
import { LocalOffer as Badge } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux';
import UserServices from '../../services/UserServices';
import { getProductDetail } from '../../redux/action/productAction';
import LoginDialog from '../Login/LoginDialog';
import { LoginContext } from '../../context/ContextProvider';


const SmallText = styled(Box)`
    font-size: 14px;
    vertical-align: baseline;
    & > p {
        font-size: 14px;
        margin-top: 10px;
    }
`

const ColumnText = styled(TableRow)`
    font-size: 14px;
    vertical-align: baseline;
    & > td {
        font-size: 14px;
        margin-top: 10px;
    }
`

const StyledBadge = styled(Badge)`
    margin-right: 10px;
    color: #00CC00;
    font-size: 15px;
`;

const Image = styled('img')({
   height:'30px',
   width:'30px',
   objectFit:'contain',
   borderRadius:'2px' 
})

const LeftComponent = ({ product,handleIndex }) => {
    const adURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';
    const date = new Date(new Date().getTime()+(5*24*60*60*1000));


    const {user} = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [open,setOpen] = useState(false)
    const {account,setAccount} =useContext(LoginContext)

    const [review, setReview] = useState({
        product:product._id,
        rating:1,
        comment:''
    })

    

    const handleChange = (e) => {
        e.preventDefault()

        const {name, value} = e.target;

        setReview((prevdata) => ({
            ...prevdata,
            [name]:value
        }))

    }

    const handleClick = () => {

        if(account){
        const token = user.token
        const comment={
        user:user.user.id,
        product:review.product,
        rating:review.rating,
        comment:review.comment
        }
    
        UserServices.addReview(comment,token)
        .then((response) => {
            console.log(response.data)
            dispatch(getProductDetail(product._id))
            setReview({
                rating:1,
                comment:''
            })
        }).catch((error) => {
            console.log(error.message)
        })
    }else{
    setOpen(true)
    }
    
    }

    
    return (
        <>
            <Typography>Available offers</Typography>
            <SmallText>
                <Typography><StyledBadge />Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit Card</Typography>
                <Typography><StyledBadge />Bank Offer 10% Off on Bank of Baroda Mastercard debit card first time transaction, Terms and Condition apply</Typography>
                <Typography><StyledBadge />Purchase this Furniture or Appliance and Get Extra ₹500 Off on Select ACs</Typography>
                <Typography><StyledBadge />Partner OfferExtra 10% off upto ₹500 on next furniture purchase</Typography>
            </SmallText>
            <Table>
                <TableBody>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Delivery</TableCell>
                        <TableCell style={{ fontWeight: 600 }}>Delivery by {date.toDateString()} | ₹40</TableCell>
                    </ColumnText>
                    <ColumnText>
                    <TableCell style={{ color: '#878787' }}>Color</TableCell>
                    <TableCell sx={{display:'flex'}}>
                    {
                        product.color.map((item,index) => {
                            return (
                                <Box key = {index} onClick={() => handleIndex(index)} sx={{marginRight:'10px'}}>
                                <Image src={item.detailUrl[0]} alt={item.title} />
                                <Typography>{item.title}</Typography>
                                </Box>
                            )
                        })
                    }
                    </TableCell>
                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Highlight</TableCell>
                        <TableCell>{product.productHighlight}</TableCell>
                    </ColumnText>

                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Warranty</TableCell>
                        <TableCell>No Warranty</TableCell>
                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Seller</TableCell>
                        <TableCell>
                            <span style={{ color: '#2874f0' }}>{product.seller}</span>
                            <Typography>GST invoice available</Typography>
                        </TableCell>
                    </ColumnText>
                    <TableRow>
                        <TableCell colSpan={2}>
                            <img src={adURL} style={{ width: 390 }} />
                        </TableCell>
                    </TableRow>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Description</TableCell>
                        <TableCell>{product.description}</TableCell>
                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Reviews</TableCell>
                        <TableCell>
                            {
                                product.reviews.length>0 ? (
                                    product.reviews.map((item) => {
                                        return(
                                            <TableRow>
                                            <Box sx={{borderBottom:'1px solid #f2f2f2',}}>
                                            <Typography sx={{fontSize:'12px',}}>User ID:{item.user}</Typography>
                                            <Typography sx={{fontSize:'12px',}}>Rating:{item.rating}/5</Typography>
                                            <Typography sx={{fontSize:'12px',}}>comment: {item.comment}</Typography>
                                            </Box>
                                            </TableRow>
                                        )
                                    })
                                ):(                        
                                    <Typography style={{ color: '#878787' }}>No review</Typography>                              
                                    
                                )

                            }
                            <Box sx={{display:'flex',flexDirection:'column',marginTop:'10px',
                                justifyContent:'space-evenly', width:'30%'}}>
                            <TextField 
                            label='Rating out of 5'
                            type='number'
                            min='1' max='5'
                            name ="rating"
                            value={review.rating}
                            sx={{marginBottom:'5px'}}
                            onChange={handleChange}/> 
                            <TextField 
                            label="comment" 
                            type="text" 
                            name='comment'
                            value={review.comment} 
                            sx={{marginBottom:'5px'}}
                            onChange={handleChange}
                            />
                            <Button variant='contained' sx={{background: "#ff9f00"}}
                            onClick={handleClick}>
                            Add Review
                            </Button>
                            </Box>
                        </TableCell>    
                        
                    </ColumnText>
                </TableBody>
            </Table>
            <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount}/>
        </>
    )
}

export default LeftComponent;