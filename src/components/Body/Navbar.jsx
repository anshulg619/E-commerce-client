import React from 'react';
import {navData} from "../../constantData/newdata";
import {Box, Typography, styled} from '@mui/material';


const Wrapper =styled(Box)(({theme}) =>({
background: '#ffffff',
display:'flex',
justifyContent: 'space-between',
padding:'1% 5% 1% 5%',
marginTop:'5% 2% 5% 2%',
width:'90%',
overflow: 'overlay',
[theme.breakpoints.down('md')]:{
  margin: '0 !important'
}
}))


const Container = styled(Box)`
text-align:center;
font-size:10px;
overflowX:hidden;
`;

const Image = styled('img')`
height:10vh;
`;

const Text = styled(Typography)(({theme}) => ({
  fontSize:14,
  [theme.breakpoints.down('md')]:{
    overflow:'hidden'
  }
}))
const Navbar = () => {
  return (
    <Wrapper>
      {
        navData.map((data) => {
            return(
                <Container>
                <Image src={data.url} alt="category Image"/>
                <Text>{data.text}</Text>
                </Container>

            )
        })
      }
    </Wrapper>
  )
}

export default Navbar;
