import { useState, useEffect, useRef, useCallback } from 'react'
import type WaveSurfer from 'wavesurfer.js';
import { 
  Box, 
  IconButton, 
  Typography, 
  Grid, 
  Tooltip, 
  useTheme,
  styled,
  Button
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import DownloadIcon from '@mui/icons-material/Download';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SpeedIcon from '@mui/icons-material/Speed';


interface IWaveProps {
  url: string;
  bpm: number;
}

// Composant stylisé pour le conteneur de la forme d'onde
const WaveContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[200],
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  height: '100px',
  width: '100%',
}));

const Wave = ({url, bpm}: IWaveProps) => {
   
  const theme = useTheme();
  const waveform = useRef<WaveSurfer | null>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] =   useState(false);
  const [duration, setDuration] =     useState<number | string>('0:00');
  const [currentTime, setCurrentTime] = useState<number | string>('0:00');
  const [isReady, setIsReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  /********/
  /** WAVE CREATE */
  const createWave = async () => {
    if (waveformRef.current && !waveform.current) {
      try {
        // Vérifie si l'URL est valide
        if (!url) {
          console.error("URL audio manquante");
          return;
        }
        
        const WaveSurfer = (await import("wavesurfer.js")).default;
        waveform.current = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: theme.palette.primary.light,
          progressColor: theme.palette.primary.main,
          cursorWidth: 2,
          barWidth: 3,
          height: 80,
          hideScrollbar: true,
          barGap: 2,
          barRadius: 2,
          normalize: true,
          backend: "WebAudio",
        });
  
        // Ajoute un gestionnaire d'erreur
        waveform.current.on('error', (err) => {
          console.error("Erreur de chargement audio:", err);
          setIsReady(false);
          setLoadError(true);
        });
        
        waveform.current.load(url);
        waveform.current.on("ready", () => {
          setDuration(waveform.current?.getDuration().toFixed(1) || '0:00');
          waveform.current?.setVolume(1);
          setIsReady(true);
        });
        waveform.current.on("audioprocess", () => {
          setCurrentTime(waveform.current?.getCurrentTime().toFixed(1) || '0:00');
        });
        waveform.current.on("play", () => setIsPlaying(true));
        waveform.current.on("pause", () => setIsPlaying(false));
      } catch (error) {
        console.error("Erreur lors de la création de WaveSurfer:", error);
      }
    }
  };

  useEffect(() => {
    // Réinitialiser l'état si l'URL change
    setIsReady(false);
    
    // Détruire l'instance précédente si elle existe
    if (waveform.current) {
      waveform.current.destroy();
      waveform.current = null;
    }
    
    // Créer une nouvelle instance après un court délai pour s'assurer que le DOM est prêt
    const timer = setTimeout(() => {
      createWave();
    }, 100);
    
    return () => {
      clearTimeout(timer);
      if (waveform.current) {
        waveform.current.destroy();
        waveform.current = null;
      }
    };
  }, [url, theme.palette.primary]);

  // Fonction pour réessayer
  const handleRetry = () => {
    if (retryCount < MAX_RETRIES) {
      setRetryCount(prev => prev + 1);
      setLoadError(false);
    }
  };

  /********/
  /** WAVE PLAY AND PAUSE */
  const togglePlayback = () => {
    if (!waveform.current || !isReady) return;
    
    if (!isPlaying) {
      waveform.current.play();
    } else {
      waveform.current.pause();
    }
  };

  // Gestion du téléchargement
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = url;
    link.download = `track-${new Date().getTime()}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {loadError ? (
        <>
          <WaveContainer>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%' 
            }}>
              <Typography color="error">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Impossible de charger l&apos;audio
              </Typography>
            </Box>
          </WaveContainer>
          
          <Button 
            onClick={handleRetry} 
            disabled={retryCount >= MAX_RETRIES}
            size="small"
            sx={{ mt: 1 }}
          >
            Réessayer
          </Button>
        </>
      ) : (
        <>
          <WaveContainer>
            <Box ref={waveformRef} id="waveform" sx={{ width: '100%', height: '100%' }} />
          </WaveContainer>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, flexDirection: 'column' }}>
            <IconButton 
              onClick={togglePlayback} 
              disabled={!isReady}
              color="primary"
              size="medium"
              sx={{ 
                mr: 1,
                opacity: !isReady ? 0.5 : 1,
                width: '100%',
                borderRadius: '10px',
                border: `1px solid ${theme.palette.primary.main}`,
              }}
            >
              {!isPlaying ? <PlayArrowIcon /> : <PauseIcon />}
            </IconButton>
            
            <Grid container alignItems="center" spacing={1} sx={{ mt: 1 }}>
              <Grid item xs={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SpeedIcon color="action" fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    {bpm ? `${bpm} bpm` : ''}
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTimeIcon color="action" fontSize="small" sx={{ mr: 0.5 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ mr: 0.5, width: '30px' }} variant="body2" color="text.secondary">
                      {currentTime}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      /
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {duration}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Box>
  )
}
export default Wave