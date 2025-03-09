import { Typography, useTheme } from '@mui/material';

interface IntroSectionProps {
  title: string;
}

const IntroSection = ({ title }: IntroSectionProps) => {
  const theme = useTheme();
  
  return (
    <Typography 
      variant="h4" 
      component="h1" 
      gutterBottom 
      sx={{ 
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        pb: 1,
        mb: 4
      }}
    >
      {title}
    </Typography>
  );
};

export default IntroSection; 