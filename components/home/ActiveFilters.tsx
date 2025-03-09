import { Box, Typography, Stack, Chip } from '@mui/material';
import { useRouter } from 'next/router';

interface ActiveFiltersProps {
  onRemoveFilter: (key: string) => void;
}

const ActiveFilters = ({ onRemoveFilter }: ActiveFiltersProps) => {
  const router = useRouter();
  
  if (Object.keys(router.query).length === 0) {
    return null;
  }
  
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="subtitle1" gutterBottom>Filtres actifs</Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {Object.keys(router.query).map((item, i) => (
          <Chip
            key={i}
            label={`${item}: ${router.query[item]}`}
            onDelete={() => onRemoveFilter(item)}
            color="primary"
            variant="outlined"
            sx={{ mb: 1 }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default ActiveFilters; 