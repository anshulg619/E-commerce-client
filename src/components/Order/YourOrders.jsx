import React from 'react'

const YourOrders = () => {
  return (
    <>
    <Wrapper>
        <Header>SavedItems({savedItems.length})</Header>
        {order.map((items) => {
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
              
            </ProductBox>
          );
        })}
      </Wrapper>

      
    </>
  )
}

export default YourOrders
