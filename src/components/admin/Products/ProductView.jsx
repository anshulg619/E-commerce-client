import React, { useEffect } from "react";

import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../../../redux/action/productAction";
import { useDispatch, useSelector } from "react-redux";

const ProductView = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.getProductDetails);

  useEffect(() => {
    if (product && id !== product._id) dispatch(getProductDetail(id));
  }, [dispatch, id, product]);

  return (
    <Box style={{display:'flex'}}>
      <Box style={{display:'flex',flexDirection:'column'}}>
        <h1>{product.title.shortTitle}</h1>
        <img src={product.url} alt="" />
      </Box>
      <Box style={{display:'flex', flexDirection:"column"}}>
        <Typography>product Id:{product.product_id}</Typography>
        <Typography>Long Title:{product.title.longTitle}</Typography>
        <Typography>
          <span style={{ fontSize: 28 }}>₹{product.price.cost}</span>
          &nbsp;&nbsp;&nbsp;
          <span style={{ color: "#878787" }}>
            <strike>₹{product.price.mrp}</strike>
          </span>
          &nbsp;&nbsp;&nbsp;
          <span style={{ color: "#388E3C" }}>{product.price.discount} off</span>
        </Typography>
        <Box>
        {
            product.color.map((item,index) => {
                <Typography key={index}>Color:{item.title}</Typography>
                item.detailUrl.map((url,index) => {
                    <Box style ={{display:'flex'}}>
                    <img src={url[index]} alt=""/>
                    </Box>
                })
            })
        }
        </Box>
        <Typography>Highlights: {product.productHighlight}</Typography>
        <Typography>Seller: {product.seller}</Typography>
        <Typography>Units Available: {product.units}</Typography>
        <Typography>Description: {product.description}</Typography>
        <Typography>Discount: {product.discount}</Typography>
        <Typography>Category: {product.category}</Typography>
        <Typography>Tagline: {product.tagline}</Typography>
      </Box>
    </Box>
  );
};

export default ProductView;
