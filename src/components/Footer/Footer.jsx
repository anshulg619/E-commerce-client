import React from 'react'
import { footerConstants, Address} from '../../constantData/footerConstants'
import { Box, Typography, styled } from '@mui/material'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import StorefrontIcon from '@mui/icons-material/Storefront'
import RedeemOutlinedIcon from '@mui/icons-material/RedeemOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

const FooterWrapper= styled(Box)`
background:black;
display:flex;
justify-content: space-evenly;
margin-top:10px;
padding: 20px 20px;
border-bottom : 1px solid #2874f0;
`
const Title = styled(Typography)`
color:grey;
font-size:14px
`
const Items = styled(Typography)`
color:#f0f0f0;
font-size:12px;
&:hover{
text-decoration:underline;
}
`
const Contact = styled(Typography)`
color:#f0f0f0;
font-size:12px;
`
const BoxRight = styled(Box)`
width:14%;
padding:0px 10px;
`
const Bottom = styled(Typography)`
color:#f0f0f0;
font-size:12px;
display:flex;
align-items:center
`
const BoxWrapper = styled(Box)`
display:flex;
justify-content:space-evenly;
background:#000;
padding:15px 25px;
`

const Footer = () => {
  return (
    <>
    <FooterWrapper>
        {
            footerConstants.map((item) => {
                return( 
                <Box>
                    <Title >{item.title}</Title>
                    {
                        item.items.map((text,index) =>{
                            return(
                                <Items key={index}>{text}</Items>
                            )
                        })
                    }
                </Box>
                )
            })
        }

        <BoxRight style={{display:'flex', flexDirection:'column',borderLeft:'1px solid #2874f0'}}>
            <Title>Mail us</Title>
            <Contact>{Address.address}</Contact>
            <Box style={{marginTop:30}}>
                <Title>Social Media</Title>
                <Box>
                <FacebookOutlinedIcon  style={{color:'#f0f0f0', marginRight:8}}/>
                <XIcon style={{color:'#f0f0f0', marginRight:8}} />
                <YouTubeIcon style={{color:'#f0f0f0'}} />
                </Box>
            </Box>
            
        </BoxRight>
        <BoxRight>
            <Title>Registered office address</Title>
            <Contact>{Address.address}</Contact>
            <Contact>CIN: {Address.cin}</Contact>
            <Contact>Telephone: <Box component='span' style={{color:'#2874f0'}}>{Address.Phone}</Box></Contact>
        </BoxRight>
    </FooterWrapper>
    <BoxWrapper>
    <Bottom>
    <StorefrontIcon  style={{color:'#DAA520' ,fontSize:14,marginRight:8}}/>
    <Box component="span">Become a seller</Box>
    </Bottom>
    <Bottom>
    <RedeemOutlinedIcon style={{color:'#DAA520' ,fontSize:14, marginRight:8}}/>
    <Box component="span">Gift Cards</Box>
    </Bottom>
    <Bottom>
    <HelpOutlineOutlinedIcon style={{color:'#DAA520' ,fontSize:14, marginRight:8}}/>Help Center
    </Bottom>
    <Bottom>
    <Box component="span">&#169;2007-2024 Flipkart.com</Box>
    </Bottom>
    </BoxWrapper>
      
    </>
  )
}

export default Footer
