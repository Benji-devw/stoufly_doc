import React from "react";
import { useRouter } from 'next/router';
import { useSession, getSession } from "next-auth/react";
import Layout from '@/components/ui/Layout';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  Grid, 
  Avatar, 
  Tabs, 
  Tab, 
  CircularProgress,
  Divider
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function User() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { user } = router.query;
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (status === "loading") {
    return (
      <Layout page="Chargement...">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout page={`Profil - ${user || 'Utilisateur'}`}>
      <ProtectedRoute>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Card sx={{ p: 4, mb: 4, borderRadius: 2, boxShadow: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar 
                  sx={{ width: 120, height: 120, mb: 2 }}
                  src={session?.user?.image || undefined}
                >
                  <PersonIcon sx={{ fontSize: 60 }} />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  {session?.user?.name || 'Utilisateur'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {session?.user?.email || 'email@exemple.com'}
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={8}>
                <Typography variant="h4" gutterBottom>
                  Dashboard
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                  <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile tabs">
                    <Tab icon={<PersonIcon />} label="Profil" />
                    <Tab icon={<MusicNoteIcon />} label="Mes samples" />
                    <Tab icon={<FavoriteIcon />} label="Favoris" />
                  </Tabs>
                </Box>
                
                {tabValue === 0 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Informations personnelles
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Membre depuis: {new Date().toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1">
                      Rôle: Utilisateur
                    </Typography>
                  </Box>
                )}
                
                {tabValue === 1 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Mes samples publiés
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Vous n&apos;avez pas encore publié de samples.
                    </Typography>
                  </Box>
                )}
                
                {tabValue === 2 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Samples favoris
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Vous n&apos;avez pas encore de samples favoris.
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Card>
        </Container>
      </ProtectedRoute>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  
  return {
    props: {
      session
    }
  };
}