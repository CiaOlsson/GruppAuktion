import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, Stack } from '@mui/material';
import {NavLink, useNavigate} from "react-router-dom"
import { useState } from 'react';
import { useUserContext } from '../../context/UserContextProvider';
import "./NavBar.css";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: "12px 0 0 0",
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '25ch',
    },
  },
}));

export default function NavBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const {user, setUser}  = useUserContext();
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const loginClick = () => {
        navigate("/login");
    }
    const logOutClick = () => {
        setUser("");
        navigate("/");
    }
    const accountClick = () => {
        navigate("/account");
    }
    const createAuction = () => {
        navigate("/add-auction");
    }
    const addDays = () => {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + 5);
        console.log(newDate);
        return newDate;
    }
    addDays();
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        >
        {user.length === 0 ? <MenuItem onClick={loginClick}>Logga in</MenuItem> :
        [
            <MenuItem key="Skapa auktion" onClick={createAuction}>Skapa auktion</MenuItem>,
            <MenuItem key="Konto" onClick={accountClick}>Konto</MenuItem>,
            <MenuItem key="Logga ut" onClick={logOutClick}>Logga ut</MenuItem>,
        ]}
        </Menu>
    );

    const navigate = useNavigate();

    const handleSearch = event => {
        if (event.keyCode === 13) {
        console.log(event.target.value)
        const encode = encodeURI(event.target.value);
        const url = "/auctions?q=" + encode;
        navigate(url);  
        }
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar sx={{flexDirection:"row", justifyContent:"space-between", alignItems:"space-between"}}>
            <Stack direction="row" spacing={4}>
                <Link component={NavLink} to="/auctions"><Typography variant="body1" paragraph className='navbar-auction-redirects'>Öppna</Typography></Link>
                <Link component={NavLink} to="/auctions/?closed=yes"><Typography variant="body1" paragraph className='navbar-auction-redirects'>Stängda</Typography></Link>
            </Stack>
            <Box sx={{width:"200px"}}>
                <Typography
                variant="h4"
                noWrap
                component={NavLink}
                to="/"
                textAlign="center"
                sx={{ display: { xs: 'none', sm: 'block', textDecoration:"none", color:"white" } }}
                >
                Auktion.se
                </Typography>

            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Search >
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase onKeyDown={handleSearch}
                    placeholder="Sök på auktioner"
                    inputProps={{ 'aria-label': 'search' }}
                />
                </Search>

                <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                >
                <AccountCircle />
                </IconButton>
            </Box>
            </Toolbar>
        </AppBar>
        {renderMenu}
        </Box>
    );
}