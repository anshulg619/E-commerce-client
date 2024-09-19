import React, { useState, useEffect,useContext } from "react";
import VerticalSlide from "./VerticalSlide";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,} from "react-router-dom";
import LoginDialog from '../Login/LoginDialog';

//material ui imports
import { Button, Box, styled, Grid, IconButton } from "@mui/material";
import { ShoppingCart as Cart, FlashOn as Flash } from "@mui/icons-material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import  FavoriteIcon from "@mui/icons-material/Favorite";

//redux action imports
import { getProductDetail } from "../../redux/action/productAction";
import { addToCart } from "../../redux/action/cartAction";
import { addToList, removeFromList } from "../../redux/action/whishlistAction";
import { LoginContext } from "../../context/ContextProvider";
import UserServices from "../../services/UserServices";


const Image = styled("img")({
  padding: "15px 20px",
  width: "350px",
  height: "300px",
  objectFit: "contain",
  border: "solid 1px #f0f0f0",
  boxShadow: "5px",
});

const StyledButton = styled(Button)`
  width: 46%;
  height: 50px;
  border-radius: 2px;
  color: #ffffff;
`;

const Icon = styled(IconButton)`
position:absolute;
top:10px;
right:10px;
font-size:30px;
border-radius:50%;
background: blur;
border:1px solid #f0f0f0;
`

const RightComponent = ({ product, colorIndex}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { savedItems } = useSelector(state => state.list)
  const {user} = useSelector(state => state.user)
  const {account, setAccount} = useContext(LoginContext);

  const [quantity, setQuantity] = useState(1);
  const [open,setOpen] = useState(false);
  const [favorite,setFavorite] = useState(false);
  const { _id } = product;

  useEffect(() => {
    if(savedItems.length > 0 && savedItems.some(obj => obj._id === _id)){
      setFavorite(true);
    }
    
    if(product.color[colorIndex].detailUrl[0] !== url){
    setUrl(product.color[colorIndex].detailUrl[0])
    }
  },[colorIndex])

  const addProductToCart = () => {
    if(account){
    const cartItem ={
      user:user.user.id,
      product:product._id
    }

    UserServices.saveCartItems(cartItem,user.token)
    .then((response) => {
      console.log(response.data)
    dispatch(addToCart(_id, quantity));
    navigate("/cart");
  }).catch((error) => {
    console.log(error.message)
  }
  );
}else{
  setOpen(true)
}
}


  const saveToFavorites = () => {
    if(!favorite){
      setFavorite(true)
    dispatch(addToList(_id));
    }

    if(favorite){
      setFavorite(false)
      dispatch(removeFromList(_id));
    }
  };

  const [url, setUrl] = useState(product.color[colorIndex].detailUrl[0]);

  const buyNow = () => {
    if(account){
      dispatch(getProductDetail(_id))
      navigate('/order')
    }else(
      setOpen(true)
    )

  }

  return (
    <Box style={{ display: "flex" }}>
      <VerticalSlide
        product={product}
        setUrl={setUrl}
        colorIndex={colorIndex}
        style={{ margin: "10px 10px" }}
      />
      <Grid
        md={8}
        sm={12}
        xs={12}
        style={{ display: "flex", flexDirection: "column", margin: 10 }}
      >
      <Box style={{position:'relative', display:'inline-block'}}>
        <Image src={url} alt={product.product_id} />
        {
          favorite ? (<Icon onClick={saveToFavorites}>
        <FavoriteIcon fontSize='large' color='secondary'/>
        </Icon>):(
        <Icon onClick={saveToFavorites}>
        <FavoriteBorderIcon fontSize='large'/>
        </Icon>)
        }
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <StyledButton
            variant="contained"
            style={{ marginRight: 10, background: "#ff9f00" }}
            onClick={addProductToCart}
          >
            <Cart />
            Add to Cart
          </StyledButton>
          <StyledButton variant="contained" style={{ background: "#fb641b" }} onClick={buyNow}>
            <Flash />
            Buy Now
          </StyledButton>
        </Box>
      </Grid>
      <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount}/>
    </Box>
  );
};

export default RightComponent;
