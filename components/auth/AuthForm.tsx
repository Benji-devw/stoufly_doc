import { useState } from 'react';
import { 
  Box, 
  Tabs, 
  Tab, 
  TextField, 
  Button, 
  Typography, 
  Alert, 
  CircularProgress,
  InputAdornment,
  IconButton,
  Divider,
  Stack
} from '@mui/material';
import { signIn } from 'next-auth/react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

interface AuthFormProps {
  onSuccess?: () => void;
}

const AuthForm = ({ onSuccess }: AuthFormProps) => {
  const [tabValue, setTabValue] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError('');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password
      });
      
      if (result?.error) {
        setError('Identifiants incorrects');
      } else if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (!name || !email || !password) {
      setError('Tous les champs sont requis');
      setLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setLoading(false);
      return;
    }
    
    try {
      // Appel API pour créer un compte
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.message || 'Erreur lors de l\'inscription');
      } else {
        // Connexion automatique après inscription
        await signIn('credentials', {
          redirect: false,
          email,
          password
        });
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      setError('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setLoading(true);
    try {
      await signIn(provider, { callbackUrl: window.location.href });
      // Note: onSuccess n'est pas appelé ici car la redirection est gérée par NextAuth
    } catch (err) {
      setError(`Erreur lors de la connexion avec ${provider}`);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ mb: 3 }}
      >
        <Tab label="Connexion" />
        <Tab label="Inscription" />
      </Tabs>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Stack spacing={2} sx={{ mb: 3 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={() => handleSocialLogin('google')}
          disabled={loading}
          sx={{ 
            borderColor: '#4285F4', 
            color: '#4285F4',
            '&:hover': { 
              borderColor: '#4285F4', 
              backgroundColor: 'rgba(66, 133, 244, 0.04)' 
            }
          }}
        >
          Continuer avec Google
        </Button>
        
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GitHubIcon />}
          onClick={() => handleSocialLogin('github')}
          disabled={loading}
          sx={{ 
            borderColor: '#24292e', 
            color: '#24292e',
            '&:hover': { 
              borderColor: '#24292e', 
              backgroundColor: 'rgba(36, 41, 46, 0.04)' 
            }
          }}
        >
          Continuer avec GitHub
        </Button>
      </Stack>
      
      <Divider sx={{ my: 2 }}>
        <Typography variant="body2" color="text.secondary">
          OU
        </Typography>
      </Divider>
      
      {tabValue === 0 ? (
        <Box component="form" onSubmit={handleLogin} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Se connecter'}
          </Button>
        </Box>
      ) : (
        <Box component="form" onSubmit={handleRegister} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nom"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'S\'inscrire'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AuthForm; 