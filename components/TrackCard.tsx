import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Box, 
  Chip, 
  IconButton, 
  Tooltip,
  CardActionArea
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import { useRouter } from 'next/router';
import Wave from './Wave';
import { Track } from '@/types/track';

interface TrackCardProps {
  track: Track;
}

const TrackCard = ({ track }: TrackCardProps) => {
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
  };
  
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Implémentation du partage
    navigator.clipboard.writeText(window.location.origin + '/track/' + track._id);
  };
  
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Implémentation du téléchargement
    const link = document.createElement('a');
    link.href = track.url;
    link.download = `${track.title || 'track'}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleCardClick = () => {
    router.push(`/track/${track._id}`);
  };
  
  return (
    <Card 
      sx={{ 
        height: '100%', 
        // display: 'flex', 
        // flexDirection: 'column',
        // transition: 'transform 0.2s',
        // '&:hover': {
        //   transform: 'translateY(-4px)',
        //   boxShadow: 6
        // }
      }}
    >
      <CardActionArea onClick={handleCardClick}>
        <CardContent sx={{ flexGrow: 1, pb: 0 }}>
          <Typography variant="h6" component="div" noWrap>
            {track.title || 'Sans titre'}
          </Typography>
          
          <Box sx={{ display: 'flex', mb: 1 }}>
            <Chip 
              label={track.category || 'Non catégorisé'} 
              size="small" 
              color="primary" 
              variant="outlined"
              sx={{ mr: 1 }}
            />
            {track.tempo && (
              <Chip 
                label={`${track.tempo} BPM`} 
                size="small" 
                color="secondary" 
                variant="outlined"
              />
            )}
          </Box>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              height: '40px'
            }}
          >
            {track.description || 'Aucune description'}
          </Typography>
          
          <Wave url={track.url} bpm={track.tempo || 0} />
        </CardContent>
      </CardActionArea>
      
      <CardActions sx={{ justifyContent: 'space-between', pt: 0 }}>
        <Box>
          <Tooltip title={liked ? "Retirer des favoris" : "Ajouter aux favoris"}>
            <IconButton size="small" onClick={handleLike} color={liked ? "primary" : "default"}>
              {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Partager">
            <IconButton size="small" onClick={handleShare}>
              <ShareIcon />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Tooltip title="Télécharger">
          <IconButton size="small" onClick={handleDownload}>
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default TrackCard; 