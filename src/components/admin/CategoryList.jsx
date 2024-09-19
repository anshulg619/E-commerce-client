import React,{useEffect, useState} from 'react'
import {TableContainer, TableRow, TableHead, TableCell, TableBody,
    Table, Paper,Button, Box, Typography, styled,
    TextField
} from '@mui/material';

import {useDispatch, useSelector} from 'react-redux'
import { Link} from 'react-router-dom';
import { getAllCategoriesAction } from '../../redux/action/categoryAction';
import UserServices from '../../services/UserServices';

const Header = styled(Box)`
display:flex;
margin: 5px 10px;
padding:5px 10px;
background:#fff;
`
const BoxLink = styled(Box)`
display:flex;
align-items:center;
margin-left:auto;
font-size:14 px
padding:5px 10px;
color:#2874f0;
`

const CategoryList = () => {

    const dispatch = useDispatch();
    const {categories} = useSelector(state => state.categories)
    const {admin} = useSelector(state => state.admin)
    const token = admin.token;

    const [category, setCategory] = useState({
        name:'',
        parentId:''
    })


    useEffect(() => {
        dispatch(getAllCategoriesAction(token))
    },[dispatch])

    const handleChange = (e) => {
        const {name, value}  = e.target

        setCategory((prevdata) => ({
            ...prevdata,
            [name]:value
        }))
    }

    const addCategory = (e) => {
        e.preventDefault()
        UserServices.addCategory(category,token)
        .then((response) => {
            console.log(response.data)
            setCategory({
                name:'',
                parentId:''
            })
        }).catch((error) => {
            console.log(error.message);
        })
    }

    const deleteCategory = (id) => {
        UserServices.deleteCategory(id,token)
        .then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.log(error.message);
        })
    }

  return (
    <>
     <Header>
      <Typography style={{fontSize:24,}}>CATEGORY LIST:</Typography>
      <BoxLink>
        <Link to="/admin/dashboard" style={{textDecoration:'none', marginRight:30,color:'inherit'}}>BACK TO HOME</Link>
        {/*<Link to="/admin/addproduct" style={{textDecoration:'none', marginRight:30,color:'inherit'}}>LIST A PRODUCT</Link>*/}
      </BoxLink>
    </Header>
    <Header>
        <TextField variant = 'outlined' label='category name' 
        sx={{marginRight:'20px'}}onChange={handleChange}
        name='name' value={category.name}/>
        <TextField variant = 'outlined' label='parent Id(optional)' 
        sx={{marginRight:'20px'}}onChange={handleChange}
        name='parentId' value={category.parentId}/>
        <Button variant='containd' color='primary' onClick={addCategory}>Add Category</Button>
    </Header>
    <TableContainer component={Paper} sx={{margin:'5px 10px', width:'98%'}}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Category Id</TableCell>
          <TableCell>Name</TableCell>
          <TableCell align="right">ParentId</TableCell>
          <TableCell align="right" sx={{marginLeft:'auto'}}>Delete</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {categories.map((item) => (
          <TableRow
            key={item._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {item._id}
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell align="right">{item.parentId ? item.parentId : "Parent"}</TableCell>
            <TableCell align="right">{item.orderStatus}</TableCell>
            <TableCell><Button onClick={() => deleteCategory(item._id)}>Delete</Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer> 
    </>
  )
}

export default CategoryList
