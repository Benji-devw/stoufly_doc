import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton, 
  InputBase, 
  Button, 
  Container,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  useTheme,
  alpha,
  styled
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';

// Composant de recherche stylisé
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
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

interface HeaderProps {
  toggleColorMode?: () => void;
  currentTheme?: 'light' | 'dark';
}

const Header = ({ toggleColorMode, currentTheme }: HeaderProps) => {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  
  // État pour le menu utilisateur
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  // Gestion de la recherche
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push({ 
        pathname: '/', 
        query: { ...router.query, search: query.trim() }
      }, undefined, {});
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo et titre */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Image src="/StouflyDoc_Logo.svg" alt="logo" width={40} height={40} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ ml: 1, display: { xs: 'none', sm: 'block' }, fontWeight: 'bold' }}
            >
              StouflyDoc
            </Typography>
          </Box>

          {/* Barre de recherche */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: '500px' }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Loop, jazz, drop, artiste..."
                  inputProps={{ 'aria-label': 'search' }}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  fullWidth
                />
              </Search>
            </form>
          </Box>

          {/* Navigation et actions */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              color="inherit"
              component={Link}
              href="/"
              startIcon={<HomeIcon />}
              sx={{ mr: 1, display: { xs: 'none', md: 'flex' } }}
            >
              Accueil
            </Button>
            
            <Button
              color="inherit"
              component={Link}
              href="/post"
              startIcon={<AddIcon />}
              sx={{ mr: 1, display: { xs: 'none', md: 'flex' } }}
            >
              Publier
            </Button>

            {/* Bouton de thème */}
            <Tooltip title={currentTheme === 'dark' ? 'Mode clair' : 'Mode sombre'}>
              <IconButton onClick={toggleColorMode} color="inherit">
                {currentTheme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>

            {/* Menu utilisateur */}
            <Box sx={{ ml: 1 }}>
              <Tooltip title="Paramètres utilisateur">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User">
                    <PersonIcon />
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem component={Link} href="/user" onClick={handleCloseUserMenu}>
                  <PersonIcon sx={{ mr: 1 }} /> Profil
                </MenuItem>
                <MenuItem component={Link} href="/post" onClick={handleCloseUserMenu}>
                  <AddIcon sx={{ mr: 1 }} /> Publier
                </MenuItem>
                <MenuItem component={Link} href="/settings" onClick={handleCloseUserMenu}>
                  <SettingsIcon sx={{ mr: 1 }} /> Paramètres
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <LogoutIcon sx={{ mr: 1 }} /> Déconnexion
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;