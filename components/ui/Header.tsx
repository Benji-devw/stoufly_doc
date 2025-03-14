import { useState } from 'react';
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
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import { useSession, signIn, signOut } from 'next-auth/react';
import AuthModal from '../auth/AuthModal';
import { useThemeContext } from '@/contexts/ThemeContext';

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
  // Autres props si nécessaire
}

const Header = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const { data: session } = useSession();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { mode, toggleColorMode } = useThemeContext();
  
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

  const handleSignOut = () => {
    signOut();
    handleCloseUserMenu();
  };

  const handleSignIn = () => {
    signIn();
    handleCloseUserMenu();
  };

  const handleOpenAuthModal = () => {
    setAuthModalOpen(true);
  };
  
  const handleCloseAuthModal = () => {
    setAuthModalOpen(false);
  };

  // console.log('Header props:', { toggleColorMode, mode });

  return (
    <>
      <AppBar 
        position="static" 
        color="primary"
        sx={{ 
          bgcolor: 'primary.main', // Force la couleur orange dans tous les modes
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo et titre */}
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <Image src="/StouflyDoc_Logo.svg" alt="logo" width={40} height={40} priority />
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

              {/* Bouton de thème */}
              <Tooltip title={mode === 'dark' ? 'Mode clair' : 'Mode sombre'}>
                <IconButton onClick={toggleColorMode} color="inherit">
                  {mode === 'dark' ? <WbSunnyIcon /> : <NightlightIcon />}
                </IconButton>
              </Tooltip>

              {/* Menu utilisateur */}
              <Box sx={{ ml: 1 }}>
                <Tooltip title="Paramètres utilisateur">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User">
                      {session?.user?.image ? ( 
                        <Image src={session.user.image} alt="User" width={100} height={100} priority />
                      ) : (
                        <PersonIcon />
                      )}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                {
                  session ? (
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
                    disableScrollLock={true}
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
                    <MenuItem onClick={handleSignOut}>
                      <LogoutIcon sx={{ mr: 1 }} /> Déconnexion
                    </MenuItem>
                  </Menu>
                  ) : (
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
                    disableScrollLock={true}
                  >
                    <MenuItem onClick={handleOpenAuthModal}>
                      <LoginIcon sx={{ mr: 1 }} /> Connexion
                    </MenuItem>
                  </Menu>
                )}
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      {/* Modal d'authentification */}
      <AuthModal 
        open={authModalOpen} 
        onClose={handleCloseAuthModal} 
      />
    </>
  );
};

export default Header;