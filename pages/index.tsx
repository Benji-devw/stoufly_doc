import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { NextPageWithLayout } from './_app';
import Layout from '@/components/ui/Layout';
import Skeleton from '@/components/ui/skeletonCard';
import { getTracks, getAllTracks } from './api/tracks';
import AudioPlayer from '@/components/AudioPlayer';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Chip,
  Paper,
  IconButton,
  Stack,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BpmRangeFilter } from '@/components/ui/RangeFilter';

const Home: NextPageWithLayout = ({res, allTracks, query}: any) => {
  const router = useRouter();
  const theme = useTheme();
  const [error, setError] = useState<boolean>(false);
  const [tracks, setTracks] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openAccordion, setOpenAccordion] = useState<boolean>(true);

  // Query Filter
  const [searchQuery, setSearchQuery] = useState<string | any>();
  const [tag, setTag] = useState<string | any>();

  // Category Filter
  const tracksCat = allTracks?.props?.res || { state: [] };
  const categorySet = new Set((tracksCat.state || []).map((cat: any) => cat?.category || 'Non catégorisé').filter(Boolean));
  const catList = Array.from(categorySet).sort() as string[];
  const [catActive, setCatActive] = useState<any>(catList);

  // Limit & counter
  const [counter, setCounter] = useState<number>(9);
  const [skip, setSkip] = useState<number>(9);
  const [currentPos, setCurrentPos] = useState<number>(9);

  useEffect(() => {
    // Définir l'état de chargement au début
    setLoading(true);
    
    // Vérifier que res et ses propriétés sont définis
    const datas = res?.props?.res?.state || [];
    
    // Mettre à jour les états avec les nouvelles données
    setTracks(datas);
    setCounter(datas.length);
    setSearchQuery(router.query.search || '');
    setTag(router.query.tag || '');
    
    // Utiliser un délai plus court pour une meilleure expérience utilisateur
    const timer = setTimeout(() => {
      if (datas.length > 0) {
        setLoading(false);
        setError(false);
      } else {
        setLoading(false);
        setError(true);
      }
    }, 600);
    
    // Nettoyer le timer si le composant est démonté
    return () => clearTimeout(timer);
  }, [res, router.query]);
  
  const handleLoadMore = () => {
    const newSkip = skip + 9;
    setSkip(newSkip);
  };  

  function getResultRangeBpm(value: any) {
    handleBpm([value[0], value[1]]);
  }

  const handleBpm = (val: any) => {
    setSkip(9);
    setLoading(true);
    router.query.BpmMin = val[0];
    router.query.BpmMax = val[1];
    router.push(
      { pathname: '/', query: { ...router.query, BpmMin: val[0] } },
      undefined, 
      { scroll: false }
    );
    router.push(
      { pathname: '/', query: { ...router.query, BpmMax: val[1] } },
      undefined, 
      { scroll: false }
    );
  };  

  const handleCategoryClick = (category: string) => {
    setSkip(9);
    setLoading(true);
    setCounter(tracks.length);
    router.push(
      { pathname: '/', query: { ...router.query, category } },
      undefined,
      { scroll: false }
    );
  };

  const handleRemoveFilter = (key: string) => {
    setSkip(9);
    setLoading(true);
    const newQuery = { ...router.query };
    delete newQuery[key];
    router.replace({ pathname: router.pathname, query: newQuery }, undefined, { scroll: false });
  };

  return (
    <Layout page="Sample Home | Stouflydoc">
      <Container maxWidth="xl">
        {/* INTRO */}
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            borderBottom: `1px solid ${theme.palette.primary.main}`,
            pb: 1,
            mb: 4
          }}
        >
          Plateforme de partage, de sauvegarde, d&apos;achat, de vente et de téléchargement de sample. Publier et partager vos créations musicales avec la communauté, ou simplement explorer et découvrer de nouveaux contenu.
        </Typography>

        {/* ACCORDION FILTERS */}
        <Paper 
          elevation={2} 
          sx={{ 
            p: 2, 
            mb: 4, 
            mx: 'auto', 
            maxWidth: 'md',
            borderRadius: 2
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Filtres</Typography>
            <IconButton onClick={() => setOpenAccordion(!openAccordion)}>
              <ExpandMoreIcon sx={{ transform: openAccordion ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
            </IconButton>
          </Box>

          <Box sx={{ 
            height: openAccordion ? 'auto' : 0, 
            overflow: 'hidden',
            transition: 'height 0.3s'
          }}>
            {/* CATEGORY FILTERS */}
            <Typography variant="subtitle1" gutterBottom>Catégories</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {catList.map((cat: string, id: number) => (  
                <Chip
                  key={id}
                  label={cat}
                  color={cat === router.query.category ? 'primary' : 'default'}
                  variant={cat === router.query.category ? 'filled' : 'outlined'}
                  onClick={() => handleCategoryClick(cat)}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          
            {/* RANGE FILTERS */}
            <Typography variant="subtitle1" gutterBottom>BPM</Typography>
            <Box sx={{ px: 2, mb: 2 }}>
              <BpmRangeFilter min={0} max={200} getResultRangeBpm={getResultRangeBpm}/>
            </Box>
          </Box>
        </Paper>

        {/* ACTIVE QUERY FILTERS */}
        {Object.keys(router.query).length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom>Filtres actifs</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {Object.keys(router.query).map((item, i) => (
                <Chip
                  key={i}
                  label={`${item}: ${router.query[item]}`}
                  onDelete={() => handleRemoveFilter(item)}
                  color="primary"
                  variant="outlined"
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
          </Box>
        )}

        {/* DISPLAY */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5">
              Samples disponibles
              <Chip
                label={loading ? '...' : counter}
                color="primary"
                size="small"
                sx={{ ml: 1 }}
              />
            </Typography>
            
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              <Button 
                variant="outlined" 
                size="small" 
                startIcon={<AccessTimeIcon />}
              >
                Les plus récents
              </Button>
              <Button 
                variant="outlined" 
                size="small" 
                startIcon={<TrendingUpIcon />}
              >
                Les plus populaires
              </Button>
            </Box>
          </Box>
          
          {/* Conteneur principal avec hauteur minimale fixe */}
          <Box sx={{ minHeight: '70vh' }}>
            {loading ? (
              /* État de chargement */
              <Grid container spacing={3}>
                {[...Array(skip < counter ? skip : 9)].map((_, id) => (
                  <Grid item xs={12} sm={6} md={4} key={`skeleton-${id}`}>
                    <Skeleton style={{ animationDelay: `${id/10}s` }} />
                  </Grid>
                ))}
              </Grid>
            ) : error ? (
              /* Message d'erreur */
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                py: 6
              }}>
                <SearchIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Aucun résultat trouvé
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Essayez de modifier vos critères de recherche
                </Typography>
              </Box>
            ) : (
              /* Tracks réelles */
              <Grid container spacing={3}>
                {tracks.slice(0, skip).map((track: any, id: number) => (
                  <Grid item xs={12} sm={6} md={4} key={`track-${id}`}>
                    <AudioPlayer track={track} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
          
          {skip < counter && !loading && !error && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleLoadMore}
                endIcon={<ExpandMoreIcon />}
                size="large"
              >
                Charger plus
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </Layout>
  );
};

export default Home;

export async function getServerSideProps({ query }: any) {
  const res = await getTracks(query);
  const allTracks = await getAllTracks();

  // Vérifier que res et allTracks sont définis
  return { 
    props: { 
      res: res || { props: { res: { state: [] } } }, 
      allTracks: allTracks || { props: { res: { state: [] } } }, 
      query 
    } 
  };
} 