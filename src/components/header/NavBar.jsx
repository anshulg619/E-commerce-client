import React, { useContext, useState, useEffect } from "react";
import {AppBar,Box,Toolbar,styled,IconButton,Drawer,
  List,ListItem,Typography,} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";
import Buttons from "./Buttons";
import MenuIcon from "@mui/icons-material/Menu";
import Profile from "./Profile";
import { LoginContext } from "../../context/ContextProvider";
import { useSelector } from "react-redux";

const StyledBar = styled(AppBar)({
  background: "#ffffff",
});

const MenuButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

const Wrapper = styled(AppBar)`
  background: brown;
`;
const BoxStyle = styled(Box)`
  margin-right: 40px;
  color: #f0f0f0;
  font-size: 16px;
`;

const ButtonBox = styled(Box)(({ theme }) => ({
  marginLeft:'auto',
  [theme.breakpoints.down("md")]: {
    display:"none",
  },
}));

const LinkStyle = {
  textDecoration: "none",
  color: "inherit",
};

const list = () => {
  return (
    <List>
      <ListItem>
        <Buttons />
      </ListItem>
    </List>
  );
};

const NavBar = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  const {admin} = useSelector(state => state.admin)

  const { account, setAccount } = useContext(LoginContext);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if(isAdminPage&&admin&&Object.keys(admin).length>0){
      const name = admin.user.username
      setAccount(name)
    }
  })

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Box>
      {isAdminPage ? (
        <Wrapper>
          <Toolbar>
            <Box style={{ marginLeft: "10%" }}>
              <Typography
                style={{
                  color: "#f0f0f0",
                  fontSize: "20px",
                  fontWeight: "600px",
                }}
              >
                <Link to={admin&&Object.keys(admin).length>0 ?'/admin/dashboard':'/admin'} style={LinkStyle}>
                  Admin DashBoard
                </Link>
              </Typography>
            </Box>
            <Box style={{ marginLeft: "auto", marginRight: "10%" }}>
              {account ? (
                <Profile account={account} setAccount={setAccount} isAdminPage={isAdminPage} />
              ) : (
                <Box>
                  <BoxStyle component="span">
                    <Link to="/admin" style={LinkStyle}>
                      Sign In
                    </Link>
                  </BoxStyle>
                  <BoxStyle component="span">
                    <Link to="/admin/signup" style={LinkStyle}>
                      Sign Up
                    </Link>
                  </BoxStyle>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Wrapper>
      ) : (
        <Box>
          <StyledBar>
            <Toolbar>
              <MenuButton onClick={handleOpen}>
                <MenuIcon />
              </MenuButton>
              <Drawer open={open} onClose={handleClose}>
                {list()}
              </Drawer>
              <Link to="/">
                <Box>
                  <img
                    src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg"
                    alt="logo"
                  />
                </Box>
              </Link>
              <Search />
              <ButtonBox>
              <Buttons />
              </ButtonBox>
            </Toolbar>
          </StyledBar>
        </Box>
      )}
    </Box>
  );
};

export default NavBar;
