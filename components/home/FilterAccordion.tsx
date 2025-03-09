import { useState } from 'react';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CategoryFilter from './CategoryFilter';
import { BpmRangeFilter } from '@/components/ui/RangeFilter';

interface FilterAccordionProps {
  categories: string[];
  onCategoryClick: (category: string) => void;
  onBpmChange: (value: [number, number]) => void;
}

const FilterAccordion = ({ 
  categories, 
  onCategoryClick, 
  onBpmChange 
}: FilterAccordionProps) => {
  const [openAccordion, setOpenAccordion] = useState<boolean>(true);

  return (
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Filtres</Typography>
        <IconButton onClick={() => setOpenAccordion(!openAccordion)}>
          <ExpandMoreIcon 
            sx={{ 
              transform: openAccordion ? 'rotate(180deg)' : 'none', 
              transition: 'transform 0.3s' 
            }} 
          />
        </IconButton>
      </Box>

      <Box sx={{ 
        height: openAccordion ? 'auto' : 0, 
        overflow: 'hidden',
        transition: 'height 0.3s'
      }}>
        {/* Catégories */}
        <CategoryFilter 
          categories={categories} 
          onCategoryClick={onCategoryClick} 
        />
        
        {/* Filtre BPM */}
        <Typography variant="subtitle1" gutterBottom>BPM</Typography>
        <Box sx={{ px: 2, mb: 2 }}>
          <BpmRangeFilter 
            min={0} 
            max={200} 
            getResultRangeBpm={onBpmChange} 
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default FilterAccordion; 