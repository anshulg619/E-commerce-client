import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  styled,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from "@mui/material";
import UserServices from "../../../services/UserServices";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategoriesAction } from "../../../redux/action/categoryAction";

const Wrapper = styled(Box)`
  background: #fff;
  margin: 80px 160px;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const StyledTextField = styled(TextField)`
  margin: 5px 10px;
`;
const ProductForm = () => {
  const navigate = useNavigate();

  const { admin } = useSelector((state) => state.admin);
  const { categories } = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  const [color, setColor] = useState({ title: "", detailUrl: [""] });

  const [product, setProduct] = useState({
    product_id: "",
    title: {
      shortTitle: "",
      longTitle: "",
    },
    url: "",
    color: [],
    productHighlight: "",
    seller: "",
    price: { mrp: 0, cost: 0, discount: "" },
    units: 0,
    description: "",
    discount: "",
    category: "",
    tagline: "",
  });

  useEffect(() => {
    dispatch(getAllCategoriesAction(admin.token));
  },[admin.token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleTitleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      title: {
        ...prevProduct.title,
        [name]: value,
      },
    }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      price: {
        ...prevProduct.price,
        [name]: value,
      },
    }));
  };

  const handleColorTitleChange = (e) => {
    setColor((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleUrlChange = (e, index) => {
    const newUrls = [...color.detailUrl];
    newUrls[index] = e.target.value;
    setColor((prev) => ({ ...prev, detailUrl: newUrls }));
  };

  const addUrlField = () => {
    setColor((prev) => ({
      ...prev,
      detailUrl: [...prev.detailUrl, ""],
    }));
  };

  const addColor = () => {

    setProduct((prev) => ({
    ...prev,
    color:[...prev.color, color]
    }))
    // Reset color state for new entry
    setColor({ title: "", detailUrl: [""] });
  };



  const validateForm = () => {
    const newErrors = {};
    
    // Validate Product ID
    if (!product.product_id) newErrors.product_id = "Product ID is required.";
  
    // Validate Short Title
    if (!product.title.shortTitle) newErrors.shortTitle = "Short Title is required.";
  
    // Validate Long Title
    if (!product.title.longTitle) newErrors.longTitle = "Long Title is required.";
  
    // Validate URL
    if (!product.url) newErrors.url = "Image URL is required.";
    
    // Validate Price
    if (!product.price.mrp || product.price.mrp <= 0) {
      newErrors.mrp = "MRP must be a positive number.";
    }
    
    if (!product.price.cost || product.price.cost <= 0) {
      newErrors.cost = "Cost must be a positive number.";
    }
    
    if (product.price.discount && (isNaN(product.price.discount) || product.price.discount < 0)) {
      newErrors.discount = "Discount must be a non-negative number.";
    }
  
    // Validate Units Available
    if (!product.units || product.units <= 0) {
      newErrors.units = "Units Available must be a positive number.";
    }
  
    // Validate Description
    if (!product.description) newErrors.description = "Description is required.";
  
    // Validate Category
    if (!product.category) newErrors.category = "Category is required.";
  
    return newErrors;
  };


  const handleSubmit = (e) => {    
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }else{

    console.log(product);

    const token = admin.token;

    UserServices.saveProduct(product, token)
      .then((response) => {
        console.log(response.data);
        alert("Product Listed Successfully");
        navigate("/admin/productList");
      })
      .catch((error) => {
        console.log(error.message);
      });
    }
  };

  return (
    <Wrapper>
      <h2>Product Listing:</h2>
      <StyledTextField
        variant="outlined"
        label="Product ID"
        type="text"
        name="product_id"
        value={product.product_id}
        onChange={handleChange}
      />
      <h3>Title</h3>
      <StyledTextField
        variant="outlined"
        label="Short Title"
        type="text"
        name="shortTitle"
        value={product.title.shortTitle}
        onChange={handleTitleChange}
      />
      <StyledTextField
        variant="outlined"
        label="Long Title"
        type="text"
        name="longTitle"
        value={product.title.longTitle}
        onChange={handleTitleChange}
      />
      <h3>Image</h3>
      <StyledTextField
        variant="outlined"
        label="URL"
        type="text"
        name="url"
        value={product.url}
        onChange={handleChange}
      />
      <h3>Colors</h3>
      <div>
        <h4>Current State:</h4>
        <pre>{JSON.stringify(color, null, 2)}</pre>
      </div>
      <div>
        <h5>Color List:</h5>
        <pre>{JSON.stringify(product.color, null, 2)}</pre>
      </div>

      <Box>
        <StyledTextField
          variant="outlined"
          label="Title"
          type="text"
          name="color.title"
          value={color.title}
          onChange={handleColorTitleChange}
        />

        {color.detailUrl.map((url, index) => {
          return (
            <Box>
              <StyledTextField
                variant="outlined"
                label={`Detail URL (${index + 1})`}
                type="text"
                value={url}
                onChange={(e) => handleUrlChange(e, index)}
              />
            </Box>
          );
        })}
        <Button
          variant="contained"
          sx={{ margin: "5px 10px" }}
          onClick={addUrlField}
        >
          Add Url
        </Button>
      </Box>
      <Button variant="contained" sx={{ width: "30%" }} onClick={addColor}>
        Add Color
      </Button>

      <StyledTextField
        variant="outlined"
        type="text"
        label="Highlight"
        name="productHighlight"
        value={product.productHighlight}
        onChange={handleChange}
      />

      <StyledTextField
        variant="outlined"
        type="text"
        label="seller"
        name="seller"
        value={product.seller}
        onChange={handleChange}
      />

      <Box>
        <h3>Price:</h3>
        <StyledTextField
          variant="outlined"
          type="number"
          label="MRP"
          name="mrp"
          value={product.price.mrp}
          onChange={handlePriceChange}
        />

        <StyledTextField
          variant="outlined"
          type="text"
          label="Cost"
          name="cost"
          value={product.price.cost}
          onChange={handlePriceChange}
        />

        <StyledTextField
          variant="outlined"
          type="text"
          label="Discount(%)"
          name="discount"
          value={product.price.discount}
          onChange={handlePriceChange}
        />
      </Box>

      <StyledTextField
        variant="outlined"
        label="Units Available"
        type="number"
        name="units"
        value={product.units}
        onChange={handleChange}
      />

      <StyledTextField
        variant="outlined"
        label="Description"
        name="description"
        value={product.description}
        onChange={handleChange}
      />

      <StyledTextField
        variant="outlined"
        label="Discount Tagline "
        type="text"
        name="discount"
        value={product.discount}
        onChange={handleChange}
      />

      <FormControl variant="outlined" sx={{ margin: "5px 10px", width: "30%" }}>
        <InputLabel id="select-label">Category</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          name="category"
          value={product.category}
          onChange={handleChange}
          label="Category"
        >
          {categories.map((item) => (
            <MenuItem key={item._id} value={item._id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/*<StyledTextField variant="outlined" label="Category" type="text" name="category" value={product.category} onChange={handleChange} />*/}

      <StyledTextField
        variant="outlined"
        label="Tagline"
        type="text"
        name="tagline"
        value={product.tagline}
        onChange={handleChange}
      />

      <Button
        variant="contained"
        sx={{ width: "50%", margin: "0px auto" }}
        onClick={handleSubmit}
      >
        Save Product
      </Button>
    </Wrapper>
  );
};

export default ProductForm;
