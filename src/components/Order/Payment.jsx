import {
  Box,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  styled,
  Button,Typography
} from "@mui/material";
import React from "react";
//import UserServices from '../../services/UserServices'
//import {post} from '../utils/paytm'

const Wrapper = styled(Box)`
  background: #fff;
  margin: 10px 24px 0px 24px;
  padding: 15px 24px;
`;

const BottomWrapper = styled(Box)`
  margin: 0px 24px;  
  padding: 16px 22px;
  background: #fff;
  box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
  border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
margin-left: auto; 
border-radius: 2 ;
padding: 5px 10px;
display:flex;
align-items:right;
`

const Payment = ({total, setPayMethod, click}) => {

  //const data={ amount: 500, email: 'anshulgupta394@gmail.com'}

  // const payNow = async () => {
  //       let response = await UserServices.payUsingPaytm(data);
  //       console.log(response);
  //       var information = {
  //           action: 'https://securegw-stage.paytm.in/order/process',
  //           params: response    
  //       }
  //       post(information);
  //   }

    const handleChange = (e) =>{
      console.log(e.target.value);
      setPayMethod(e.target.value)
    }

  return (
    <>
      <Wrapper>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Payment Options:
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="credit_card"
            name="paymentMethod"
            onChange={handleChange}
          >
            <FormControlLabel value="credit_card" control={<Radio />} label="Credit Card" />
            <FormControlLabel value="debit_card" control={<Radio />} label="Debit Card" />
            <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
            <FormControlLabel value="cash_on_delivery" control={<Radio />} label="Cash On Delivery" />
          </RadioGroup>
        </FormControl>
      </Wrapper>
      <BottomWrapper>
        <Typography>₹{total}</Typography>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={() => click()}
        >
          Pay Now
        </StyledButton>
      </BottomWrapper>
    </>
  );
};

export default Payment;
