import React, { FC, useState, useRef, useEffect } from 'react';
import { Slider, Box, Typography, Button, Paper, Stack, useTheme } from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

interface BpmRangeFilterProps {
  min: number;
  max: number;
  getResultRangeBpm: (value: [number, number]) => void;
}

export const BpmRangeFilter: FC<BpmRangeFilterProps> = (props) => {
  const theme = useTheme();
  const [minVal, setMinVal] = useState(props.min);
  const [maxVal, setMaxVal] = useState(props.max);
  const minValRef = useRef(props.min);
  const maxValRef = useRef(props.max);
  
  // Effet pour mettre à jour les valeurs si les props changent
  useEffect(() => {
    setMinVal(props.min);
    setMaxVal(props.max);
    minValRef.current = props.min;
    maxValRef.current = props.max;
  }, [props.min, props.max]);

  function handleChange() {
    props.getResultRangeBpm([minVal, maxVal]);
  }

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        width: '100%', 
        p: 2, 
        borderRadius: 2,
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
        border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
      }}
    >
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SpeedIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="subtitle1" fontWeight="medium">
            BPM Range
          </Typography>
        </Box>
        
        <Slider
          value={[minVal, maxVal]}
          onChange={(event: Event, newValue: number | number[]) => {
            if (Array.isArray(newValue)) {
              setMinVal(newValue[0]);
              setMaxVal(newValue[1]);
              minValRef.current = newValue[0];
              maxValRef.current = newValue[1];
            }
          }}
          valueLabelDisplay="auto"
          min={props.min}
          max={props.max}
          step={10}
          marks={[
            { value: props.min, label: props.min },
            { value: props.max / 2, label: props.max / 2 },
            { value: props.max, label: props.max }
          ]}
          sx={{
            '& .MuiSlider-thumb': {
              height: 20,
              width: 20,
              transition: '0.2s ease-in-out',
              '&:hover': {
                boxShadow: `0 0 0 8px ${theme.palette.primary.main}20`
              }
            },
            '& .MuiSlider-rail': {
              height: 6,
              borderRadius: 3
            },
            '& .MuiSlider-track': {
              height: 6,
              borderRadius: 3
            }
          }}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ 
            p: 1, 
            borderRadius: 1, 
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
            minWidth: 80,
            textAlign: 'center'
          }}>
            <Typography variant="body2" fontWeight="medium">Min: {minVal}</Typography>
          </Box>
          
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleChange} 
            startIcon={<FilterAltIcon />}
            sx={{ 
              px: 3,
              borderRadius: 2,
              boxShadow: 2,
              '&:hover': {
                boxShadow: 4
              }
            }}
          >
            Appliquer
          </Button>
          
          <Box sx={{ 
            p: 1, 
            borderRadius: 1, 
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
            minWidth: 80,
            textAlign: 'center'
          }}>
            <Typography variant="body2" fontWeight="medium">Max: {maxVal}</Typography>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
};


