import { Box, Grid, Typography, Button, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Skeleton from '@/components/ui/skeletonCard';
import AudioPlayer from '@/components/AudioPlayer';
import SortingOptions from './SortingOptions';

interface TrackListProps {
  tracks: any[];
  loading: boolean;
  error: boolean;
  counter: number;
  skip: number;
  onLoadMore: () => void;
}

const TrackList = ({ 
  tracks, 
  loading, 
  error, 
  counter, 
  skip, 
  onLoadMore 
}: TrackListProps) => {
  return (
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
        
        <SortingOptions />
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
            onClick={onLoadMore}
            endIcon={<ExpandMoreIcon />}
            size="large"
          >
            Charger plus
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TrackList; 