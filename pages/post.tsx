import { useState, useEffect } from 'react';
import { useSession, signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '@/components/ui/Layout';
import { NextPageWithLayout } from './_app';
import { getAllTracks } from '@/pages/api/tracks';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { 
  Box, 
  Button, 
  Card, 
  Container, 
  FormControl, 
  Grid, 
  InputLabel, 
  MenuItem, 
  Select, 
  TextField, 
  Typography, 
  Alert, 
  Snackbar,
  useTheme,
  SelectChangeEvent
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';

interface FormValues {
  url: string;
  title: string;
  tempo: string;
  category: string | any;
  description: string;
  reporter: string;
  tags: string;
  yearCollection: string;
  comments: string;
  price: string;
  likes: string;
  datePost: string;
}

const PostSample: NextPageWithLayout = ({res}: any) => {
  const theme = useTheme();
  const { data: session, status } = useSession();
  const loading = status === "loading";
  
  const categorySet = new Set(res.props.res.state.map((cat: any) => cat.category));
  const catList = Array.from(categorySet).sort();
  const [alert, setAlert] = useState<null | string>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  
  const [formValues, setFormValues] = useState<FormValues>({
    url: '',
    title: '',
    tempo: "",
    category: catList[0],
    description: '',
    reporter: '',
    tags: '',
    yearCollection: '',
    comments: '',
    price: '',
    likes: '',
    datePost: new Date().toISOString()
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    
    if (name === 'file' && files && files.length > 0) {
      setSelectedFile(files[0]);
      setFileName(files[0].name);
    } else {
      setFormValues({
        ...formValues,
        [name]: value
      });
    }
  };

  const handleCategoryChange = (e: SelectChangeEvent) => {
    setFormValues({
      ...formValues,
      category: e.target.value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      setAlert("Veuillez sélectionner un fichier audio");
      return;
    }
    
    const formData = new FormData();
    formData.append('file', selectedFile);
    
    for (const key in formValues) {
      formData.append(key, formValues[key as keyof FormValues]);
    }
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        setAlert("Fichier téléchargé avec succès");
        // Réinitialiser le formulaire
        setFormValues({
          url: '',
          title: '',
          tempo: "",
          category: catList[0],
          description: '',
          reporter: '',
          tags: '',
          yearCollection: '',
          comments: '',
          price: '',
          likes: '',
          datePost: new Date().toISOString()
        });
        setSelectedFile(null);
        setFileName('');
      } else {
        setAlert("Erreur lors du téléchargement");
      }
    } catch (error) {
      setAlert("Erreur lors du téléchargement");
      console.error(error);
    }
  };
  
  return (
    <Layout page="Publier un sample | Stouflydoc">
      <ProtectedRoute>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Card sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              Publier un sample
            </Typography>
            
            {alert && (
              <Snackbar 
                open={!!alert} 
                autoHideDuration={6000} 
                onClose={() => setAlert(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              >
                <Alert 
                  onClose={() => setAlert(null)} 
                  severity={alert.includes("succès") ? "success" : "error"}
                  sx={{ width: '100%' }}
                >
                  {alert}
                </Alert>
              </Snackbar>
            )}
            
            <Box component="form" onSubmit={handleSubmit} encType="multipart/form-data">
              <Grid container spacing={3}>
                {/* Titre */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Titre"
                    name="title"
                    variant="outlined"
                    value={formValues.title}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                
                {/* BPM */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="BPM"
                    name="tempo"
                    type="number"
                    variant="outlined"
                    placeholder="160"
                    value={formValues.tempo}
                    onChange={handleChange}
                  />
                </Grid>
                
                {/* Catégorie (input) */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Ajouter une catégorie"
                    name="category"
                    variant="outlined"
                    value={formValues.category}
                    onChange={handleChange}
                  />
                </Grid>
                
                {/* Catégorie (select) */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Catégories</InputLabel>
                    <Select
                      name="category"
                      label="Catégories"
                      value={formValues.category}
                      onChange={handleCategoryChange}
                    >
                      <MenuItem value="">
                        <em>Sélectionner une catégorie</em>
                      </MenuItem>
                      {catList.map((cat: any, id: number) => (
                        <MenuItem key={id} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    variant="outlined"
                    multiline
                    rows={3}
                    value={formValues.description}
                    onChange={handleChange}
                  />
                </Grid>
                
                {/* Tags */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Tags (séparés par des virgules)"
                    name="tags"
                    variant="outlined"
                    placeholder="tag1, tag2, tag3"
                    value={formValues.tags}
                    onChange={handleChange}
                  />
                </Grid>
                
                {/* Année de collection */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Année de collection"
                    name="yearCollection"
                    variant="outlined"
                    value={formValues.yearCollection}
                    onChange={handleChange}
                  />
                </Grid>
                
                {/* Commentaires */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Commentaires"
                    name="comments"
                    variant="outlined"
                    multiline
                    rows={2}
                    value={formValues.comments}
                    onChange={handleChange}
                  />
                </Grid>
                
                {/* Prix */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Prix"
                    name="price"
                    type="number"
                    variant="outlined"
                    value={formValues.price}
                    onChange={handleChange}
                  />
                </Grid>
                
                {/* Upload de fichier */}
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    startIcon={<CloudUploadIcon />}
                    sx={{ py: 1.5, borderStyle: 'dashed' }}
                  >
                    Télécharger un fichier audio
            <input
              type="file"
                      name="file"
                      hidden
                      onChange={handleChange}
                      accept="audio/*"
                    />
                  </Button>
                  {fileName && (
                    <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                      Fichier sélectionné: {fileName}
                    </Typography>
                  )}
                </Grid>
                
                {/* Bouton de soumission */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    startIcon={<SaveIcon />}
                    sx={{ mt: 2 }}
                  >
                    Publier le sample
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Container>
      </ProtectedRoute>
    </Layout>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const res = await getAllTracks();
  
  return { 
    props: { 
      res,
      session
    }
  };
}

export default PostSample;