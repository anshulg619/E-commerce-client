import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, styled, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { removeFromList } from "../../redux/action/whishlistAction";

const ProductBox = styled(Box)`
  background: #fff;
  margin:3px 0px;
  padding: 15px 25px;
  display: flex;
  border: 1px solid f0f0f0;
`;
const Image = styled("img")({
  width: "110px",
  height: "110px",
  border: "1px solid #f0f0f0",
});

const Wrapper = styled(Box)`
margin: 80px 160px;
`
const Header = styled(Typography)`
background:#fff;
border-bottom: 1px solid #f0f0f0;
padding: 8px 25px;
font-weight: 600px;
`


const Whishlist = () => {
  const dispatch = useDispatch();
  const { savedItems } = useSelector((state) => state.list);

  const removeItem = (id) => {
    dispatch(removeFromList(id));
  };

  const fassured =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png";

  return (
    <>
      <Wrapper>
        <Header>SavedItems({savedItems.length})</Header>
        {savedItems.map((items) => {
          return (
            <ProductBox>
              <Link
                to={`/product/${items._id}`}
                style={{ textDecoration: "none", display: "flex", color:'inherit' }}
              >
                <Image src={items.url} alt={items.product_id} />
                <Box style={{ marginLeft: 10 }}>
                  <Typography>{items.title.longTitle}</Typography>
                  <img
                    src={fassured}
                    alt="fassured"
                    style={{ width: "50px" }}
                  />
                  <Typography>
                    <Box
                      component="span"
                      style={{ fontSize: 18, fontWeight: 600 }}
                    >
                      {items.price.cost}
                    </Box>
                    &nbsp;&nbsp;
                    <Box component="span" style={{ color: "#878787" }}>
                      <strike>{items.price.mrp}</strike>
                    </Box>
                    &nbsp;&nbsp;
                    <Box component="span" style={{ color: "green" }}>
                      {items.price.discount}
                    </Box>
                  </Typography>
                </Box>
              </Link>
              <Button
                variant="contained"
                onClick={() => removeItem(items._id)}
                style={{
                  marginLeft: "auto",
                  height: "50px",
                  borderRadius: "2px",
                }}
              >
                Remove
              </Button>
            </ProductBox>
          );
        })}
      </Wrapper>
    </>
  );
};

export default Whishlist;
