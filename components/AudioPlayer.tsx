import { useState } from 'react';
import { useRouter } from 'next/router';
import Wave from './Wave';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  Divider,
  Tooltip,
  useTheme
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DownloadIcon from '@mui/icons-material/Download';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface AudioPlayerProps {
  track: {
    title: string;
    url: string;
    bpm: number;
    likes: number;
    category: string;
    tags: string;
    reporter: string;
    datePost: string;
    description?: string;
  };
}

const AudioPlayer = ({ track }: AudioPlayerProps) => {
  const router = useRouter();
  const theme = useTheme();
  const [tags, setTags] = useState(track.tags?.replace(/\s/g, '').split(',') || []);
  
  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Fonction pour télécharger le fichier
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = track.url;
    link.download = `${track.title.replace(/\s+/g, '-').toLowerCase()}-${new Date().getTime()}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Fonction pour filtrer par catégorie
  const handleCategoryClick = () => {
    router.push({ 
      pathname: '/', 
      query: { ...router.query, category: track.category } 
    }, undefined, { scroll: false });
  };

  // Fonction pour filtrer par tag
  const handleTagClick = (tag: string) => {
    router.push({ 
      pathname: '/', 
      query: { ...router.query, tag } 
    }, undefined, { scroll: false });
  };

  return (
    <Card 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: theme.palette.primary.main,
          boxShadow: theme.shadows[4]
        }
      }}
    >
      <CardHeader
        title={
          <Typography variant="h6" noWrap title={track.title}>
            {track.title}
          </Typography>
        }
        action={
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mr: 0.5 }}>
                {track.likes}
              </Typography>
              <IconButton size="small" color="primary" aria-label="like">
                <FavoriteIcon fontSize="small" />
              </IconButton>
            </Box>
            <Tooltip title="Télécharger le sample">
              <IconButton 
                size="small" 
                color="primary" 
                onClick={handleDownload}
                aria-label="download"
              >
                <DownloadIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        }
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              Catégorie:
            </Typography>
            <Chip 
              label={track.category} 
              size="small" 
              color="primary" 
              variant="outlined"
              onClick={handleCategoryClick}
              sx={{ cursor: 'pointer' }}
            />
          </Box>
        }
      />

      <CardContent sx={{ p: 2, flexGrow: 1 }}>
        <Wave url={track.url} bpm={track.bpm} />
      </CardContent>

      <Divider />
      
      <CardActions sx={{ flexDirection: 'column', alignItems: 'stretch', p: 2 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
          {tags.map((tag: string, id: number) => (
            <Chip
              key={id}
              size="small"
              label={`#${tag}`}
              onClick={() => handleTagClick(tag)}
              icon={<LocalOfferIcon fontSize="small" />}
              variant="outlined"
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PersonIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
            <Typography variant="caption" color="text.secondary">
              Par: <Typography component="span" variant="caption" fontWeight="medium">{track.reporter}</Typography>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarTodayIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
            <Typography variant="caption" color="text.secondary">
              {formatDate(track.datePost)}
            </Typography>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default AudioPlayer;