import { Box, Menu, MenuItem, Typography,styled } from '@mui/material';
import PowerSettingNew from '@mui/icons-material/PowerSettingsNew'
import React, { useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { userLogout, adminLogout } from '../../redux/action/loginAction';
import { Link, useNavigate } from 'react-router-dom';
import { KeyboardArrowRight } from '@mui/icons-material';
import { resetCart } from '../../redux/action/cartAction';



const Component = styled(Menu)`
    margin-top: 5px;
`;

const Logout = styled(Typography)`
    font-size: 14px;
`;

const Linked = styled(Link)({
    textDecoration:'none',
    color:'inherit',
    fontSize:'14px',
    display:'flex',
    alignItems:'center'
})

const Profile = ({account, setAccount, isAdminPage}) => {

    const [open,setOpen] = useState(false);

    const navigate =useNavigate();

    const dispatch = useDispatch();

    const handleClick = (e) => {
        setOpen(e.currentTarget);
    }

    const handleClose = () => {
        setOpen(false)
    }

    const logout = () => {
        if(isAdminPage){
            dispatch(adminLogout())
            navigate('/admin')
            setAccount('')
        }else{
        dispatch(userLogout())
        dispatch(resetCart())
        setAccount('');
        }
    }
  return (
    <>
    <Box onClick={handleClick}><Typography style={{marginTop:2, color: 'Black'}}>{account}</Typography></Box>
        <Component
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        >
            <MenuItem onClick ={logout}>
            <Logout>Logout</Logout>
            <PowerSettingNew fontSize = 'small' color = 'primary' sx={{marginLeft:'auto'}}/>
            </MenuItem>
            <MenuItem>
            <Linked to={!isAdminPage ? '/user/profile':'/admin/profile'} onClick={handleClose}>
            view profile
            <KeyboardArrowRight fontSize = 'small' color = 'primary' sx={{marginLeft:'auto'}}/>
            </Linked>            
            </MenuItem>
        </Component>
    
      
    </>
  )
}

export default Profile
