import React, { useState,useEffect } from 'react'
import {Box,InputBase, List, styled, ListItem} from  '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts} from '../../redux/action/productAction'
import {Link} from 'react-router-dom';


const StyledInput = styled(Box)(({theme}) => ({
  background : '#E4F0F0',
  width: '38%',
  marginLeft:'20px',
  borderRadius:'5px',
  height:'75',
  display:'flex',
  [theme.breakpoints.down('md')]:{
    width:'50%',    
  }
}))


const StyledBase = styled(InputBase)(({theme}) => ({
paddingLeft:'20px',
width:'100%',
[theme.breakpoints.down('lg')]:{
  '& input::placeholder':{
    fontSize:12,
  }
}
}))

const ListWrapper = styled(List)`
  position: absolute;
  color: #000;
  background: #FFFFFF;
  margin-top: 50px;
`;


const StyledSearch = styled(SearchIcon)`
color:grey;
padding:5px;
`;

const Search = () => {

  const dispatch = useDispatch();
  const product = useSelector(state => state.getProducts)
  const [text,setText] = useState('');
  const [hidden, setHidden] = useState(true);

  useEffect( () => {
    dispatch(getProducts());
  },[dispatch])

  const getText = (value) => {
    setText(value);
    setHidden(false);
  } 

  return (
    <StyledInput>
      <Box>
        <StyledSearch/>
      </Box>
        <StyledBase
        placeholder='Search for Product Brands & more'
        value={text}
        onChange={(e) => {getText(e.target.value)}}
        />
        {
          text&&
          <ListWrapper hidden={hidden}>
            {
            product.products.filter((product) => product.title.longTitle.toLowerCase()
            .includes(text.toLowerCase())).map((product) => {
              return(
                <Link to ={`/product/${product._id}`}
                style = {{textDecoration:'none', color:'inherit'}}
                onClick={() => {setHidden(true); setText('')}}
                >
                  <ListItem>{product.title.longTitle}</ListItem>
                </Link>
              )
            })
            }
          </ListWrapper>
        }
    </StyledInput>

  )
}

export default Search
