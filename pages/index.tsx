import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { NextPageWithLayout } from './_app';
import Layout from '@/components/ui/Layout';
import { getTracks, getAllTracks } from './api/tracks';
import { Container } from '@mui/material';

// Composants
import IntroSection from '@/components/home/IntroSection';
import FilterAccordion from '@/components/home/FilterAccordion';
import ActiveFilters from '@/components/home/ActiveFilters';
import TrackList from '@/components/home/TrackList';

const Home: NextPageWithLayout = ({res, allTracks, query}: any) => {
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [tracks, setTracks] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Query Filter
  const [searchQuery, setSearchQuery] = useState<string | any>();
  const [tag, setTag] = useState<string | any>();

  // Category Filter
  const tracksCat = allTracks?.props?.res || { state: [] };
  const categorySet = new Set((tracksCat.state || []).map((cat: any) => cat?.category || 'Non catégorisé').filter(Boolean));
  const catList = Array.from(categorySet).sort() as string[];
  const [catActive, setCatActive] = useState<any>(catList);

  // Limit & counter
  const [counter, setCounter] = useState<number>(9);
  const [skip, setSkip] = useState<number>(9);
  const [currentPos, setCurrentPos] = useState<number>(9);

  useEffect(() => {
    // Définir l'état de chargement au début
    setLoading(true);
    
    // Vérifier que res et ses propriétés sont définis
    const datas = res?.props?.res?.state || [];
    
    // Mettre à jour les états avec les nouvelles données
    setTracks(datas);
    setCounter(datas.length);
    setSearchQuery(router.query.search || '');
    setTag(router.query.tag || '');
    
    // Utiliser un délai plus court pour une meilleure expérience utilisateur
    const timer = setTimeout(() => {
      if (datas.length > 0) {
        setLoading(false);
        setError(false);
      } else {
        setLoading(false);
        setError(true);
      }
    }, 600);
    
    // Nettoyer le timer si le composant est démonté
    return () => clearTimeout(timer);
  }, [res, router.query]);
  
  const handleLoadMore = () => {
    const newSkip = skip + 9;
    setSkip(newSkip);
  };  

  function getResultRangeBpm(value: [number, number]) {
    handleBpm(value);
  }

  const handleBpm = (val: [number, number]) => {
    setSkip(9);
    setLoading(true);
    router.query.BpmMin = val[0].toString();
    router.query.BpmMax = val[1].toString();
    router.push(
      { pathname: '/', query: { ...router.query, BpmMin: val[0] } },
      undefined, 
      { scroll: false }
    );
    router.push(
      { pathname: '/', query: { ...router.query, BpmMax: val[1] } },
      undefined, 
      { scroll: false }
    );
  };  

  const handleCategoryClick = (category: string) => {
    setSkip(9);
    setLoading(true);
    setCounter(tracks.length);
    router.push(
      { pathname: '/', query: { ...router.query, category } },
      undefined,
      { scroll: false }
    );
  };

  const handleRemoveFilter = (key: string) => {
    setSkip(9);
    setLoading(true);
    const newQuery = { ...router.query };
    delete newQuery[key];
    router.replace({ pathname: router.pathname, query: newQuery }, undefined, { scroll: false });
  };

  return (
    <Layout page="Sample Home | Stouflydoc">
      <Container maxWidth="xl">
        {/* Section d'introduction */}
        <IntroSection 
          title="Plateforme de partage, de sauvegarde, d'achat, de vente et de téléchargement de sample. Publier et partager vos créations musicales avec la communauté, ou simplement explorer et découvrer de nouveaux contenu." 
        />

        {/* Section des filtres */}
        <FilterAccordion 
          categories={catList}
          onCategoryClick={handleCategoryClick}
          onBpmChange={getResultRangeBpm}
        />

        {/* Filtres actifs */}
        <ActiveFilters 
          onRemoveFilter={handleRemoveFilter} 
        />

        {/* Liste des pistes */}
        <TrackList 
          tracks={tracks}
          loading={loading}
          error={error}
          counter={counter}
          skip={skip}
          onLoadMore={handleLoadMore}
        />
      </Container>
    </Layout>
  );
};

export default Home;

export async function getServerSideProps({ query }: any) {
  const res = await getTracks(query);
  const allTracks = await getAllTracks();

  // Vérifier que res et allTracks sont définis
  return { 
    props: { 
      res: res || { props: { res: { state: [] } } }, 
      allTracks: allTracks || { props: { res: { state: [] } } }, 
      query 
    } 
  };
} 