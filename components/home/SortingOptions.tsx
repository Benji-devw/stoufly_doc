import { Box, Button } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface SortingOptionsProps {
  onSortByRecent?: () => void;
  onSortByPopular?: () => void;
}

const SortingOptions = ({ onSortByRecent, onSortByPopular }: SortingOptionsProps) => {
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
      <Button 
        variant="outlined" 
        size="small" 
        startIcon={<AccessTimeIcon />}
        onClick={onSortByRecent}
      >
        Les plus récents
      </Button>
      <Button 
        variant="outlined" 
        size="small" 
        startIcon={<TrendingUpIcon />}
        onClick={onSortByPopular}
      >
        Les plus populaires
      </Button>
    </Box>
  );
};

export default SortingOptions; 