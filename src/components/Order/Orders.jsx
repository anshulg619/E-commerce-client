import React,{useState} from 'react';
import { Stepper, Step, StepLabel, Box, styled, Button } from '@mui/material';
import Info from './Info'
import OrderDetails from './OrderDetails';
import Payment from './Payment';
import { useSelector } from 'react-redux';
import UserServices from '../../services/UserServices';
import { useNavigate } from 'react-router-dom';


const steps = ['Customer Info', 'Order Details', 'Payment']

const StepperWrapper = styled(Box)`
margin: 80px 180px;
padding:15px 30px;
`
const ButtonsBox = styled(Box)`
padding:10px 15px;
width:100%;
display:flex;
justify-content:space-between;
`


const Orders = () => {

  const [activeStep,setActiveStep] = useState(0);

  const {user} = useSelector(state => state.user)

  const navigate = useNavigate();

  const [address,setAddress] = useState({
    name:'',
    phone:'',
    line1:'',
    line2:'',
    line3:'',
    city:'',
    state:'',
    zipCode:'',
    country:''
  })

  const [products,setProducts] = useState([]) 
  
  const [error, setError] = useState({})

  const [total, setTotal] = useState(0);

  const [payMethod,setPayMethod] = useState('');

  const validate = () => {
    const newErrors = {};
    
    // Name validation
    if (!address.name) {
      newErrors.name = 'Name is required';
    }

    // Phone validation
    if (!address.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(address.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    // Address Line 1 validation
    if (!address.line1) {
      newErrors.line1 = 'Address Line 1 is required';
    }

    // City validation
    if (!address.city) {
      newErrors.city = 'City is required';
    }

    // ZIP Code validation
    if (!address.zipCode) {
      newErrors.zipCode = 'ZIP Code is required';
    } else if (!/^\d{5}$/.test(address.zipCode)) {
      newErrors.zipCode = 'ZIP Code must be 5 digits';
    }

    // State validation
    if (!address.state) {
      newErrors.state = 'State is required';
    }

    // Country validation
    if (!address.country) {
      newErrors.country = 'Country is required';
    }

    return newErrors;
  };

  const Next = (prevStep) => {
  
    if(prevStep===0){
    const validationErrors=validate();
    if(Object.keys(validationErrors).length>0){
      setError(validationErrors);
    }else{
    setActiveStep(prevStep+1)
    }
    }else{
      setActiveStep(prevStep+1)
    }
    
  }

  const back = (prevStep) => {
    setActiveStep(prevStep-1)
  }

  const handleClick = () => {
  
    const orderBody = {
      user:user.user.id,
      products:products,
      totalPrice:total,
      shippingAddress:address,
      paymentMethod:payMethod,
    }

    console.log(orderBody);

    const token = user.token
    console.log(token)

    UserServices.saveOrder(orderBody,token)
    .then((response)  => {
      console.log(response.data)
      navigate('/')
      alert('Your Order has been placed')
      //setOpen(true);
    }).catch((error) => {
      console.log(error.message)
    })
  }

  const stepSwitch = (step) => {
    switch (step) {
      case 0:
       return <Info address={address} setAddress={setAddress} error = {error}/>
      case 1:
      return <OrderDetails address={address} products={products} setProducts={setProducts} setTotal={setTotal}/>
      case 2:
        return <Payment total={total} setPayMethod={setPayMethod} click={handleClick}/>
      }
  }

return(
    <>
    <StepperWrapper>
      <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })
          }
        </Stepper>
        
        {
        <Box>
        {stepSwitch(activeStep)}
        </Box>
        }
        
        <ButtonsBox>
          <Button variant='contained'
          sx={{background:'#fff', color:'inherit'}}
          disabled={activeStep===0}
          onClick={() => back(activeStep)}
          >          
          Back
          </Button>
          <Button variant='contained' color='primary' 
          onClick={()=>Next(activeStep)} disabled={activeStep===2}>
            Next
          </Button>
        </ButtonsBox>
    </StepperWrapper>
    </>
)
}

export default Orders;