import React from "react";

import { Box, styled } from "@mui/material";
import Slider from "./Slider";

const Wrapper = styled(Box)`
  display: flex;
  background:#f2f2f2;
`;

const LeftComponent = styled(Box)(({theme}) => ({
    width:'83%',
    background:'#ffffff',
    [theme.breakpoints.down('md')]:{
        width:'100%',
    }
}))

const RightComponent = styled(Box)(({theme}) => ({
  width: '17%',
  margin: '0px 5px',
  padding: 5,
  background:'#ffffff',
 [ theme.breakpoints.down('md')]:{
    display:'none',
  },
}))

const Image = styled('img')({
    width:'95%',
    height:'95%',
    padding:5,
})

const MidSlide = ({ products }) => {
  const adURL =
    "https://rukminim1.flixcart.com/flap/464/708/image/633789f7def60050.jpg?q=70";
  return (
    <>
      <Wrapper>
        <LeftComponent>
          <Slider title="Deals of the Day" products={products} />
        </LeftComponent>
        <RightComponent>
          <Image  src={adURL} alt="ads" />
        </RightComponent>
      </Wrapper>
    </>
  );
};

export default MidSlide;
