import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box, styled, Typography, } from "@mui/material";
import {Link} from 'react-router-dom'

const Image = styled('img')(({theme}) => ({
  width: 150,
  height: 150,
  objectFit:'contain',
  transition: 'transform 0.3s ease',
  '&:hover':{
    transform: 'scale(1.1)',
  },
}));

const SliderBox = styled(Box)`
margin:5;
height:80%;
width:75%;
padding:25px 15px;
background:#ffffff;
border:.5px solid #f0f0f0;
border-radius:2px;
margin:5px 10px;
`;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Slider = ({ products, title }) => {
  return (
    <>
    <Box style={{background:'#ffffff',height:350}}>

        <Box style={{padding:'5px 7px'}}>
            <Typography style={{fontWeight:600, color:'#212121'}}>{title}</Typography>
        </Box>
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        showDots={false}
        slidesToSlide={1}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {products.map((item) => {
          return (
            <Link to={`/product/${item._id}`} style={{textDecoration:'none'}}>
            <SliderBox textAlign="center">
              <Image src={item.url} alt={item.product_id} />
              <Typography style={{color: '#212121', fontWeight:600, fontSize:'14px', marginTop:'5px'}}>{item.title.shortTitle}</Typography>
              <Typography style={{color: 'green', fontSize:'14px', marginTop:'5px'}}>{item.discount}</Typography>
              <Typography style={{color:'#212121', fontSize:'14px', marginTop:'5px'}}>{item.tagline}</Typography>
            </SliderBox>
            </Link>
          );
        })}
      </Carousel>
      </Box>
    </>
  );
};

export default Slider;
