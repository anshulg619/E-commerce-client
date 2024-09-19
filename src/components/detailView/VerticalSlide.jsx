import { Box, styled } from '@mui/material'
import React from 'react'


const Component = styled(Box)(({theme}) => ({
display:'flex',
flexDirection:'column',
alignItems:'center',
[theme.breakpoints.down('sm')]:{
  display:'none',
}
}))

const Image = styled('img')(({theme}) => ({
    background:'white',
    width:'80px',
    height:'auto',
    margin:'10px 10px',
    border:'solid 1px #f2f2f2',
    '&:hover':{
        border:'solid 1px blue'
    },
   
}))
const VerticalSlide = ({product, setUrl, colorIndex}) => {
  
  const handleMove = (index) => {
    setUrl(product.color[colorIndex].detailUrl[index])
  }

  return (
    <Component>
      {
        product.color[colorIndex].detailUrl.map((item, index) => {
                
                return (<Image src={item} key={index} alt={product.product_id} onMouseMove={() => handleMove(index)}/>)
        })
      }
    </Component>
  )
}

export default VerticalSlide;