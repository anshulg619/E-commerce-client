import React, { useEffect } from "react";

//component imports
import Navbar from "./Navbar";
import Banner from "./Banner";
import Slider from "./Slider";
import { Box, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/action/productAction";
import MidSlide from "./MidSlide";
import MidSection from "./MidSection";

const BoxContainer = styled(Box)`
  padding: 10px 10px 0px 10px;
  background: #f2f2f2;
`;

const Home = () => {
  const listProducts = useSelector((state) => state.getProducts);

  const { products, error } = listProducts;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <BoxContainer>
        <Navbar />
      </BoxContainer>
      <BoxContainer>
        <Banner />
      </BoxContainer>
      <BoxContainer>
        <MidSlide products={products} />
      </BoxContainer>
      <BoxContainer>
        <MidSection/>
      </BoxContainer>
      <BoxContainer>
        <Slider products={products} title="recommended for you" />
      </BoxContainer>
    </>
  );
};

export default Home;
