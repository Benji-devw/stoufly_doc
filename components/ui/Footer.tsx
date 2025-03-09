import { Box, Container, Typography, Link as MuiLink } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center"
        >
          {`${new Date().getFullYear()} - `}
          <MuiLink 
            color="inherit" 
            href="https://github.com/jamin-dev-art" 
            target="_blank"
            rel="noopener noreferrer"
            sx={{ mx: 1 }}
          >
            Product by Jamin_dev_art
          </MuiLink>
          {` - `}
          <Typography 
            component="span" 
            variant="body2" 
            color="text.secondary"
            sx={{ mx: 1 }}
          >
            Stouflydoc version test
          </Typography>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;