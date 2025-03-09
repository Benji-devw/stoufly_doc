import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Skeleton as MuiSkeleton,
  Box,
  Divider,
  Grid,
  useTheme
} from '@mui/material';

interface SkeletonProps {
  style?: React.CSSProperties;
}

// Hauteurs prédéfinies pour éviter les erreurs d'hydratation
const barHeights = [
  30, 45, 20, 60, 35, 25, 50, 40, 15, 55,
  25, 45, 30, 20, 50, 35, 60, 40, 25, 45
];

const Skeleton = ({ style }: SkeletonProps) => {
  const theme = useTheme();
  
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...style
      }}
    >
      <CardHeader
        title={<MuiSkeleton variant="text" width="70%" height={32} />}
        action={
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <MuiSkeleton variant="text" width={30} />
              <MuiSkeleton variant="circular" width={24} height={24} sx={{ ml: 0.5 }} />
            </Box>
            <MuiSkeleton variant="circular" width={24} height={24} />
          </Box>
        }
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            <MuiSkeleton variant="text" width={60} sx={{ mr: 1 }} />
            <MuiSkeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 10 }} />
          </Box>
        }
      />

      <CardContent sx={{ p: 2, flexGrow: 1 }}>
        {/* Visualisation de l'onde sonore */}
        <Box sx={{ 
          bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
          borderRadius: 1,
          p: 1,
          height: 100,
          display: 'flex',
          alignItems: 'center'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'flex-end', 
            justifyContent: 'space-between',
            width: '100%',
            height: 64
          }}>
            {barHeights.map((height, index) => (
              <Box
                key={index}
                sx={{
                  width: 4,
                  height: `${height}%`,
                  mx: 0.25,
                  borderRadius: 0.5,
                  bgcolor: theme.palette.mode === 'dark' ? 'grey.700' : 'grey.400',
                  animation: 'pulse 1.5s ease-in-out infinite',
                  animationDelay: `${index * 0.05}s`,
                  '@keyframes pulse': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.5 },
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Contrôles */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <MuiSkeleton variant="circular" width={32} height={32} sx={{ mr: 2 }} />
          <Grid container justifyContent="space-between">
            <Grid item>
              <MuiSkeleton variant="text" width={80} />
            </Grid>
            <Grid item>
              <MuiSkeleton variant="text" width={80} />
            </Grid>
          </Grid>
        </Box>
      </CardContent>

      <Divider />

      <CardActions sx={{ flexDirection: 'column', alignItems: 'stretch', p: 2 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
          {[1, 2, 3].map((_, index) => (
            <MuiSkeleton 
              key={index} 
              variant="rectangular" 
              width={60} 
              height={24} 
              sx={{ 
                borderRadius: 10,
                animation: 'pulse 1.5s ease-in-out infinite',
                animationDelay: `${index * 0.1}s`,
              }} 
            />
          ))}
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
          <MuiSkeleton variant="text" width={100} />
          <MuiSkeleton variant="text" width={100} />
        </Box>
      </CardActions>
    </Card>
  );
};

export default Skeleton;