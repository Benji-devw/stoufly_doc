import { Box, Typography, Chip } from '@mui/material';
import { useRouter } from 'next/router';

interface CategoryFilterProps {
  categories: string[];
  onCategoryClick: (category: string) => void;
}

const CategoryFilter = ({ categories, onCategoryClick }: CategoryFilterProps) => {
  const router = useRouter();
  
  return (
    <>
      <Typography variant="subtitle1" gutterBottom>Catégories</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {categories.map((category: string, id: number) => (  
          <Chip
            key={id}
            label={category}
            color={category === router.query.category ? 'primary' : 'default'}
            variant={category === router.query.category ? 'filled' : 'outlined'}
            onClick={() => onCategoryClick(category)}
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Box>
    </>
  );
};

export default CategoryFilter; 